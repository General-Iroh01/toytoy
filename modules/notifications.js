/**
 * Notifications Module
 * Student Academic Manager - Local Notifications via Capacitor
 */

const NotificationsModule = (() => {
  let hasPermission = false;
  let isCapacitorAvailable = false;

  async function init() {
    // Check if Capacitor is available (Android context)
    isCapacitorAvailable = typeof Capacitor !== 'undefined' &&
                           Capacitor.isNativePlatform &&
                           Capacitor.isNativePlatform();

    if (isCapacitorAvailable) {
      await requestPermission();
    }
  }

  async function requestPermission() {
    if (!isCapacitorAvailable) return false;
    try {
      const { LocalNotifications } = Capacitor.Plugins;
      const result = await LocalNotifications.requestPermissions();
      hasPermission = result.display === 'granted';
      return hasPermission;
    } catch (e) {
      console.warn('Notification permission error:', e);
      return false;
    }
  }

  async function scheduleClassReminders() {
    if (!isCapacitorAvailable || !hasPermission) return;

    const { LocalNotifications } = Capacitor.Plugins;

    // Cancel all existing class reminders
    await cancelAllByGroup('class-reminder');

    const scheduleItems = await ScheduleModule.buildNotificationSchedule();
    const notifications = [];
    let notifId = 100;

    for (const item of scheduleItems) {
      // Schedule for next 4 weeks (28 days)
      for (let week = 0; week < 4; week++) {
        const notifDate = getNextDayOccurrence(parseInt(item.day), item.startTime, week, 15);
        if (!notifDate) continue;

        notifications.push({
          id: notifId++,
          title: `📚 ${item.courseName}`,
          body: `Class starts in 15 minutes – ${item.classroom || 'Check schedule'}`,
          schedule: { at: notifDate },
          extra: { type: 'class-reminder', courseId: item.courseId, group: 'class-reminder' },
          channelId: 'class-reminders',
        });
      }
    }

    if (notifications.length > 0) {
      await LocalNotifications.schedule({ notifications });
    }
  }

  async function scheduleExamCountdowns() {
    if (!isCapacitorAvailable || !hasPermission) return;

    const { LocalNotifications } = Capacitor.Plugins;
    await cancelAllByGroup('exam-countdown');

    const exams = await ExamsModule.getExamsNeedingCountdown();
    const notifications = [];
    let notifId = 1000;

    for (const exam of exams) {
      const daysLeft = exam.daysUntil;

      for (let d = daysLeft; d >= 1; d--) {
        const notifDate = new Date();
        notifDate.setDate(notifDate.getDate() + (daysLeft - d));
        notifDate.setHours(8, 0, 0, 0); // 8 AM each day

        if (notifDate <= new Date()) continue;

        const label = d === 1 ? 'Tomorrow!' : `in ${d} days`;
        notifications.push({
          id: notifId++,
          title: `📝 ${exam.title || exam.type} Exam`,
          body: `${exam.courseName} exam ${label}. ${d <= 3 ? 'Final preparation time!' : 'Start reviewing now.'}`,
          schedule: { at: notifDate },
          extra: { type: 'exam-countdown', examId: exam.id, group: 'exam-countdown' },
          channelId: 'exam-reminders',
        });
      }
    }

    if (notifications.length > 0) {
      await LocalNotifications.schedule({ notifications });
    }
  }

  async function cancelAllByGroup(group) {
    if (!isCapacitorAvailable) return;
    try {
      const { LocalNotifications } = Capacitor.Plugins;
      const pending = await LocalNotifications.getPending();
      const toCancel = pending.notifications
        .filter(n => n.extra?.group === group)
        .map(n => ({ id: n.id }));
      if (toCancel.length) {
        await LocalNotifications.cancel({ notifications: toCancel });
      }
    } catch (e) {
      console.warn('Cancel notifications error:', e);
    }
  }

  async function cancelAll() {
    if (!isCapacitorAvailable) return;
    try {
      const { LocalNotifications } = Capacitor.Plugins;
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length) {
        await LocalNotifications.cancel({ notifications: pending.notifications.map(n => ({ id: n.id })) });
      }
    } catch (e) {
      console.warn('Cancel all notifications error:', e);
    }
  }

  async function createChannel() {
    if (!isCapacitorAvailable) return;
    try {
      const { LocalNotifications } = Capacitor.Plugins;
      await LocalNotifications.createChannel({
        id: 'class-reminders',
        name: 'Class Reminders',
        importance: 4,
        sound: 'default',
        vibration: true,
      });
      await LocalNotifications.createChannel({
        id: 'reminders',
        name: 'Reminders',
        importance: 4,
        sound: 'default',
        vibration: true,
      });
      await LocalNotifications.createChannel({
        id: 'exam-reminders',
        name: 'Exam Countdowns',
        importance: 3,
        sound: 'default',
        vibration: true,
      });
    } catch (e) {
      console.warn('Create channel error:', e);
    }
  }

  // Show an immediate notification (for testing/web fallback)
  async function showImmediate(title, body) {
    if (isCapacitorAvailable && hasPermission) {
      const { LocalNotifications } = Capacitor.Plugins;
      await LocalNotifications.schedule({
        notifications: [{
          id: Date.now(),
          title,
          body,
          schedule: { at: new Date(Date.now() + 1000) },
        }]
      });
    } else {
      // Web fallback using Notification API
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification(title, { body });
        } else if (Notification.permission !== 'denied') {
          const perm = await Notification.requestPermission();
          if (perm === 'granted') new Notification(title, { body });
        }
      }
    }
  }

  function getNextDayOccurrence(dayOfWeek, timeStr, weekOffset, minutesBefore) {
    const now = new Date();
    const [h, m] = timeStr.split(':').map(Number);

    const date = new Date(now);
    date.setDate(date.getDate() + weekOffset * 7);

    // Find next occurrence of dayOfWeek
    const currentDay = date.getDay();
    let daysUntil = (dayOfWeek - currentDay + 7) % 7;
    if (daysUntil === 0 && weekOffset === 0) {
      const classTime = h * 60 + m;
      const nowTime = now.getHours() * 60 + now.getMinutes();
      if (classTime - minutesBefore <= nowTime) daysUntil = 7;
    }

    date.setDate(date.getDate() + daysUntil);
    date.setHours(h, m - minutesBefore, 0, 0);

    if (date <= now) return null;
    return date;
  }

  async function refreshAll() {
    await scheduleClassReminders();
    await scheduleExamCountdowns();
  }

  return {
    init,
    requestPermission,
    scheduleClassReminders,
    scheduleExamCountdowns,
    cancelAll,
    createChannel,
    showImmediate,
    refreshAll,
    get isAvailable() { return isCapacitorAvailable; },
    get hasPermission() { return hasPermission; },
  };
})();

window.NotificationsModule = NotificationsModule;
