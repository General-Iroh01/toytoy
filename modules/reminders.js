/**
 * Reminders Module — Hatırlatıcılar
 * 
 * Tür 1: exact  — Belirli bir tarihte, kullanıcının seçtiği N bildirim gönderir
 * Tür 2: range  — Tarih aralığında her gün belirli saatlerde bildirim gönderir
 * 
 * Bildirimler hem Capacitor (Android) hem de uygulama içi sisteme kaydedilir.
 */

const RemindersModule = (() => {

  // ── CRUD ───────────────────────────────────────────────────────────────────
  async function getAll() {
    const all = await DB.getAllRecords(DB.STORES.REMINDERS);
    return all.sort((a,b) => (a.nextTrigger||'').localeCompare(b.nextTrigger||''));
  }

  async function getById(id) { return DB.getRecord(DB.STORES.REMINDERS, id); }

  async function add(data) {
    const reminder = buildReminder(data);
    const id = await DB.addRecord(DB.STORES.REMINDERS, reminder);
    const saved = { ...reminder, id };
    await scheduleOne(saved);
    return saved;
  }

  async function update(id, data) {
    const existing = await DB.getRecord(DB.STORES.REMINDERS, id);
    if (!existing) throw new Error('Hatırlatıcı bulunamadı');
    await cancelOne(existing);
    const updated = { ...existing, ...buildReminder({ ...existing, ...data }), id };
    await DB.updateRecord(DB.STORES.REMINDERS, updated);
    await scheduleOne(updated);
    return updated;
  }

  async function remove(id) {
    const existing = await DB.getRecord(DB.STORES.REMINDERS, id);
    if (existing) await cancelOne(existing);
    return DB.deleteRecord(DB.STORES.REMINDERS, id);
  }

  // ── Hatırlatıcı nesnesini oluştur ─────────────────────────────────────────
  function buildReminder(data) {
    const type = data.type || 'exact'; // 'exact' | 'range'
    const base = {
      title:   data.title?.trim() || 'Hatırlatıcı',
      message: data.message?.trim() || '',
      type,
      active:  true,
    };

    if (type === 'exact') {
      // Tam tarih: seçilen gün, kullanıcının belirlediği sayıda eşit aralıklı bildirim
      const date         = data.exactDate;    // 'YYYY-MM-DD'
      const count        = Math.min(Math.max(parseInt(data.notifCount) || 1, 1), 20);
      const startHour    = parseInt(data.exactStartHour ?? 8);
      const endHour      = parseInt(data.exactEndHour   ?? 22);
      const nextTrigger  = date + 'T' + String(startHour).padStart(2,'0') + ':00:00';
      return { ...base, date, count, startHour, endHour, nextTrigger };
    } else {
      // Tarih aralığı: her gün belirli saatte bildirim
      const startDate = data.startDate; // 'YYYY-MM-DD'
      const endDate   = data.endDate;
      const time      = data.rangeTime || '08:00'; // 'HH:MM'
      const nextTrigger = startDate + 'T' + time + ':00';
      return { ...base, startDate, endDate, time, nextTrigger };
    }
  }

  // ── Bildirim planlama ─────────────────────────────────────────────────────
  async function scheduleOne(reminder) {
    await addInAppNotifs(reminder);
    await scheduleNative(reminder);
  }

  // Uygulama içi bildirimler (IN_APP_NOTIFS store'una kaydet)
  async function addInAppNotifs(reminder) {
    if (!reminder.active) return;

    if (reminder.type === 'exact') {
      const date = reminder.date;
      const { startHour, endHour, count } = reminder;
      const span = (endHour - startHour) * 60; // dakika
      const interval = count > 1 ? Math.floor(span / (count - 1)) : 0;

      for (let i = 0; i < count; i++) {
        const mins = startHour * 60 + (interval * i);
        const h = Math.floor(mins / 60), m = mins % 60;
        const timeStr = String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0');
        const scheduledAt = date + 'T' + timeStr + ':00';

        await DB.addRecord(DB.STORES.IN_APP_NOTIFS, {
          type:        'reminder',
          reminderId:  reminder.id,
          title:       reminder.title,
          message:     reminder.message || '',
          scheduledAt,
          read:        false,
          icon:        '🔔',
        });
      }
    } else {
      // Tarih aralığı: her gün için bir kayıt
      const start = new Date(reminder.startDate + 'T12:00:00');
      const end   = new Date(reminder.endDate   + 'T12:00:00');
      const [h,m] = reminder.time.split(':');
      let cur = new Date(start);
      while (cur <= end) {
        const dateStr = cur.toISOString().split('T')[0];
        const scheduledAt = dateStr + 'T' + String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':00';
        await DB.addRecord(DB.STORES.IN_APP_NOTIFS, {
          type:        'reminder',
          reminderId:  reminder.id,
          title:       reminder.title,
          message:     reminder.message || '',
          scheduledAt,
          read:        false,
          icon:        '🔔',
        });
        cur.setDate(cur.getDate() + 1);
      }
    }
  }

  // Capacitor native bildirimler
  async function scheduleNative(reminder) {
    const isNative = typeof Capacitor !== 'undefined' &&
                     Capacitor.isNativePlatform && Capacitor.isNativePlatform();
    if (!isNative) return;

    try {
      const { LocalNotifications } = Capacitor.Plugins;
      const notifications = buildNativeNotifs(reminder);
      if (notifications.length) await LocalNotifications.schedule({ notifications });
    } catch(e) { console.warn('Native schedule error', e); }
  }

  function buildNativeNotifs(reminder) {
    const notifs = [];
    const now = new Date();
    let id = 5000 + (reminder.id * 100);

    if (reminder.type === 'exact') {
      const date = reminder.date;
      const { startHour, endHour, count } = reminder;
      const span = (endHour - startHour) * 60;
      const interval = count > 1 ? Math.floor(span / (count - 1)) : 0;
      for (let i = 0; i < count; i++) {
        const mins = startHour * 60 + interval * i;
        const h = Math.floor(mins / 60), m = mins % 60;
        const at = new Date(date + 'T' + String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':00');
        if (at > now) notifs.push({
          id: id++, title: '🔔 ' + reminder.title,
          body: reminder.message || '',
          schedule: { at },
          extra: { group: 'reminder', reminderId: reminder.id },
          channelId: 'reminders',
        });
      }
    } else {
      const start = new Date(reminder.startDate + 'T12:00:00');
      const end   = new Date(reminder.endDate   + 'T12:00:00');
      const [rh, rm] = reminder.time.split(':').map(Number);
      let cur = new Date(start);
      while (cur <= end && notifs.length < 64) {
        const dateStr = cur.toISOString().split('T')[0];
        const at = new Date(dateStr + 'T' + String(rh).padStart(2,'0') + ':' + String(rm).padStart(2,'0') + ':00');
        if (at > now) notifs.push({
          id: id++, title: '🔔 ' + reminder.title,
          body: reminder.message || '',
          schedule: { at },
          extra: { group: 'reminder', reminderId: reminder.id },
          channelId: 'reminders',
        });
        cur.setDate(cur.getDate() + 1);
      }
    }
    return notifs;
  }

  async function cancelOne(reminder) {
    const isNative = typeof Capacitor !== 'undefined' &&
                     Capacitor.isNativePlatform && Capacitor.isNativePlatform();
    if (isNative) {
      try {
        const { LocalNotifications } = Capacitor.Plugins;
        const pending = await LocalNotifications.getPending();
        const toCancel = pending.notifications
          .filter(n => n.extra?.reminderId === reminder.id)
          .map(n => ({ id: n.id }));
        if (toCancel.length) await LocalNotifications.cancel({ notifications: toCancel });
      } catch(e) {}
    }
    // IN_APP_NOTIFS'ten bu hatırlatıcının gelecek bildirimlerini sil
    const all = await DB.getAllRecords(DB.STORES.IN_APP_NOTIFS);
    const now = new Date().toISOString();
    for (const n of all) {
      if (n.reminderId === reminder.id && n.scheduledAt > now) {
        await DB.deleteRecord(DB.STORES.IN_APP_NOTIFS, n.id);
      }
    }
  }

  // ── Uygulama içi bildirim yönetimi ───────────────────────────────────────
  // Bugün ve geçmiş, okunmamış bildirimleri getir (son 7 gün)
  async function getActiveInAppNotifs() {
    const all = await DB.getAllRecords(DB.STORES.IN_APP_NOTIFS);
    const now = new Date();
    const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
    return all
      .filter(n => {
        const t = new Date(n.scheduledAt);
        return t <= now && t >= weekAgo;
      })
      .sort((a,b) => b.scheduledAt.localeCompare(a.scheduledAt));
  }

  async function markRead(id) {
    const n = await DB.getRecord(DB.STORES.IN_APP_NOTIFS, id);
    if (n) await DB.updateRecord(DB.STORES.IN_APP_NOTIFS, { ...n, read: true });
  }

  async function markAllRead() {
    const all = await DB.getAllRecords(DB.STORES.IN_APP_NOTIFS);
    for (const n of all) {
      if (!n.read) await DB.updateRecord(DB.STORES.IN_APP_NOTIFS, { ...n, read: true });
    }
  }

  async function deleteInAppNotif(id) {
    return DB.deleteRecord(DB.STORES.IN_APP_NOTIFS, id);
  }

  // Ders / sınav bildirimlerini IN_APP_NOTIFS'e yaz
  // Her gün bir kez çalışır (localStorage ile kontrol)
  async function syncSystemNotifs(courses, upcomingExams, todayClasses) {
    const todayStr = new Date().toISOString().split('T')[0];
    const lastSync = localStorage.getItem('notif_sync_date');
    const didSyncToday = lastSync === todayStr;

    try {
      const existing = await DB.getAllRecords(DB.STORES.IN_APP_NOTIFS);
      for (const n of existing) {
        // Devamsızlık uyarılarını her seferinde temizle (güncel hesap için)
        if (n.type === 'attendance-warning') {
          await DB.deleteRecord(DB.STORES.IN_APP_NOTIFS, n.id);
        }
        // Ders/sınav bildirimlerini günde bir kez temizle
        if (!didSyncToday && (n.type === 'class-today' || n.type === 'exam-upcoming')) {
          await DB.deleteRecord(DB.STORES.IN_APP_NOTIFS, n.id);
        }
      }

      if (!didSyncToday) {
        // Bugünkü dersleri ekle
        for (const cls of todayClasses) {
          const course = courses.find(c => c.id === cls.courseId);
          if (!course) continue;
          await DB.addRecord(DB.STORES.IN_APP_NOTIFS, {
            type: 'class-today',
            title: course.name,
            message: (cls.startTime || '') + (course.classroom ? ' · ' + course.classroom : ''),
            scheduledAt: todayStr + 'T' + (cls.startTime || '08:00') + ':00',
            read: false, icon: '📚', courseId: course.id,
          });
        }

        // Yaklaşan sınavları ekle (14 gün içindekiler)
        for (const exam of upcomingExams) {
          if (exam.daysUntil > 14) continue;
          await DB.addRecord(DB.STORES.IN_APP_NOTIFS, {
            type: 'exam-upcoming',
            title: (exam.title || exam.type) + ' — ' + exam.courseName,
            message: exam.daysUntil === 0 ? 'Bugün!' : exam.daysUntil === 1 ? 'Yarın!' : exam.daysUntil + ' gün sonra',
            scheduledAt: exam.date + 'T08:00:00',
            read: false,
            icon: exam.daysUntil <= 2 ? '🚨' : exam.daysUntil <= 7 ? '📝' : '📅',
            examId: exam.id,
          });
        }

        localStorage.setItem('notif_sync_date', todayStr);
      }

      // Devamsızlık uyarıları — her açılışta hesapla, 2 hafta eşiği
      try {
        const allCourses = await DB.getAllRecords(DB.STORES.COURSES);
        for (const course of allCourses) {
          const attRecords = await DB.getRecordsByIndex(DB.STORES.ATTENDANCE, 'courseId', course.id);
          const absH = attRecords.filter(r => r.status === 'absent').reduce((s, r) => s + (r.hours || 0), 0);
          const allowH = course.totalAbsenceHours || 0;
          if (allowH <= 0) continue;
          const remH = Math.max(0, allowH - absH);
          const wkH = course.weeklyHours || 1;
          const remWeeks = remH / wkH;
          const isOver = absH >= allowH;

          // Sadece 2 hafta veya daha az kaldığında (ya da limit aşıldığında) uyar
          if (!isOver && remWeeks > 2) continue;

          const remWeeksFloor = Math.floor(remWeeks);
          const remClasses = Math.floor(remH / (wkH / 5 || 1));
          let title, message, icon;

          if (isOver) {
            title = `🚫 ${course.name}: Devamsızlık limiti aşıldı!`;
            message = 'Bu dersten sınav hakkını kaybedebilirsin.';
            icon = '🚫';
          } else if (remWeeks <= 1) {
            title = `🔴 ${course.name}: Son 1 haftalık hakkın kaldı!`;
            message = `Kalan: ${remH} saat · ~${remClasses} ders girebilirsin.`;
            icon = '🔴';
          } else {
            title = `⚠️ ${course.name}: ${remWeeksFloor} haftalık devamsızlık hakkın kaldı`;
            message = `Kalan: ${remH} saat · ~${remClasses} ders. Dikkatli ol!`;
            icon = '⚠️';
          }

          await DB.addRecord(DB.STORES.IN_APP_NOTIFS, {
            type: 'attendance-warning', title, message,
            scheduledAt: todayStr + 'T07:00:00',
            read: false, icon, courseId: course.id,
          });
        }
      } catch(e) { console.warn('attendance warning error', e); }

    } catch(e) {
      console.warn('syncSystemNotifs error:', e);
    }
  }

  return {
    getAll, getById, add, update, remove,
    getActiveInAppNotifs, markRead, markAllRead, deleteInAppNotif,
    syncSystemNotifs,
  };
})();

window.RemindersModule = RemindersModule;
