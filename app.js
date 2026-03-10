/**
 * Student Academic Manager — app.js
 * Özellikler: Çok dil (TR/EN), Ayarlar, Özel Renkler, Not Kategorileri, Bildirim Ayarları
 */

// ─── DİL SİSTEMİ ─────────────────────────────────────────────────────────────
const I18N = {
  tr: {
    nav_home: 'Ana Sayfa', nav_schedule: 'Program', nav_courses: 'Dersler',
    nav_exams: 'Sınavlar', nav_timer: 'Zamanlayıcı', nav_notes: 'Notlar',
    nav_stats: 'İstatistik', nav_settings: 'Ayarlar', nav_reminders: 'Hatırlatıcı', nav_attendance: 'Devamsızlık',

    dashboard_title: 'Bugün', courses_title: 'Derslerim', schedule_title: 'Haftalık Program',
    exams_title: 'Sınavlar', notes_title: 'Notlar', stats_title: 'İstatistikler',
    backup_title: 'Yedek & Geri Yükle', settings_title: 'Ayarlar',

    add_course: '+ Ders Ekle', add_class: '+ Saat Ekle', add_exam: '+ Sınav Ekle',
    add_note: '+ Not Ekle', add_category: '+ Kategori',
    edit: 'Düzenle', delete: 'Sil', save: 'Kaydet', cancel: 'İptal',
    back: '← Geri', see_all: 'Tümü',

    course_name: 'Ders Adı', classroom: 'Dershane', credits: 'Kredi',
    weekly_hours: 'Haftalık Saat', max_absence_weeks: 'Maks. Devamsızlık Haftası',
    instructor: 'Öğretim Görevlisi', semester_start: 'Dönem Başı', semester_end: 'Dönem Sonu',
    color: 'Renk', description: 'Açıklama',

    attendance: 'Yoklama', present: 'Katıldı', absent: 'Katılmadı', late: 'Geç Kaldı',
    remaining: 'Kalan', at_risk: 'Devamsızlık sınırına yaklaşıyorsunuz!',
    limit_reached: 'Devamsızlık sınırına ulaşıldı!',

    schedule_label: 'Program', exams_label: 'Sınavlar', study_stats: 'Çalışma İstatistikleri',
    notes_label: 'Notlar', no_schedule: 'Program girilmemiş', no_exams: 'Sınav eklenmemiş',

    today_classes: 'Bugünkü Dersler', no_classes_today: 'Bugün ders yok!',
    upcoming_exams: 'Yaklaşan Sınavlar', this_week_study: 'Bu Hafta Çalışma',
    next_up: 'Sıradaki', no_room: 'Dershane girilmemiş',

    pomodoro_ready: '🍅 Odaklanmaya Hazır', focus_time: '🍅 Odak Zamanı',
    break_time: '☕ Mola Zamanı', session: 'Seans',
    start_focus: '▶ Başla', pause: '⏸ Duraklat', resume: '▶ Devam',
    skip: '⏭ Atla', stop: '⏹ Durdur', what_studying: 'Ne çalışıyorsunuz?',
    select_course_opt: 'Ders seç (isteğe bağlı)',
    this_month: 'Bu Ay', total_study: 'Toplam Çalışma', pomodoros: 'Pomodoro',
    most_studied: 'En Çok Çalışılan', by_course: 'Derse Göre',
    pom_settings: 'Zamanlayıcı Ayarları', pom_work: 'Odak Süresi (dk)',
    pom_short_break: 'Kısa Mola (dk)', pom_long_break: 'Uzun Mola (dk)',
    pom_sessions: 'Uzun mola öncesi seans sayısı',

    search_notes: 'Not ara...', no_notes: 'Henüz not yok', capture_thoughts: 'Düşüncelerini ve fotoğrafları kaydet',
    all_notes: 'Tüm Notlar', no_category: 'Kategorisiz',
    note_title: 'Başlık', note_content: 'İçerik *', write_note: 'Notunuzu yazın...',
    caption: 'Açıklama', category_opt: 'Kategori (isteğe bağlı)',
    course_opt: 'Ders (isteğe bağlı)', save_note: 'Notu Kaydet',
    save_photo: 'Fotoğrafı Kaydet', discard: 'Vazgeç',
    category_name: 'Kategori Adı', category_icon: 'İkon (emoji)',
    categories: 'Kategoriler', manage_categories: 'Kategorileri Yönet',
    no_categories: 'Henüz kategori yok', delete_category_confirm: 'Bu kategoriyi silmek istiyor musunuz?',

    exam_type: 'Sınav Türü', midterm: 'Ara Sınav', final: 'Final', quiz: 'Quiz', other: 'Diğer',
    exam_title: 'Başlık', exam_date: 'Tarih *', exam_time: 'Saat', location: 'Yer',
    notes_field: 'Notlar', add_grade: 'Not Ekle', grade: 'Not (0-100)',
    upcoming: 'Yaklaşan', past_exams: 'Geçmiş Sınavlar', no_upcoming: 'Yaklaşan sınav yok ✅',

    this_week: 'Bu Hafta', total_hours: 'Toplam Saat', avg_grade: 'Ort. Not',
    weekly_study_chart: 'Haftalık Çalışma', study_by_course: 'Derse Göre Çalışma',
    attendance_overview: 'Yoklama Özeti', exam_grades: 'Sınav Notları',
    no_courses_yet: 'Henüz ders yok',

    current_data: 'Mevcut Veriler', export_backup: 'Yedek Al',
    export_desc: 'Tüm verilerini JSON olarak kaydet', export_btn: 'Veriyi Dışa Aktar',
    import_backup: 'Yedeği Yükle', import_desc: 'Yedek dosyasından verileri geri yükle',
    import_btn: 'Veriyi İçe Aktar', clear_all: 'Tüm Verileri Sil',
    clear_desc: 'Tüm kayıtları kalıcı olarak sil', clear_btn: 'Verileri Sil',
    local_storage_note: '📱 Tüm veriler cihazınızda saklanmaktadır. Düzenli yedek almanız önerilir.',
    schedule_items: 'Program Öğeleri', attendance_records: 'Yoklama Kayıtları',

    // Ayarlar
    language: 'Dil', language_desc: 'Uygulama dilini seçin',
    notifications_section: 'Bildirimler', notif_class_reminder: 'Ders Hatırlatıcısı',
    notif_class_desc: 'Dersten 15 dakika önce bildirim', notif_exam_countdown: 'Sınav Geri Sayımı',
    notif_exam_desc: 'Sınavdan 14 gün önce başlar', notif_permission: 'Bildirim İzni',
    notif_permission_desc: 'Bildirim göndermek için izin gereklidir', request_permission: 'İzin İste',
    notif_reschedule: 'Bildirimleri Yenile',

    appearance: 'Görünüm', custom_colors: 'Kişisel Renk Paleti',
    custom_colors_desc: 'Ders renklerinize kendi renklerinizi ekleyin',
    add_color: '+ Renk Ekle', hex_placeholder: '#FF6B6B gibi hex kodu',
    color_preview: 'Önizleme', color_exists: 'Bu renk zaten mevcut',
    color_invalid: 'Geçersiz hex renk kodu',
    color_added: 'Renk eklendi', color_removed: 'Renk silindi',

    day_0: 'Pazar', day_1: 'Pazartesi', day_2: 'Salı', day_3: 'Çarşamba',
    day_4: 'Perşembe', day_5: 'Cuma', day_6: 'Cumartesi',
    day_short_0: 'Paz', day_short_1: 'Pzt', day_short_2: 'Sal', day_short_3: 'Çar',
    day_short_4: 'Per', day_short_5: 'Cum', day_short_6: 'Cmt',
    month_0: 'Ocak', month_1: 'Şubat', month_2: 'Mart', month_3: 'Nisan',
    month_4: 'Mayıs', month_5: 'Haziran', month_6: 'Temmuz', month_7: 'Ağustos',
    month_8: 'Eylül', month_9: 'Ekim', month_10: 'Kasım', month_11: 'Aralık',
    today_badge: 'Bugün', free: 'Boş',
    no_room_set: 'Dershane girilmemiş',

    confirm_delete_course: 'Bu dersi silmek istiyor musunuz? İlgili tüm veriler silinecek.',
    confirm_delete_schedule: 'Bu dersi programdan kaldırmak istiyor musunuz?',
    confirm_delete_exam: 'Bu sınavı silmek istiyor musunuz?',
    confirm_delete_note: 'Bu notu silmek istiyor musunuz?',
    confirm_clear_all: '⚠️ Tüm verileriniz kalıcı olarak silinecek. Emin misiniz?',
    confirm_clear_all2: 'Son şans! Bu işlem geri alınamaz.',
    mark_attendance: 'Yoklama İşaretle',
    course_deleted: 'Ders silindi', schedule_removed: 'Programdan kaldırıldı',
    exam_deleted: 'Sınav silindi', note_deleted: 'Not silindi',
    data_cleared: 'Tüm veriler silindi', course_added: 'Ders eklendi!',
    course_updated: 'Ders güncellendi!', class_added: 'Ders saati eklendi!',
    conflict_added: 'Ders saati eklendi (çakışma kaydedildi)', exam_added: 'Sınav eklendi!',
    note_saved: 'Not kaydedildi!', photo_saved: 'Fotoğraf kaydedildi!',
    grade_saved: 'Not kaydedildi!', no_results: 'Sonuç bulunamadı',
    add_course_first: 'Önce ders eklemeniz gerekiyor',
    stop_pomodoro_confirm: 'Mevcut pomodoro oturumunu durdurmak istiyor musunuz?',
    conflict_warning: 'çakışması tespit edildi',
    add_anyway: 'Yine de ekle?',
  },
  en: {
    nav_home: 'Home', nav_schedule: 'Schedule', nav_courses: 'Courses',
    nav_exams: 'Exams', nav_timer: 'Timer', nav_notes: 'Notes',
    nav_stats: 'Stats', nav_settings: 'Settings', nav_reminders: 'Reminders', nav_attendance: 'Attendance',

    dashboard_title: 'Today', courses_title: 'My Courses', schedule_title: 'Weekly Schedule',
    exams_title: 'Exams', notes_title: 'Notes', stats_title: 'Statistics',
    backup_title: 'Backup & Restore', settings_title: 'Settings',

    add_course: '+ Add Course', add_class: '+ Add Class', add_exam: '+ Add Exam',
    add_note: '+ Add Note', add_category: '+ Category',
    edit: 'Edit', delete: 'Delete', save: 'Save', cancel: 'Cancel',
    back: '← Back', see_all: 'See All',

    course_name: 'Course Name', classroom: 'Classroom', credits: 'Credits',
    weekly_hours: 'Weekly Hours', max_absence_weeks: 'Max Absence Weeks',
    instructor: 'Instructor', semester_start: 'Semester Start', semester_end: 'Semester End',
    color: 'Color', description: 'Description',

    attendance: 'Attendance', present: 'Present', absent: 'Absent', late: 'Late',
    remaining: 'Remaining', at_risk: 'Approaching absence limit!',
    limit_reached: 'Absence limit reached!',

    schedule_label: 'Schedule', exams_label: 'Exams', study_stats: 'Study Stats',
    notes_label: 'Notes', no_schedule: 'No schedule set', no_exams: 'No exams recorded',

    today_classes: "Today's Classes", no_classes_today: 'No classes today!',
    upcoming_exams: 'Upcoming Exams', this_week_study: "This Week's Study",
    next_up: 'Next Up', no_room: 'No room set',

    pomodoro_ready: '🍅 Ready to Focus', focus_time: '🍅 Focus Time',
    break_time: '☕ Break Time', session: 'Session',
    start_focus: '▶ Start Focus', pause: '⏸ Pause', resume: '▶ Resume',
    skip: '⏭ Skip', stop: '⏹ Stop', what_studying: 'What are you studying?',
    select_course_opt: 'Select Course (optional)',
    this_month: 'This Month', total_study: 'Total Study', pomodoros: 'Pomodoros',
    most_studied: 'Most Studied', by_course: 'By Course',
    pom_settings: 'Timer Settings', pom_work: 'Focus Duration (min)',
    pom_short_break: 'Short Break (min)', pom_long_break: 'Long Break (min)',
    pom_sessions: 'Sessions before long break',

    search_notes: 'Search notes...', no_notes: 'No notes yet', capture_thoughts: 'Capture your thoughts and photos',
    all_notes: 'All Notes', no_category: 'Uncategorized',
    note_title: 'Title', note_content: 'Content *', write_note: 'Write your note...',
    caption: 'Caption', category_opt: 'Category (optional)',
    course_opt: 'Course (optional)', save_note: 'Save Note',
    save_photo: 'Save Photo', discard: 'Discard',
    category_name: 'Category Name', category_icon: 'Icon (emoji)',
    categories: 'Categories', manage_categories: 'Manage Categories',
    no_categories: 'No categories yet', delete_category_confirm: 'Delete this category?',

    exam_type: 'Exam Type', midterm: 'Midterm', final: 'Final', quiz: 'Quiz', other: 'Other',
    exam_title: 'Title', exam_date: 'Date *', exam_time: 'Time', location: 'Location',
    notes_field: 'Notes', add_grade: 'Add Grade', grade: 'Grade (0-100)',
    upcoming: 'Upcoming', past_exams: 'Past Exams', no_upcoming: 'No upcoming exams ✅',

    this_week: 'This Week', total_hours: 'Total Hours', avg_grade: 'Avg Grade',
    weekly_study_chart: 'Weekly Study Time', study_by_course: 'Study by Course',
    attendance_overview: 'Attendance Overview', exam_grades: 'Exam Grades',
    no_courses_yet: 'No courses yet',

    current_data: 'Current Data', export_backup: 'Export Backup',
    export_desc: 'Save all your data as a JSON file', export_btn: 'Export Data',
    import_backup: 'Import Backup', import_desc: 'Restore data from a backup file',
    import_btn: 'Import Data', clear_all: 'Clear All Data',
    clear_desc: 'Permanently delete all records', clear_btn: 'Clear Data',
    local_storage_note: '📱 All data is stored locally on your device. Regular backups recommended.',
    schedule_items: 'Schedule Items', attendance_records: 'Attendance Records',

    language: 'Language', language_desc: 'Select app language',
    notifications_section: 'Notifications', notif_class_reminder: 'Class Reminder',
    notif_class_desc: '15 minutes before class', notif_exam_countdown: 'Exam Countdown',
    notif_exam_desc: 'Starts 14 days before exam', notif_permission: 'Notification Permission',
    notif_permission_desc: 'Permission needed to send notifications', request_permission: 'Request Permission',
    notif_reschedule: 'Refresh Notifications',

    appearance: 'Appearance', custom_colors: 'Custom Color Palette',
    custom_colors_desc: 'Add your own colors to the course color picker',
    add_color: '+ Add Color', hex_placeholder: 'Hex code like #FF6B6B',
    color_preview: 'Preview', color_exists: 'This color already exists',
    color_invalid: 'Invalid hex color code',
    color_added: 'Color added', color_removed: 'Color removed',

    day_0: 'Sunday', day_1: 'Monday', day_2: 'Tuesday', day_3: 'Wednesday',
    day_4: 'Thursday', day_5: 'Friday', day_6: 'Saturday',
    day_short_0: 'Sun', day_short_1: 'Mon', day_short_2: 'Tue', day_short_3: 'Wed',
    day_short_4: 'Thu', day_short_5: 'Fri', day_short_6: 'Sat',
    month_0: 'January', month_1: 'February', month_2: 'March', month_3: 'April',
    month_4: 'May', month_5: 'June', month_6: 'July', month_7: 'August',
    month_8: 'September', month_9: 'October', month_10: 'November', month_11: 'December',
    today_badge: 'Today', free: 'Free',
    no_room_set: 'No room set',

    confirm_delete_course: 'Delete this course? All related data will be removed.',
    confirm_delete_schedule: 'Remove this class from schedule?',
    confirm_delete_exam: 'Delete this exam?',
    confirm_delete_note: 'Delete this note?',
    confirm_clear_all: '⚠️ This will permanently delete ALL your data. Are you sure?',
    confirm_clear_all2: 'Last chance! This cannot be undone.',
    mark_attendance: 'Mark Attendance',
    course_deleted: 'Course deleted', schedule_removed: 'Removed from schedule',
    exam_deleted: 'Exam deleted', note_deleted: 'Note deleted',
    data_cleared: 'All data cleared', course_added: 'Course added!',
    course_updated: 'Course updated!', class_added: 'Class added!',
    conflict_added: 'Class added (conflict noted)', exam_added: 'Exam added!',
    note_saved: 'Note saved!', photo_saved: 'Photo saved!',
    grade_saved: 'Grade saved!', no_results: 'No results found',
    add_course_first: 'Add a course first',
    stop_pomodoro_confirm: 'Stop current pomodoro session?',
    conflict_warning: 'conflict detected',
    add_anyway: 'Add anyway?',
  }
};

// ─── UYGULAMA ─────────────────────────────────────────────────────────────────
const App = (() => {
  let currentPage = 'dashboard';
  let lang = 'tr';
  // Varsayılan renkler + kullanıcı renkleri birleşik liste
  const DEFAULT_COLORS = ['#6366f1','#8b5cf6','#ec4899','#ef4444','#f97316','#eab308','#22c55e','#14b8a6','#06b6d4','#3b82f6'];
  let customColors = [];

  // ── t() — çeviri yardımcısı ───────────────────────────────────────────────
  function t(key) { return (I18N[lang] && I18N[lang][key]) || (I18N['tr'][key]) || key; }

  function allColors() { return [...DEFAULT_COLORS, ...customColors]; }

  // ── Dil başlatma ──────────────────────────────────────────────────────────
  async function loadSettings() {
    lang = await DB.getSetting('lang', 'tr');
    customColors = await DB.getSetting('customColors', []);
    if (!Array.isArray(customColors)) customColors = [];
    applyI18nToNav();
  }

  function applyI18nToNav() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
  }

  // ── ROUTER ────────────────────────────────────────────────────────────────
  // Sayfa → son ziyaret etiketi/ikonu
  const PAGE_META = {
    'dashboard':  { label: 'Ana Sayfa',      icon: '🏠' },
    'schedule':   { label: 'Program',        icon: '📅' },
    'courses':    { label: 'Dersler',        icon: '📚' },
    'exams':      { label: 'Sınavlar',       icon: '📝' },
    'pomodoro':   { label: 'Pomodoro',       icon: '⏱' },
    'notes':      { label: 'Notlar',         icon: '📒' },
    'statistics': { label: 'İstatistik',     icon: '📊' },
    'reminders':  { label: 'Hatırlatıcılar', icon: '🔔' },
    'settings':   { label: 'Ayarlar',        icon: '⚙️' },
    'backup':     { label: 'Yedek',          icon: '💾' },
    'attendance': { label: 'Devamsızlık',    icon: '👥' },
  };

  function navigate(page, params = {}) {
    // Bottom nav aktif item güncelle
    document.querySelectorAll('#bottom-nav .nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === page);
    });
    currentPage = page;
    if (page !== 'dashboard') {
      const meta = PAGE_META[page] || { label: page, icon: '📄' };
      RecentVisitsModule.record(page, params, meta.label, meta.icon).catch(()=>{});
    }
    render(page, params);
  }

  async function render(page, params = {}) {
    const container = document.getElementById('app-content');
    container.innerHTML = '<div class="page-loading"><div class="spinner"></div></div>';
    try {
      switch (page) {
        case 'dashboard':    await renderDashboard(container); break;
        case 'schedule':     await renderSchedule(container); break;
        case 'courses':      await renderCourses(container); break;
        case 'course-detail':await renderCourseDetail(container, params.id); break;
        case 'exams':        await renderExams(container); break;
        case 'pomodoro':     await renderPomodoro(container); break;
        case 'notes':        await renderNotes(container, params.categoryId || null); break;
        case 'statistics':   await renderStatistics(container); break;
        case 'attendance':   await renderAttendancePage(container); break;
        case 'reminders':    await renderReminders(container); break;
        case 'settings':     await renderSettings(container); break;
        case 'backup':       await renderBackup(container); break;
        default:             await renderDashboard(container);
      }
    } catch (err) {
      container.innerHTML = `<div class="error-state"><p>Hata: ${err.message}</p></div>`;
      console.error(err);
    }
  }

  // ── DASHBOARD ─────────────────────────────────────────────────────────────
  async function renderDashboard(container) {
    let courses = [], todayClasses = [], upcomingExams = [], pomStats = { totalPomodoros:0, totalMinutes:0 };
    let nextClass = null, recentVisits = [], refreshedNotifs = [];

    try {
      [courses, todayClasses, upcomingExams, pomStats] = await Promise.all([
        CoursesModule.getAll(),
        ScheduleModule.getTodayClasses(),
        ExamsModule.getUpcoming(30),
        PomodoroModule.getStats(7),
      ]);
    } catch(e) { console.warn('Dashboard data error:', e); }

    try { nextClass = await ScheduleModule.getNextClass(); } catch(e) {}
    try { recentVisits = await RecentVisitsModule.getRecent(); } catch(e) {}
    try {
      await RemindersModule.syncSystemNotifs(courses, upcomingExams, todayClasses);
      refreshedNotifs = await RemindersModule.getActiveInAppNotifs();
    } catch(e) { console.warn('Notif sync error:', e); }

    const today = new Date();
    const dayName = t('day_' + today.getDay());
    const dateStr = t('month_' + today.getMonth()) + ' ' + today.getDate();

    // Okunmamış bildirim sayısı
    const unreadCount = refreshedNotifs.filter(n => !n.read).length;

    container.innerHTML = `
      <div class="page dashboard-page">
        <div class="dashboard-header">
          <div class="greeting">
            <span class="greeting-day">${dayName}</span>
            <span class="greeting-date">${dateStr}</span>
          </div>
          <div class="quick-stats-row">
            <div class="qs-card" onclick="App.navigate('courses')">
              <span class="qs-num">${courses.length}</span>
              <span class="qs-label">${t('nav_courses')}</span>
            </div>
            <div class="qs-card" onclick="App.navigate('exams')">
              <span class="qs-num">${upcomingExams.length}</span>
              <span class="qs-label">${t('nav_exams')}</span>
            </div>
            <div class="qs-card" onclick="App.navigate('pomodoro')">
              <span class="qs-num">${pomStats.totalPomodoros}</span>
              <span class="qs-label">${t('pomodoros')}</span>
            </div>
          </div>
        </div>

        ${nextClass ? `
          <div class="next-class-banner" onclick="App.navigate('schedule')">
            <div class="ncb-dot" style="background:${nextClass.color}"></div>
            <div class="ncb-info">
              <span class="ncb-label">${t('next_up')}</span>
              <span class="ncb-name">${nextClass.courseName}</span>
              <span class="ncb-time">${TimeUtils.formatTime(nextClass.startTime)} · ${nextClass.classroom || t('no_room_set')}</span>
            </div>
            <div class="ncb-countdown">${nextClass.minutesUntil < 60 ? nextClass.minutesUntil + 'm' : Math.floor(nextClass.minutesUntil/60) + 'h'}</div>
          </div>
        ` : ''}

        <!-- ─── BUGÜNKÜ DERSLER ─── -->
        <section class="dash-section">
          <div class="section-header">
            <h3>${t('today_classes')}</h3>
            <button class="link-btn" onclick="App.navigate('schedule')">${t('see_all')}</button>
          </div>
          ${todayClasses.length === 0 ? `<div class="empty-card"><span>🎉</span><p>${t('no_classes_today')}</p></div>` : ''}
          <div class="today-classes-list">
            ${(await Promise.all(todayClasses.map(async (cls) => {
              const course = await CoursesModule.getById(cls.courseId);
              return `
                <div class="today-class-card" onclick="App.navigate('course-detail',{id:${cls.courseId}})">
                  <div class="tcc-color" style="background:${course?.color || '#6366f1'}"></div>
                  <div class="tcc-info">
                    <span class="tcc-name">${course?.name || '?'}</span>
                    <span class="tcc-meta">${TimeUtils.formatTime(cls.startTime)} – ${TimeUtils.formatTime(cls.endTime)} · ${course?.classroom || ''}</span>
                  </div>
                  <button class="attend-btn" onclick="event.stopPropagation();App.quickAttendance(${cls.courseId},'${cls.startTime}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </button>
                </div>`;
            }))).join('')}
          </div>
        </section>

        <!-- ─── SON KULLANILANLAR ─── -->
        ${recentVisits.length > 0 ? `
          <section class="dash-section">
            <div class="section-header">
              <h3>⏱ Son Kullanılanlar</h3>
            </div>
            <div class="recent-grid">
              ${recentVisits.map(rv => `
                <button class="recent-chip" onclick="App.navigate('${rv.page}',${JSON.stringify(rv.params || {})})">
                  <span class="rc-icon">${rv.icon || '📄'}</span>
                  <span class="rc-label">${rv.label || rv.page}</span>
                </button>`).join('')}
            </div>
          </section>
        ` : ''}

        <!-- ─── BİLDİRİMLER ─── -->
        <section class="dash-section notif-section">
          <div class="section-header">
            <div style="display:flex;align-items:center;gap:8px">
              <h3>🔔 Bildirimler</h3>
              ${unreadCount > 0 ? `<span class="notif-badge">${unreadCount}</span>` : ''}
            </div>
            ${refreshedNotifs.length > 0 ? `<button class="link-btn" onclick="App.markAllNotifsRead()">Tümünü Oku</button>` : ''}
          </div>
          ${refreshedNotifs.length === 0 ? `
            <div class="empty-card" style="padding:12px">
              <span>✅</span><p>Yeni bildirim yok</p>
            </div>
          ` : `
            <div class="notif-list">
              ${refreshedNotifs.slice(0, 8).map(n => `
                <div class="notif-item ${n.read ? 'read' : 'unread'}" onclick="App.tapNotif(${n.id}, '${n.type}', ${n.courseId || 'null'}, ${n.examId || 'null'})">
                  <div class="ni-icon-wrap ${n.type === 'exam-upcoming' ? 'exam' : n.type === 'class-today' ? 'class' : 'reminder'}">
                    <span>${n.icon || '🔔'}</span>
                  </div>
                  <div class="ni-body">
                    <span class="ni-title">${n.title}</span>
                    ${n.message ? `<span class="ni-msg">${n.message}</span>` : ''}
                    <span class="ni-time">${formatNotifTime(n.scheduledAt)}</span>
                  </div>
                  ${!n.read ? '<div class="ni-dot"></div>' : ''}
                  <button class="ni-del" onclick="event.stopPropagation();App.deleteInAppNotif(${n.id})">×</button>
                </div>`).join('')}
            </div>
          `}
        </section>

        ${upcomingExams.length > 0 ? `
          <section class="dash-section">
            <div class="section-header">
              <h3>${t('upcoming_exams')}</h3>
              <button class="link-btn" onclick="App.navigate('exams')">${t('see_all')}</button>
            </div>
            <div class="exam-cards-row">
              ${upcomingExams.slice(0, 3).map(exam => `
                <div class="exam-card-mini" onclick="App.navigate('exams')">
                  <div class="ecm-dot" style="background:${exam.color}"></div>
                  <div class="ecm-info">
                    <span class="ecm-title">${exam.title || exam.type}</span>
                    <span class="ecm-course">${exam.courseName}</span>
                  </div>
                  <div class="ecm-days ${exam.daysUntil <= 3 ? 'urgent' : exam.daysUntil <= 7 ? 'warning' : ''}">${exam.countdown}</div>
                </div>`).join('')}
            </div>
          </section>
        ` : ''}

        ${pomStats.totalMinutes > 0 ? `
          <section class="dash-section">
            <div class="section-header">
              <h3>${t('this_week_study')}</h3>
              <button class="link-btn" onclick="App.navigate('pomodoro')">${t('nav_timer')}</button>
            </div>
            <div class="study-summary">
              <div class="study-stat">
                <span class="ss-num">${TimeUtils.formatDuration(pomStats.totalMinutes)}</span>
                <span class="ss-label">${t('total_study')}</span>
              </div>
              <div class="study-stat">
                <span class="ss-num">${pomStats.totalPomodoros}</span>
                <span class="ss-label">${t('pomodoros')}</span>
              </div>
              ${pomStats.mostStudiedCourse ? `
                <div class="study-stat">
                  <span class="ss-num" style="font-size:0.85rem">${pomStats.mostStudiedCourse.courseName}</span>
                  <span class="ss-label">${t('most_studied')}</span>
                </div>` : ''}
            </div>
          </section>
        ` : ''}

        <div class="quick-actions">
          <button class="qa-btn" onclick="App.showAddCourseModal()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            ${t('add_course')}
          </button>
          <button class="qa-btn" onclick="App.navigate('pomodoro')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Pomodoro
          </button>
          <button class="qa-btn" onclick="App.quickAddNote()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            ${t('add_note')}
          </button>
          <button class="qa-btn" onclick="App.navigate('reminders')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            Hatırlat
          </button>
        </div>
      </div>`;
  }

  // Bildirim zamanını formatla
  function formatNotifTime(isoStr) {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const dStr = isoStr.split('T')[0];
    const timeStr = String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
    if (dStr === todayStr) return 'Bugün ' + timeStr;
    const yesterday = new Date(now); yesterday.setDate(yesterday.getDate()-1);
    if (dStr === yesterday.toISOString().split('T')[0]) return 'Dün ' + timeStr;
    return dStr + ' ' + timeStr;
  }

  async function renderSchedule(container) {
    const [weeklySchedule, courses] = await Promise.all([
      ScheduleModule.getWeeklySchedule(),
      CoursesModule.getAll(),
    ]);
    const todayIdx = TimeUtils.getCurrentDayIndex();
    const workDays = [1,2,3,4,5,0,6];

    container.innerHTML = `
      <div class="page schedule-page">
        <div class="page-header">
          <h2>${t('schedule_title')}</h2>
          <button class="btn-primary" onclick="App.showAddScheduleModal()">${t('add_class')}</button>
        </div>
        <div class="schedule-grid">
          ${workDays.map(dayIdx => {
            const classes = weeklySchedule[dayIdx] || [];
            const isToday = dayIdx === todayIdx;
            return `
              <div class="schedule-day ${isToday ? 'today' : ''} ${classes.length === 0 ? 'empty' : ''}">
                <div class="day-header">
                  <span class="day-name">${t('day_short_' + dayIdx)}</span>
                  ${isToday ? `<span class="today-badge">${t('today_badge')}</span>` : ''}
                </div>
                <div class="day-classes">
                  ${classes.map(cls => {
                    const course = courses.find(c => c.id === cls.courseId);
                    return `
                      <div class="schedule-class-item" style="border-left-color:${course?.color || '#6366f1'}" onclick="App.navigate('course-detail',{id:${cls.courseId}})">
                        <span class="sci-time">${TimeUtils.formatTime(cls.startTime)}</span>
                        <span class="sci-name">${course?.name || '?'}</span>
                        <span class="sci-room">${course?.classroom || ''}</span>
                        <button class="sci-del" onclick="event.stopPropagation();App.deleteScheduleItem(${cls.id})">×</button>
                      </div>`;
                  }).join('')}
                  ${classes.length === 0 ? `<span class="no-classes">${t('free')}</span>` : ''}
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  }

  // ── DERSLER ───────────────────────────────────────────────────────────────
  async function renderCourses(container) {
    const courses = await CoursesModule.getAll();
    container.innerHTML = `
      <div class="page courses-page">
        <div class="page-header">
          <h2>${t('courses_title')}</h2>
          <button class="btn-primary" onclick="App.showAddCourseModal()">${t('add_course')}</button>
        </div>
        ${courses.length === 0 ? `
          <div class="empty-state">
            <div class="es-icon">📚</div>
            <h3>${t('no_courses_yet')}</h3>
            <button class="btn-primary" onclick="App.showAddCourseModal()">${t('add_course')}</button>
          </div>
        ` : `
          <div class="courses-grid">
            ${courses.map(course => `
              <div class="course-card" onclick="App.navigate('course-detail',{id:${course.id}})">
                <div class="cc-accent" style="background:${course.color}"></div>
                <div class="cc-body">
                  <h3 class="cc-name">${course.name}</h3>
                  <div class="cc-meta">
                    ${course.classroom ? `<span>📍 ${course.classroom}</span>` : ''}
                    ${course.credit ? `<span>⭐ ${course.credit} ${t('credits')}</span>` : ''}
                    ${course.weeklyHours ? `<span>⏱ ${course.weeklyHours}s/hafta</span>` : ''}
                  </div>
                  ${course.instructor ? `<div class="cc-instructor">👨‍🏫 ${course.instructor}</div>` : ''}
                  <div class="cc-dates">
                    ${course.semesterStart && course.semesterEnd
                      ? TimeUtils.formatDateShort(course.semesterStart) + ' – ' + TimeUtils.formatDateShort(course.semesterEnd)
                      : 'Tarih girilmemiş'}
                  </div>
                </div>
                <div class="cc-actions">
                  <button onclick="event.stopPropagation();App.showEditCourseModal(${course.id})">✏️</button>
                  <button onclick="event.stopPropagation();App.deleteCourse(${course.id})">🗑️</button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>`;
  }

  // ── DERS DETAYI ───────────────────────────────────────────────────────────
  async function renderCourseDetail(container, courseId) {
    if (!courseId) { navigate('courses'); return; }
    const [stats, schedule, exams, notes] = await Promise.all([
      CoursesModule.getStats(courseId),
      ScheduleModule.getByCourse(courseId),
      ExamsModule.getByCourse(courseId),
      NotesModule.getByCourse(courseId),
    ]);
    if (!stats) { navigate('courses'); return; }
    const { course } = stats;
    const dangerPct = Math.min(100, stats.absencePercentage);
    const dangerClass = dangerPct >= 100 ? 'danger' : dangerPct >= 75 ? 'warning' : 'safe';

    container.innerHTML = `
      <div class="page course-detail-page">
        <div class="cd-hero" style="background: linear-gradient(135deg, ${course.color}22, ${course.color}44)">
          <button class="back-btn" onclick="App.navigate('courses')">${t('back')}</button>
          <div class="cd-color-dot" style="background:${course.color}"></div>
          <h2>${course.name}</h2>
          <div class="cd-badges">
            ${course.classroom ? `<span class="badge">${course.classroom}</span>` : ''}
            ${course.credit ? `<span class="badge">${course.credit} kr</span>` : ''}
            ${course.instructor ? `<span class="badge">${course.instructor}</span>` : ''}
          </div>
        </div>
        <div class="cd-content">
          <section class="detail-card">
            <h3>${t('attendance')}</h3>
            <div class="attendance-bar-wrap">
              <div class="attendance-bar">
                <div class="ab-fill ${dangerClass}" style="width:${dangerPct}%"></div>
              </div>
              <span class="ab-label">${stats.absenceHours}s / ${stats.course.totalAbsenceHours}s ${t('remaining').toLowerCase()}</span>
            </div>
            <div class="att-stats">
              <div><span>${stats.presentSessions}</span><label>${t('present')}</label></div>
              <div><span>${stats.absenceSessions}</span><label>${t('absent')}</label></div>
              <div><span>${stats.remainingAbsenceHours}s</span><label>${t('remaining')}</label></div>
            </div>
            ${stats.isAtRisk ? `<div class="risk-alert ${dangerClass}">⚠️ ${dangerPct >= 100 ? t('limit_reached') : t('at_risk')}</div>` : ''}
            <div class="att-actions">
              <button class="btn-sm btn-success" onclick="App.recordAttendance(${courseId},'present')">✓ ${t('present')}</button>
              <button class="btn-sm btn-danger"  onclick="App.recordAttendance(${courseId},'absent')">✗ ${t('absent')}</button>
              <button class="btn-sm btn-warning" onclick="App.recordAttendance(${courseId},'late')">⏰ ${t('late')}</button>
            </div>
          </section>

          <section class="detail-card">
            <div class="dc-header">
              <h3>${t('schedule_label')}</h3>
              <button class="btn-sm" onclick="App.showAddScheduleModal(${courseId})">${t('add_class')}</button>
            </div>
            ${schedule.length === 0 ? `<p class="empty-text">${t('no_schedule')}</p>` : `
              <div class="sched-list">
                ${schedule.map(s => `
                  <div class="sched-item">
                    <span class="si-day">${t('day_' + parseInt(s.day))}</span>
                    <span class="si-time">${TimeUtils.formatTime(s.startTime)} – ${TimeUtils.formatTime(s.endTime)}</span>
                    <button class="si-del" onclick="App.deleteScheduleItem(${s.id},${courseId})">×</button>
                  </div>`).join('')}
              </div>`}
          </section>

          <section class="detail-card">
            <div class="dc-header">
              <h3>${t('exams_label')}</h3>
              <button class="btn-sm" onclick="App.showAddExamModal(${courseId})">${t('add_exam')}</button>
            </div>
            ${exams.length === 0 ? `<p class="empty-text">${t('no_exams')}</p>` : `
              <div class="exam-list">
                ${exams.map(e => {
                  const days = TimeUtils.daysUntil(e.date);
                  return `
                    <div class="exam-item">
                      <div class="ei-type">${e.type}</div>
                      <div class="ei-info">
                        <span>${e.title || e.type}</span>
                        <span class="ei-date">${TimeUtils.formatDate(e.date)}</span>
                      </div>
                      <div class="ei-right">
                        ${e.grade !== null && e.grade !== undefined
                          ? `<span class="ei-grade">${e.grade}</span>`
                          : `<span class="ei-days ${days <= 7 ? 'urgent' : ''}">${TimeUtils.formatCountdown(days)}</span>`}
                        <button class="si-del" onclick="App.deleteExam(${e.id},${courseId})">×</button>
                      </div>
                    </div>`}).join('')}
              </div>`}
          </section>

          <section class="detail-card">
            <h3>${t('study_stats')}</h3>
            <div class="study-stats">
              <div><span>${PomodoroModule.formatTime(stats.totalStudyMinutes * 60)}</span><label>${t('total_study')}</label></div>
              <div><span>${stats.pomodoroCount}</span><label>${t('pomodoros')}</label></div>
            </div>
          </section>

          <section class="detail-card">
            <div class="dc-header">
              <h3>${t('notes_label')} (${notes.length})</h3>
              <button class="btn-sm" onclick="App.showAddNoteModal(${courseId})">${t('add_note')}</button>
            </div>
            ${notes.slice(0, 3).map(n => `
              <div class="note-preview" onclick="App.navigate('notes')">
                ${n.type === 'photo' ? `<img src="${n.imageData}" class="note-thumb" alt="">` : ''}
                <div class="np-content">
                  <span class="np-title">${n.title || 'Başlıksız'}</span>
                  <span class="np-preview">${n.content?.substring(0,60) || n.caption?.substring(0,60) || ''}</span>
                </div>
              </div>`).join('')}
          </section>
        </div>
      </div>`;
  }

  // ── SINAVLAR ──────────────────────────────────────────────────────────────
  async function renderExams(container) {
    const [upcoming, past] = await Promise.all([
      ExamsModule.getUpcoming(90),
      ExamsModule.getPastWithGrades(),
    ]);
    container.innerHTML = `
      <div class="page exams-page">
        <div class="page-header">
          <h2>${t('exams_title')}</h2>
          <button class="btn-primary" onclick="App.showAddExamModal()">${t('add_exam')}</button>
        </div>
        <section class="exams-section">
          <h3>${t('upcoming')}</h3>
          ${upcoming.length === 0 ? `<div class="empty-card"><span>✅</span><p>${t('no_upcoming')}</p></div>` : `
            <div class="exam-timeline">
              ${upcoming.map(e => `
                <div class="exam-timeline-item">
                  <div class="eti-countdown ${e.daysUntil <= 3 ? 'urgent' : e.daysUntil <= 7 ? 'warning' : ''}">
                    <span class="eti-days">${e.daysUntil}</span>
                    <span class="eti-unit">gün</span>
                  </div>
                  <div class="eti-line" style="border-color:${e.color}"></div>
                  <div class="eti-content">
                    <span class="eti-type ${e.type}">${e.type.toUpperCase()}</span>
                    <span class="eti-title">${e.title || e.type + ' Sınavı'}</span>
                    <span class="eti-course" style="color:${e.color}">${e.courseName}</span>
                    <span class="eti-date">${TimeUtils.formatDate(e.date)}${e.time ? ' · ' + TimeUtils.formatTime(e.time) : ''}${e.location ? ' · ' + e.location : ''}</span>
                  </div>
                  <button class="si-del" onclick="App.deleteExam(${e.id})">×</button>
                </div>`).join('')}
            </div>`}
        </section>
        ${past.length > 0 ? `
          <section class="exams-section">
            <h3>${t('past_exams')}</h3>
            <div class="exam-past-list">
              ${past.slice(0, 10).map(e => `
                <div class="exam-past-item">
                  <div class="epi-dot" style="background:${e.color}"></div>
                  <div class="epi-info">
                    <span>${e.title || e.type}</span>
                    <span class="epi-meta">${e.courseName} · ${TimeUtils.formatDate(e.date)}</span>
                  </div>
                  ${e.grade !== null
                    ? `<div class="epi-grade ${e.grade >= 90 ? 'excellent' : e.grade >= 75 ? 'good' : e.grade >= 60 ? 'ok' : 'poor'}">${e.grade}</div>`
                    : `<button class="btn-sm" onclick="App.addGrade(${e.id})">${t('add_grade')}</button>`}
                </div>`).join('')}
            </div>
          </section>` : ''}
      </div>`;
  }

  // ── POMODORO ──────────────────────────────────────────────────────────────
  async function renderPomodoro(container) {
    const [courses, stats] = await Promise.all([
      CoursesModule.getAll(),
      PomodoroModule.getStats(30),
    ]);
    const state = PomodoroModule.getState();
    const d = PomodoroModule.getDurations();
    const cfg = PomodoroModule.getSettings();
    const displayTime = state.isRunning ? PomodoroModule.formatTime(state.secondsLeft) : PomodoroModule.formatTime(d.WORK_DURATION);
    container.innerHTML = `
      <div class="page pomodoro-page">
        <div class="page-header">
          <h2>Pomodoro</h2>
          <button class="btn-secondary" onclick="App.showPomSettings()">⚙ ${t('pom_settings')}</button>
        </div>
        <div class="pom-durations-bar">
          <span class="pdb-item">🍅 ${cfg.workMin}dk</span>
          <span class="pdb-sep">·</span>
          <span class="pdb-item">☕ ${cfg.shortBreakMin}dk</span>
          <span class="pdb-sep">·</span>
          <span class="pdb-item">🌿 ${cfg.longBreakMin}dk</span>
        </div>
        <div class="pom-timer-section">
          <div class="pom-phase-label" id="pom-phase">
            ${state.isRunning ? (state.phase === 'work' ? t('focus_time') : t('break_time')) : t('pomodoro_ready')}
          </div>
          <div class="pom-timer-ring" id="pom-ring">
            <svg viewBox="0 0 200 200" class="pom-svg">
              <circle cx="100" cy="100" r="88" class="pom-track"/>
              <circle cx="100" cy="100" r="88" class="pom-progress" id="pom-circle" stroke-dasharray="553" stroke-dashoffset="0"/>
            </svg>
            <div class="pom-time-display">
              <span id="pom-time">${displayTime}</span>
              <span class="pom-session-count" id="pom-sessions">${t('session')} ${state.sessionCount + 1}</span>
            </div>
          </div>
          <div class="pom-goal-section">
            <input type="text" id="pom-goal" placeholder="${t('what_studying')}" class="pom-input" value="${state.currentSession?.goal || ''}">
            <select id="pom-course" class="pom-select">
              <option value="">${t('select_course_opt')}</option>
              ${courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="pom-controls">
            ${state.isRunning ? `
              <button class="pom-btn pause" id="pom-pause-btn" onclick="App.pomPause()">${state.isPaused ? t('resume') : t('pause')}</button>
              <button class="pom-btn skip" onclick="App.pomSkip()">${t('skip')}</button>
              <button class="pom-btn stop" onclick="App.pomStop()">${t('stop')}</button>
            ` : `
              <button class="pom-btn start" onclick="App.pomStart()">${t('start_focus')}</button>
            `}
          </div>
        </div>
        ${stats.totalPomodoros > 0 ? `
          <div class="pom-stats-section">
            <h3>${t('this_month')}</h3>
            <div class="pom-stat-cards">
              <div class="psc"><span>${stats.totalPomodoros}</span><label>🍅 ${t('pomodoros')}</label></div>
              <div class="psc"><span>${TimeUtils.formatDuration(stats.totalMinutes)}</span><label>⏱ ${t('total_study')}</label></div>
              ${stats.mostStudiedCourse ? `<div class="psc"><span style="font-size:0.8rem">${stats.mostStudiedCourse.courseName}</span><label>🏆 ${t('most_studied')}</label></div>` : ''}
            </div>
            ${stats.byCourse.length > 0 ? `
              <h4>${t('by_course')}</h4>
              <div class="pom-course-bars">
                ${stats.byCourse.map(cs => `
                  <div class="pcb-item">
                    <span class="pcb-name">${cs.courseName}</span>
                    <div class="pcb-bar-wrap"><div class="pcb-bar" style="width:${Math.round((cs.minutes/stats.totalMinutes)*100)}%;background:${cs.color}"></div></div>
                    <span class="pcb-time">${TimeUtils.formatDuration(cs.minutes)}</span>
                  </div>`).join('')}
              </div>` : ''}
          </div>` : ''}
      </div>`;
    if (state.isRunning) updatePomodoroDisplay(state);
  }

  function updatePomodoroDisplay(state) {
    const timeEl = document.getElementById('pom-time');
    const phaseEl = document.getElementById('pom-phase');
    const circleEl = document.getElementById('pom-circle');
    const sessionsEl = document.getElementById('pom-sessions');
    if (!timeEl) return;
    timeEl.textContent = PomodoroModule.formatTime(state.secondsLeft);
    const d = PomodoroModule.getDurations();
    const total = state.phase === 'work' ? d.WORK_DURATION :
                  state.phase === 'short-break' ? d.SHORT_BREAK : d.LONG_BREAK;
    const pct = state.secondsLeft / total;
    if (circleEl) circleEl.style.strokeDashoffset = 553 * (1 - pct);
    if (phaseEl) phaseEl.textContent = state.phase === 'work' ? t('focus_time') : t('break_time');
    if (sessionsEl) sessionsEl.textContent = t('session') + ' ' + (state.sessionCount + 1);
  }

  // ── NOTLAR (kategorili) ───────────────────────────────────────────────────
  async function renderNotes(container, activeCategoryId = null) {
    const [allNotes, courses, categories] = await Promise.all([
      NotesModule.getAll(),
      CoursesModule.getAll(),
      NotesModule.getAllCategories(),
    ]);

    let filteredNotes = allNotes.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    if (activeCategoryId !== null) {
      filteredNotes = filteredNotes.filter(n => n.categoryId === activeCategoryId);
    }

    container.innerHTML = `
      <div class="page notes-page">
        <div class="page-header">
          <h2>${t('notes_title')}</h2>
          <div class="header-actions">
            <button class="btn-icon" onclick="App.showManageCategoriesModal()" title="${t('manage_categories')}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            </button>
            <button class="btn-secondary" onclick="App.quickCapture()">📷</button>
            <button class="btn-primary" onclick="App.showAddNoteModal()">${t('add_note')}</button>
          </div>
        </div>

        <!-- Kategori sekmeleri -->
        <div class="note-category-tabs">
          <button class="nct-tab ${activeCategoryId === null ? 'active' : ''}" onclick="App.navigate('notes',{categoryId:null})">
            📋 ${t('all_notes')}
          </button>
          ${categories.map(cat => `
            <button class="nct-tab ${activeCategoryId === cat.id ? 'active' : ''}" onclick="App.navigate('notes',{categoryId:${cat.id}})"
              style="${activeCategoryId === cat.id ? 'border-color:' + cat.color + ';color:' + cat.color : ''}">
              ${cat.icon || '📁'} ${cat.name}
            </button>`).join('')}
        </div>

        <div class="notes-search">
          <input type="text" placeholder="${t('search_notes')}" oninput="App.searchNotes(this.value)" class="search-input">
        </div>

        ${filteredNotes.length === 0 ? `
          <div class="empty-state">
            <div class="es-icon">📝</div>
            <h3>${t('no_notes')}</h3>
            <p>${t('capture_thoughts')}</p>
          </div>
        ` : `
          <div class="notes-grid" id="notes-grid">
            ${filteredNotes.map(note => renderNoteCard(note, courses, categories)).join('')}
          </div>
        `}
      </div>`;
  }

  function renderNoteCard(note, courses, categories) {
    const course = courses.find(c => c.id === note.courseId);
    const category = categories.find(c => c.id === note.categoryId);
    const dateStr = note.createdAt ? new Date(note.createdAt).toLocaleDateString('tr-TR') : '';

    if (note.type === 'photo' && note.imageData) {
      return `
        <div class="note-card note-card-photo" data-id="${note.id}"
             onclick="App.handleNoteClick(event,${note.id},'photo')"
             onpointerdown="App.notePointerDown(event,${note.id})"
             onpointerup="App.notePointerUp(event)"
             onpointercancel="App.notePointerUp(event)">
          <div class="nc-select-check">✓</div>
          <div class="nc-photo">
            <img src="${note.imageData}" alt="${note.title || ''}">
          </div>
          <div class="nc-body">
            ${note.title ? `<h4 class="nc-title">${note.title}</h4>` : ''}
            ${note.caption ? `<p class="nc-caption">${note.caption}</p>` : ''}
            <div class="nc-footer">
              ${category ? `<span class="nc-category-badge" style="background:${category.color}22;color:${category.color};border:1px solid ${category.color}44">${category.icon||'📁'} ${category.name}</span>` : ''}
              ${course ? `<span class="nc-course" style="background:${course.color}20;color:${course.color}">${course.name}</span>` : ''}
              <span class="nc-date">${dateStr}</span>
            </div>
          </div>
        </div>`;
    }

    const displayTitle = note.title || (note.content || '').split('\n')[0].slice(0, 60) || 'Başlıksız';
    const previewContent = note.content
      ? (note.title ? note.content.slice(0, 100) : note.content.slice(displayTitle.length).trim().slice(0, 100))
      : '';

    return `
      <div class="note-card note-card-text" data-id="${note.id}"
           onclick="App.handleNoteClick(event,${note.id},'text')"
           onpointerdown="App.notePointerDown(event,${note.id})"
           onpointerup="App.notePointerUp(event)"
           onpointercancel="App.notePointerUp(event)">
        <div class="nc-select-check">✓</div>
        <div class="nc-body">
          <h4 class="nc-title-big">${displayTitle}${displayTitle.length >= 60 ? '…' : ''}</h4>
          ${previewContent ? `<p class="nc-preview">${previewContent}${previewContent.length >= 100 ? '…' : ''}</p>` : ''}
          <div class="nc-footer">
            ${category ? `<span class="nc-category-badge" style="background:${category.color}22;color:${category.color};border:1px solid ${category.color}44">${category.icon||'📁'} ${category.name}</span>` : ''}
            ${course ? `<span class="nc-course" style="background:${course.color}20;color:${course.color}">${course.name}</span>` : ''}
            <span class="nc-date">${dateStr}</span>
          </div>
        </div>
      </div>`;
  }

  // ── NOT SEÇME / BASILI TUTMA SİSTEMİ ────────────────────────────────────
  let _noteSelectMode = false;
  let _selectedNotes = new Set();
  let _longPressTimer = null;
  let _longPressTarget = null;

  function notePointerDown(e, id) {
    _longPressTarget = id;
    _longPressTimer = setTimeout(() => {
      _longPressTimer = null;
      enterNoteSelectMode(id);
    }, 500);
  }

  function notePointerUp(e) {
    if (_longPressTimer) {
      clearTimeout(_longPressTimer);
      _longPressTimer = null;
    }
  }

  function enterNoteSelectMode(firstId) {
    if (_noteSelectMode) return;
    _noteSelectMode = true;
    _selectedNotes = new Set([firstId]);

    // Titreşim
    if (navigator.vibrate) navigator.vibrate(40);

    // Toolbar göster
    _renderSelectToolbar();

    // Kartlara seçim modu animasyonu
    document.querySelectorAll('.note-card').forEach(el => {
      el.classList.add('select-mode');
    });
    const card = document.querySelector(`.note-card[data-id="${firstId}"]`);
    if (card) card.classList.add('selected');
  }

  function toggleNoteSelection(id) {
    const card = document.querySelector(`.note-card[data-id="${id}"]`);
    if (_selectedNotes.has(id)) {
      _selectedNotes.delete(id);
      card?.classList.remove('selected');
    } else {
      _selectedNotes.add(id);
      card?.classList.add('selected');
    }
    const toolbar = document.getElementById('note-select-toolbar');
    if (toolbar) {
      toolbar.querySelector('.nst-count').textContent = `${_selectedNotes.size} seçildi`;
      toolbar.querySelector('.nst-delete-btn').disabled = _selectedNotes.size === 0;
    }
    // Tümü seçildi mi kontrol et
    const allCards = document.querySelectorAll('.note-card');
    const allSelected = [...allCards].every(c => _selectedNotes.has(parseInt(c.dataset.id)));
    const selAllBtn = document.querySelector('.nst-selall-btn');
    if (selAllBtn) selAllBtn.textContent = allSelected ? 'Seçimi Kaldır' : 'Tümünü Seç';
  }

  function _renderSelectToolbar() {
    let toolbar = document.getElementById('note-select-toolbar');
    if (toolbar) toolbar.remove();
    toolbar = document.createElement('div');
    toolbar.id = 'note-select-toolbar';
    toolbar.className = 'note-select-toolbar';
    toolbar.innerHTML = `
      <button class="nst-cancel-btn" onclick="App.exitNoteSelectMode()">✕ İptal</button>
      <span class="nst-count">${_selectedNotes.size} seçildi</span>
      <button class="nst-selall-btn" onclick="App.toggleSelectAllNotes()">Tümünü Seç</button>
      <button class="nst-delete-btn" onclick="App.deleteSelectedNotes()" ${_selectedNotes.size === 0 ? 'disabled' : ''}>🗑 Sil</button>`;
    document.querySelector('.notes-page')?.prepend(toolbar);
  }

  function exitNoteSelectMode() {
    _noteSelectMode = false;
    _selectedNotes = new Set();
    document.querySelectorAll('.note-card').forEach(el => {
      el.classList.remove('select-mode', 'selected');
    });
    document.getElementById('note-select-toolbar')?.remove();
  }

  function toggleSelectAllNotes() {
    const allCards = document.querySelectorAll('.note-card');
    const allSelected = [...allCards].every(c => _selectedNotes.has(parseInt(c.dataset.id)));
    if (allSelected) {
      _selectedNotes.clear();
      allCards.forEach(c => c.classList.remove('selected'));
    } else {
      allCards.forEach(c => {
        const id = parseInt(c.dataset.id);
        _selectedNotes.add(id);
        c.classList.add('selected');
      });
    }
    const toolbar = document.getElementById('note-select-toolbar');
    if (toolbar) {
      toolbar.querySelector('.nst-count').textContent = `${_selectedNotes.size} seçildi`;
      toolbar.querySelector('.nst-selall-btn').textContent = allSelected ? 'Tümünü Seç' : 'Seçimi Kaldır';
      toolbar.querySelector('.nst-delete-btn').disabled = _selectedNotes.size === 0;
    }
  }

  async function deleteSelectedNotes() {
    if (_selectedNotes.size === 0) return;
    if (!confirm(`${_selectedNotes.size} not silinsin mi?`)) return;
    for (const id of _selectedNotes) {
      await NotesModule.remove(id);
    }
    exitNoteSelectMode();
    navigate('notes');
    showToast(`${_selectedNotes.size} not silindi`, 'success');
  }

  function handleNoteClick(e, id, type) {
    if (_noteSelectMode) {
      e.stopPropagation();
      toggleNoteSelection(id);
      return;
    }
    if (type === 'photo') {
      openPhotoFullscreen(id);
    } else {
      openNoteBook(id);
    }
  }

  // Not alanını düzenlenebilir yap (eski kartlar için)
  function makeNoteEditable(el) {
    el.contentEditable = 'true';
    el.classList.remove('nc-empty');
    el.focus();
    // İmleci sona taşı
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  // Not alanını kaydet (blur)
  async function saveNoteField(el) {
    const inNotebook = el.closest('.notebook-overlay');
    if (!inNotebook) el.contentEditable = 'false'; // not defteri dışında kapat
    const id = parseInt(el.dataset.id);
    const field = el.dataset.field;
    const value = el.innerText.trim();
    if (!id || !field) return;
    try {
      await NotesModule.update(id, { [field]: value });
    } catch(e) { console.warn('Note save error:', e); }
    if (!value && field === 'caption') el.classList.add('nc-empty');
  }

  // Not metnini genişlet/daralt
  function expandNote(btn) {
    const wrap = btn.closest('.nc-content-wrap');
    const isCollapsed = wrap.classList.contains('collapsed');
    wrap.classList.toggle('collapsed', !isCollapsed);
    btn.textContent = isCollapsed ? '↑ Daralt' : '↓ Devamını göster';
  }

  // Fotoğraf tam ekran görüntüleyici
  async function openPhotoFullscreen(noteId) {
    const note = await NotesModule.getAll().then(all => all.find(n => n.id === noteId));
    if (!note || !note.imageData) return;

    const overlay = document.createElement('div');
    overlay.className = 'photo-fullscreen-overlay';
    overlay.innerHTML = `
      <div class="pf-wrapper">
        <button class="pf-close" onclick="this.closest('.photo-fullscreen-overlay').remove()">✕</button>
        <img src="${note.imageData}" class="pf-img" alt="">
        <div class="pf-caption">${note.caption || note.title || ''}</div>
        <div class="pf-hint">Kapatmak için X veya dışına tıkla</div>
      </div>`;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));
  }


  // ══════════════════════════════════════════════════════════════════════════
  // DEVAMSIZLİK SAYFASI
  // ══════════════════════════════════════════════════════════════════════════
  async function renderAttendancePage(container) {
    const today = TimeUtils.todayString();
    const [courses, todayClasses] = await Promise.all([
      CoursesModule.getAll(),
      ScheduleModule.getTodayClasses(),
    ]);

    // Tüm derslerin devamsızlık özetini hesapla
    const summaries = await AttendanceModule.getAllCourseSummaries();

    // Bugünkü derslerin kayıt durumu
    const todayRecords = await AttendanceModule.getByDate(today);

    container.innerHTML = `
      <div class="page attendance-page">
        <div class="page-header">
          <h2>👥 Devamsızlık</h2>
          <button class="btn-primary" onclick="App.addManualAbsenceQuick()">+ Giriş Ekle</button>
        </div>

        <!-- Bugünkü Dersler — Giriş/Çıkış İşareti -->
        ${todayClasses.length > 0 ? `
          <section class="att-section">
            <h3 class="att-section-title">📅 Bugünkü Dersler</h3>
            <p class="att-section-sub">Katılmadığın derslerin yanındaki ✗'e bas</p>
            <div class="att-today-list">
              ${(await Promise.all(todayClasses.map(async (cls) => {
                const course = await CoursesModule.getById(cls.courseId);
                const record = todayRecords.find(r => r.courseId === cls.courseId);
                const status = record?.status || null;
                return `
                  <div class="att-today-item ${status ? 'recorded' : ''}">
                    <div class="att-ti-color" style="background:${course?.color || '#6366f1'}"></div>
                    <div class="att-ti-info">
                      <span class="att-ti-name">${course?.name || '?'}</span>
                      <span class="att-ti-time">${cls.startTime} – ${cls.endTime}</span>
                    </div>
                    ${status ? `
                      <div class="att-ti-status ${status}">
                        ${status === 'present' ? '✓ Katıldım' : status === 'absent' ? '✗ Giremedim' : status === 'late' ? '⏰ Geç' : '📋 Mazeretli'}
                      </div>
                      <button class="att-ti-undo" onclick="App.undoTodayAttendance(${cls.courseId})">↩</button>
                    ` : `
                      <div class="att-ti-btns">
                        <button class="atb present" onclick="App.markToday(${cls.courseId},'present')">✓</button>
                        <button class="atb late"    onclick="App.markToday(${cls.courseId},'late')">⏰</button>
                        <button class="atb absent"  onclick="App.markToday(${cls.courseId},'absent')">✗</button>
                      </div>
                    `}
                  </div>`;
              }))).join('')}
            </div>
          </section>
        ` : `
          <div class="att-no-classes">
            <span>📅</span>
            <p>Bugün ders yok</p>
          </div>
        `}

        <!-- Tüm Derslerin Devamsızlık Özeti -->
        <section class="att-section">
          <h3 class="att-section-title">📊 Devamsızlık Durumu</h3>
          ${summaries.length === 0 ? `
            <div class="empty-card"><span>📚</span><p>Henüz ders eklenmedi</p></div>
          ` : summaries.map(s => {
            const pct = s.allowedHours > 0 ? Math.round((s.absenceHours / s.allowedHours) * 100) : 0;
            const barColor = pct >= 100 ? '#ef4444' : pct >= 75 ? '#f59e0b' : '#22c55e';
            
            // Haftalık ders saatine göre kaç hafta / gün kaldı hesapla
            const weeklyH = s.allowedHours / (s.allowedHours / (s.absenceHours || 1)) || 0;
            // Kurs nesnesini bul
            const course = courses.find(co => co.id === s.courseId);
            const wkH = course?.weeklyHours || 1;
            const remainingH = s.remainingHours;
            const remainingWeeks = Math.floor(remainingH / wkH);
            const remainingDays  = course ? Math.round(remainingH / (wkH / (course.weeklyHours > 1 ? 2 : 1))) : 0;
            const remainingClasses = wkH > 0 ? Math.floor(remainingH / (wkH / 5)) : 0;

            return `
              <div class="att-course-card ${s.isOverLimit ? 'over-limit' : s.isAtRisk ? 'at-risk' : ''}">
                <div class="acc-header" onclick="App.toggleAttDetail(this)">
                  <div class="acc-dot" style="background:${s.color}"></div>
                  <div class="acc-info">
                    <span class="acc-name">${s.courseName}</span>
                    <span class="acc-stat">${s.absenceHours} / ${s.allowedHours} saat · %${pct}</span>
                  </div>
                  <div class="acc-badge ${s.isOverLimit ? 'danger' : s.isAtRisk ? 'warn' : 'ok'}">
                    ${s.isOverLimit ? '🚫 Limit Aşıldı' : s.isAtRisk ? '⚠️ Riskli' : '✓ Güvende'}
                  </div>
                  <span class="acc-chevron">›</span>
                </div>

                <!-- Progress bar -->
                <div class="acc-bar-wrap">
                  <div class="acc-bar-track">
                    <div class="acc-bar-fill" style="width:${Math.min(pct,100)}%;background:${barColor}"></div>
                  </div>
                </div>

                <!-- Kalan bilgisi -->
                <div class="acc-remain">
                  ${s.isOverLimit
                    ? `<span class="acc-over">⛔ Devamsızlık limitini aştınız!</span>`
                    : `<span class="acc-left">Kalan: <b>${remainingH} saat</b>${remainingWeeks > 0 ? ` · ~${remainingWeeks} hafta` : ''} · ~${remainingClasses} ders girebilirsiniz</span>`
                  }
                </div>

                <!-- Detay (gizli) -->
                <div class="acc-detail" style="display:none">
                  <div class="acc-records">
                    <h4>Son Kayıtlar</h4>
                    ${s.records.slice(0,5).map(r => `
                      <div class="acc-rec-item ${r.status}">
                        <span>${r.date}</span>
                        <span class="acc-rec-status">${r.status === 'absent' ? '✗ Giremedim' : r.status === 'present' ? '✓ Katıldım' : r.status === 'late' ? '⏰ Geç' : '📋 Mazeretli'}</span>
                        <span>${r.hours ? r.hours + 's' : ''}</span>
                        <button onclick="App.deleteAttRecord(${r.id})" class="acc-rec-del">×</button>
                      </div>`).join('')}
                  </div>
                  <button class="btn-sm btn-secondary" style="margin-top:8px" onclick="App.addManualAbsence(${s.courseId})">+ Manuel Ekle</button>
                </div>
              </div>`;
          }).join('')}
        </section>
      </div>`;
  }

  // Devamsızlık detay aç/kapat
  function toggleAttDetail(header) {
    const card = header.closest('.att-course-card');
    const detail = card.querySelector('.acc-detail');
    const chevron = card.querySelector('.acc-chevron');
    const isOpen = detail.style.display !== 'none';
    detail.style.display = isOpen ? 'none' : 'block';
    chevron.textContent = isOpen ? '›' : '‹';
  }

  // Bugün ders işaretle
  async function markToday(courseId, status) {
    const course = await CoursesModule.getById(courseId);
    const hours = status === 'absent' ? (course?.weeklyHours ? course.weeklyHours / 5 : 1) : 0;
    await AttendanceModule.record({ courseId, status, hours });
    // Devamsızlık uyarısı kontrol
    await checkAttendanceWarning(courseId);
    navigate('attendance');
  }

  // Bugünkü kaydı geri al
  async function undoTodayAttendance(courseId) {
    const today = TimeUtils.todayString();
    const records = await AttendanceModule.getByDate(today);
    const rec = records.find(r => r.courseId === courseId);
    if (rec) {
      await AttendanceModule.remove(rec.id);
      navigate('attendance');
    }
  }

  // Manuel devamsızlık ekle
  async function addManualAbsence(courseId) {
    const course = await CoursesModule.getById(courseId);
    showModal(`
      <div class="modal-header">
        <h3>Manuel Devamsızlık — ${course?.name}</h3>
        <button onclick="App.closeModal()">×</button>
      </div>
      <form class="modal-form" id="manual-att-form">
        <div class="form-group">
          <label>Tarih</label>
          <input name="date" type="date" value="${TimeUtils.todayString()}" required>
        </div>
        <div class="form-group">
          <label>Durum</label>
          <select name="status">
            <option value="absent">✗ Giremedim</option>
            <option value="present">✓ Katıldım</option>
            <option value="late">⏰ Geç Kaldım</option>
            <option value="excused">📋 Mazeretli</option>
          </select>
        </div>
        <div class="form-group">
          <label>Saat</label>
          <input name="hours" type="number" step="0.5" value="${course?.weeklyHours ? (course.weeklyHours/5).toFixed(1) : 1}" placeholder="1">
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" onclick="App.closeModal()">İptal</button>
          <button type="submit" class="btn-primary">Kaydet</button>
        </div>
      </form>`);

    document.getElementById('manual-att-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      await AttendanceModule.record({ courseId, ...data });
      await checkAttendanceWarning(courseId);
      closeModal();
      navigate('attendance');
      showToast('Kayıt eklendi', 'success');
    });
  }

  // Sınav için in-app bildirim oluştur (14 gün eşiği)
  async function scheduleExamInAppNotif(exam) {
    try {
      const course = await CoursesModule.getById(exam.courseId);
      const daysUntil = TimeUtils.daysUntil(exam.date);
      if (daysUntil < 0 || daysUntil > 14) return;
      const todayStr = new Date().toISOString().split('T')[0];
      await DB.addRecord(DB.STORES.IN_APP_NOTIFS, {
        type: 'exam-upcoming',
        title: (exam.title || exam.type) + ' — ' + (course?.name || ''),
        message: daysUntil === 0 ? 'Bugün!' : daysUntil === 1 ? 'Yarın!' : daysUntil + ' gün sonra',
        scheduledAt: todayStr + 'T08:00:00',
        read: false,
        icon: daysUntil <= 2 ? '🚨' : daysUntil <= 7 ? '📝' : '📅',
        examId: exam.id,
      });
    } catch(e) {}
  }

  async function deleteAttRecord(id) {
    await AttendanceModule.remove(id);
    navigate('attendance');
  }

  // Herhangi bir ders için devamsızlık girişi
  async function addManualAbsenceQuick() {
    const allCourses = await CoursesModule.getAll();
    if (allCourses.length === 0) {
      showToast('Önce ders eklemelisin', 'error');
      return;
    }
    const opts = allCourses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    showModal(`
      <div class="modal-header">
        <h3>📋 Devamsızlık Girişi</h3>
        <button onclick="App.closeModal()">×</button>
      </div>
      <form class="modal-form" id="qatt-form">
        <div class="form-group">
          <label>Ders</label>
          <select name="courseId" required>
            <option value="">Ders seç...</option>
            ${opts}
          </select>
        </div>
        <div class="form-group">
          <label>Tarih</label>
          <input name="date" type="date" value="${TimeUtils.todayString()}" required>
        </div>
        <div class="form-group">
          <label>Durum</label>
          <select name="status">
            <option value="absent">✗ Giremedim</option>
            <option value="present">✓ Katıldım</option>
            <option value="late">⏰ Geç Kaldım</option>
            <option value="excused">📋 Mazeretli</option>
          </select>
        </div>
        <div class="form-group">
          <label>Saat</label>
          <input name="hours" type="number" step="0.5" min="0" value="1">
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" onclick="App.closeModal()">İptal</button>
          <button type="submit" class="btn-primary">Kaydet</button>
        </div>
      </form>`);
    document.getElementById('qatt-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      if (!data.courseId) { showToast('Ders seçmelisin', 'error'); return; }
      data.courseId = parseInt(data.courseId);
      await AttendanceModule.record(data);
      await checkAttendanceWarning(data.courseId);
      closeModal();
      navigate('attendance');
      showToast('Kayıt eklendi ✓', 'success');
    });
  }

  // Devamsızlık sınırı uyarısı — bildirimler alanına da yazar
  async function checkAttendanceWarning(courseId) {
    try {
      const summary = await AttendanceModule.getCourseAttendanceSummary(courseId);
      if (!summary) return;
      if (!summary.isAtRisk && !summary.isOverLimit) return;

      const course = courses ? courses.find(co => co.id === courseId) : null;
      const wkH = course?.weeklyHours || summary.allowedHours / 14 || 1;
      const remainW = Math.floor(summary.remainingHours / wkH);
      const remainCls = Math.floor(summary.remainingHours / (wkH / 5 || 1));

      let msg;
      if (summary.isOverLimit) {
        msg = `⛔ ${summary.courseName}: Devamsızlık limiti aşıldı!`;
      } else {
        msg = `⚠️ ${summary.courseName}: ${summary.remainingHours} saat · ~${remainW} hafta · ~${remainCls} ders kaldı`;
      }

      // In-app bildirim ekle
      if (window.DB) {
        await DB.addRecord(DB.STORES.IN_APP_NOTIFS, {
          type: 'attendance-warning',
          title: msg,
          message: '',
          scheduledAt: new Date().toISOString(),
          read: false,
          icon: summary.isOverLimit ? '🚫' : '⚠️',
          courseId,
        });
      }
    } catch(e) { console.warn('checkAttendanceWarning', e); }
  }

  // ── İSTATİSTİK ────────────────────────────────────────────────────────────
  // ── HATIRLATICIlar SAYFASI ───────────────────────────────────────────────
  async function renderReminders(container) {
    const reminders = await RemindersModule.getAll();

    container.innerHTML = `
      <div class="page reminders-page">
        <div class="page-header">
          <h2>🔔 Hatırlatıcılar</h2>
          <button class="btn-primary" onclick="App.showAddReminderModal()">+ Ekle</button>
        </div>

        ${reminders.length === 0 ? `
          <div class="empty-state">
            <div class="es-icon">🔔</div>
            <h3>Henüz hatırlatıcı yok</h3>
            <p>Önemli tarihler için hatırlatıcı ekleyin</p>
            <button class="btn-primary" onclick="App.showAddReminderModal()">+ Hatırlatıcı Ekle</button>
          </div>
        ` : `
          <div class="reminders-list">
            ${reminders.map(r => {
              const isExact = r.type === 'exact';
              const dateInfo = isExact
                ? r.date + ' · ' + r.count + ' bildirim'
                : r.startDate + ' → ' + r.endDate + ' · ' + r.time;
              return `
                <div class="reminder-card ${r.active ? '' : 'inactive'}">
                  <div class="rc-left">
                    <div class="rc-icon-big">${isExact ? '📅' : '🔁'}</div>
                    <div class="rc-info">
                      <span class="rc-title">${r.title}</span>
                      ${r.message ? `<span class="rc-msg">${r.message}</span>` : ''}
                      <span class="rc-date">${dateInfo}</span>
                      <span class="rc-type-badge ${isExact ? 'exact' : 'range'}">${isExact ? 'Tam Tarih' : 'Tarih Aralığı'}</span>
                    </div>
                  </div>
                  <div class="rc-actions">
                    <label class="toggle-switch" style="transform:scale(0.85)">
                      <input type="checkbox" ${r.active ? 'checked' : ''} onchange="App.toggleReminder(${r.id}, this.checked)">
                      <span class="toggle-slider"></span>
                    </label>
                    <button class="si-del" onclick="App.deleteReminder(${r.id})">🗑️</button>
                  </div>
                </div>`;
            }).join('')}
          </div>
        `}

        <!-- Bilgi kartı -->
        <div class="reminder-info-card">
          <h4>💡 Nasıl Çalışır?</h4>
          <div class="ri-item">
            <span class="ri-badge exact">📅 Tam Tarih</span>
            <span>Seçtiğin günde, belirlediğin sayıda eşit aralıklı bildirim gelir</span>
          </div>
          <div class="ri-item">
            <span class="ri-badge range">🔁 Tarih Aralığı</span>
            <span>Başlangıç ve bitiş tarihleri arasında her gün seçilen saatte bildirim gelir</span>
          </div>
          <p style="font-size:0.75rem;color:var(--text-muted);margin-top:8px">Tüm bildirimler Ana Sayfa'daki Bildirimler alanında görünür.</p>
        </div>
      </div>`;
  }

  // Hatırlatıcı modal
  async function showAddReminderModal() {
    const today = new Date().toISOString().split('T')[0];
    showModal(`
      <div class="modal-header">
        <h3>🔔 Yeni Hatırlatıcı</h3>
        <button onclick="App.closeModal()">×</button>
      </div>
      <form class="modal-form" id="reminder-form">
        <div class="form-group">
          <label>Başlık *</label>
          <input name="title" required placeholder="örn. Final çalışması, Ödev teslimi">
        </div>
        <div class="form-group">
          <label>Açıklama</label>
          <input name="message" placeholder="İsteğe bağlı not...">
        </div>

        <!-- Tür seçimi -->
        <div class="form-group">
          <label>Hatırlatıcı Türü</label>
          <div class="reminder-type-tabs">
            <button type="button" class="rtt-btn active" id="tab-exact" onclick="App.switchReminderTab('exact')">
              📅 Tam Tarih
            </button>
            <button type="button" class="rtt-btn" id="tab-range" onclick="App.switchReminderTab('range')">
              🔁 Tarih Aralığı
            </button>
          </div>
          <input type="hidden" name="type" id="reminder-type-val" value="exact">
        </div>

        <!-- TAM TARİH paneli -->
        <div id="panel-exact">
          <div class="form-group">
            <label>Tarih *</label>
            <input name="exactDate" type="date" value="${today}" min="${today}">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Başlangıç Saati</label>
              <input name="exactStartHour" type="number" min="0" max="23" value="8" placeholder="8">
            </div>
            <div class="form-group">
              <label>Bitiş Saati</label>
              <input name="exactEndHour" type="number" min="0" max="23" value="22" placeholder="22">
            </div>
          </div>
          <div class="form-group">
            <label>Bildirim Sayısı (1–20)</label>
            <input name="notifCount" type="number" min="1" max="20" value="3" placeholder="3">
            <span class="form-hint">Seçilen zaman diliminde eşit aralıklarla gönderilir</span>
          </div>
        </div>

        <!-- TARİH ARALIĞI paneli -->
        <div id="panel-range" style="display:none">
          <div class="form-row">
            <div class="form-group">
              <label>Başlangıç *</label>
              <input name="startDate" type="date" value="${today}" min="${today}">
            </div>
            <div class="form-group">
              <label>Bitiş *</label>
              <input name="endDate" type="date" value="${today}" min="${today}">
            </div>
          </div>
          <div class="form-group">
            <label>Her Gün Saat</label>
            <input name="rangeTime" type="time" value="08:00">
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" onclick="App.closeModal()">İptal</button>
          <button type="submit" class="btn-primary">Kaydet</button>
        </div>
      </form>`);

    document.getElementById('reminder-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      try {
        await RemindersModule.add(data);
        closeModal();
        navigate('reminders');
        showToast('🔔 Hatırlatıcı eklendi!', 'success');
      } catch(err) {
        showToast(err.message, 'error');
      }
    });
  }

  function switchReminderTab(type) {
    document.getElementById('reminder-type-val').value = type;
    document.getElementById('tab-exact').classList.toggle('active', type === 'exact');
    document.getElementById('tab-range').classList.toggle('active', type === 'range');
    document.getElementById('panel-exact').style.display = type === 'exact' ? '' : 'none';
    document.getElementById('panel-range').style.display = type === 'range' ? '' : 'none';
  }

  async function toggleReminder(id, active) {
    const r = await RemindersModule.getById(id);
    if (!r) return;
    await RemindersModule.update(id, { ...r, active });
    showToast(active ? '🔔 Hatırlatıcı açıldı' : 'Hatırlatıcı kapatıldı', 'success');
  }

  async function deleteReminder(id) {
    if (!confirm('Bu hatırlatıcıyı silmek istiyor musunuz?')) return;
    await RemindersModule.remove(id);
    navigate('reminders');
    showToast('Hatırlatıcı silindi', 'success');
  }

  // Bildirim aksiyonları (Dashboard)
  async function tapNotif(id, type, courseId, examId) {
    await RemindersModule.markRead(id);
    if (type === 'class-today' && courseId) navigate('course-detail', { id: courseId });
    else if (type === 'exam-upcoming' && examId) navigate('exams');
    else navigate('reminders');
  }

  async function markAllNotifsRead() {
    await RemindersModule.markAllRead();
    navigate('dashboard');
  }

  async function deleteInAppNotif(id) {
    await RemindersModule.deleteInAppNotif(id);
    navigate('dashboard');
  }

  async function renderStatistics(container) {
    const [courses, allPomodoros, allExams] = await Promise.all([
      CoursesModule.getAll(),
      DB.getAllRecords(DB.STORES.POMODORO),
      ExamsModule.getAll(),
    ]);

    const today = new Date();
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today); d.setDate(today.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    const dailyMins = weekDays.map(date => ({
      label: t('day_short_' + new Date(date + 'T12:00:00').getDay()),
      date,
      mins: allPomodoros.filter(p => p.date === date).reduce((s, p) => s + (p.totalMinutes || 0), 0),
    }));

    const maxMins = Math.max(...dailyMins.map(d => d.mins), 1);
    const totalWeekMins = dailyMins.reduce((s, d) => s + d.mins, 0);
    const totalAllMins = allPomodoros.reduce((s, p) => s + (p.totalMinutes || 0), 0);
    const courseStudy = courses.map(c => ({
      course: c,
      mins: allPomodoros.filter(p => p.courseId === c.id).reduce((s, p) => s + (p.totalMinutes || 0), 0),
    })).filter(cs => cs.mins > 0).sort((a, b) => b.mins - a.mins);

    const gradedExams = allExams.filter(e => e.grade !== null && e.grade !== undefined);
    const avgGrade = gradedExams.length
      ? Math.round(gradedExams.reduce((s, e) => s + parseFloat(e.grade), 0) / gradedExams.length * 10) / 10
      : null;

    const attendanceSummary = await Promise.all(courses.map(async c => {
      const stats = await CoursesModule.getStats(c.id);
      return { course: c, stats };
    }));

    container.innerHTML = `
      <div class="page statistics-page">
        <div class="page-header"><h2>${t('stats_title')}</h2></div>
        <div class="stats-summary-grid">
          <div class="ss-card"><span class="ss-num">${Math.round(totalWeekMins / 60 * 10) / 10}s</span><span class="ss-label">${t('this_week')}</span></div>
          <div class="ss-card"><span class="ss-num">${Math.round(totalAllMins / 60)}s</span><span class="ss-label">${t('total_hours')}</span></div>
          <div class="ss-card"><span class="ss-num">${allPomodoros.length}</span><span class="ss-label">${t('pomodoros')}</span></div>
          <div class="ss-card ${avgGrade !== null ? (avgGrade >= 70 ? 'good' : avgGrade >= 50 ? 'ok' : 'poor') : ''}">
            <span class="ss-num">${avgGrade !== null ? avgGrade : '–'}</span><span class="ss-label">${t('avg_grade')}</span>
          </div>
        </div>
        <div class="stat-card">
          <h3>${t('weekly_study_chart')}</h3>
          <div class="bar-chart-wrap">
            ${dailyMins.map(d => `
              <div class="bar-chart-col ${d.date === TimeUtils.todayString() ? 'today' : ''}">
                <span class="bar-label-top">${d.mins > 0 ? Math.round(d.mins) + 'm' : ''}</span>
                <div class="bar-chart-bar" style="height:${Math.max(d.mins / maxMins * 100, d.mins > 0 ? 4 : 0)}%"></div>
                <span class="bar-day">${d.label}</span>
              </div>`).join('')}
          </div>
        </div>
        ${courseStudy.length > 0 ? `
          <div class="stat-card">
            <h3>${t('study_by_course')}</h3>
            ${courseStudy.map(cs => `
              <div class="course-study-row">
                <div class="csr-left"><div class="csr-dot" style="background:${cs.course.color}"></div><span class="csr-name">${cs.course.name}</span></div>
                <div class="csr-right">
                  <div class="csr-bar-wrap"><div class="csr-bar" style="width:${Math.round(cs.mins / (courseStudy[0].mins || 1) * 100)}%;background:${cs.course.color}"></div></div>
                  <span class="csr-time">${TimeUtils.formatDuration(cs.mins)}</span>
                </div>
              </div>`).join('')}
          </div>` : ''}
        <div class="stat-card">
          <h3>${t('attendance_overview')}</h3>
          ${attendanceSummary.length === 0 ? `<p class="empty-text">${t('no_courses_yet')}</p>` :
            attendanceSummary.map(({ course, stats }) => `
              <div class="att-overview-row" onclick="App.navigate('course-detail',{id:${course.id}})">
                <div class="aor-left"><div class="aor-dot" style="background:${course.color}"></div><span class="aor-name">${course.name}</span></div>
                <div class="aor-right">
                  <div class="aor-bar-wrap"><div class="aor-bar ${stats.isAtRisk ? 'danger' : 'safe'}" style="width:${Math.min(100, stats.absencePercentage)}%"></div></div>
                  <span class="aor-pct ${stats.isAtRisk ? 'danger-text' : ''}">${stats.absencePercentage}%</span>
                </div>
              </div>`).join('')}
        </div>
        ${gradedExams.length > 0 ? `
          <div class="stat-card">
            <h3>${t('exam_grades')}</h3>
            ${gradedExams.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8).map(e => {
              const course = courses.find(c => c.id === e.courseId);
              const gc = e.grade >= 70 ? 'var(--success)' : e.grade >= 50 ? 'var(--warning)' : 'var(--danger)';
              return `
                <div class="grade-row">
                  <div class="gr-left">
                    ${course ? `<span class="gr-course" style="background:${course.color}22;color:${course.color}">${course.name}</span>` : ''}
                    <span class="gr-type">${e.type} · ${TimeUtils.formatDateShort(e.date)}</span>
                  </div>
                  <span class="gr-score" style="color:${gc}">${e.grade}</span>
                </div>`}).join('')}
          </div>` : ''}
      </div>`;
  }

  // ── AYARLAR ───────────────────────────────────────────────────────────────
  async function renderSettings(container) {
    const notifClassEnabled = await DB.getSetting('notif_class', true);
    const notifExamEnabled  = await DB.getSetting('notif_exam', true);
    const hasNotifPermission = NotificationsModule.hasPermission;

    container.innerHTML = `
      <div class="page settings-page">
        <div class="page-header"><h2>${t('settings_title')}</h2></div>

        <!-- Dil -->
        <div class="settings-section">
          <h3 class="settings-section-title">🌐 ${t('language')}</h3>
          <div class="settings-card">
            <div class="settings-row">
              <div class="sr-info">
                <span class="sr-label">${t('language')}</span>
                <span class="sr-desc">${t('language_desc')}</span>
              </div>
              <div class="sr-control">
                <button class="lang-btn ${lang === 'tr' ? 'active' : ''}" onclick="App.setLanguage('tr')">🇹🇷 Türkçe</button>
                <button class="lang-btn ${lang === 'en' ? 'active' : ''}" onclick="App.setLanguage('en')">🇬🇧 English</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bildirimler -->
        <div class="settings-section">
          <h3 class="settings-section-title">🔔 ${t('notifications_section')}</h3>
          <div class="settings-card">
            <div class="settings-row">
              <div class="sr-info">
                <span class="sr-label">${t('notif_permission')}</span>
                <span class="sr-desc">${t('notif_permission_desc')}</span>
              </div>
              <div class="sr-control">
                ${hasNotifPermission
                  ? '<span class="status-badge ok">✓ Verildi</span>'
                  : `<button class="btn-sm btn-primary" onclick="App.requestNotifPermission()">${t('request_permission')}</button>`}
              </div>
            </div>
            <div class="settings-divider"></div>
            <div class="settings-row">
              <div class="sr-info">
                <span class="sr-label">${t('notif_class_reminder')}</span>
                <span class="sr-desc">${t('notif_class_desc')}</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" ${notifClassEnabled !== false ? 'checked' : ''} onchange="App.setNotifSetting('notif_class', this.checked)">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="settings-divider"></div>
            <div class="settings-row">
              <div class="sr-info">
                <span class="sr-label">${t('notif_exam_countdown')}</span>
                <span class="sr-desc">${t('notif_exam_desc')}</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" ${notifExamEnabled !== false ? 'checked' : ''} onchange="App.setNotifSetting('notif_exam', this.checked)">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="settings-divider"></div>
            <div class="settings-row">
              <div class="sr-info">
                <span class="sr-label">${t('notif_reschedule')}</span>
                <span class="sr-desc">Tüm bildirimleri yeniden planla</span>
              </div>
              <button class="btn-sm btn-secondary" onclick="App.rescheduleNotifications()">🔄</button>
            </div>
          </div>
        </div>

        <!-- Tema Editörü -->
        <div class="settings-section">
          <h3 class="settings-section-title">🎨 ${t('appearance')}</h3>
          <div class="settings-card theme-editor-card" id="theme-editor-wrapper">
            ${buildThemeEditorHTML()}
          </div>
        </div>

        <!-- Yedek -->
        <div class="settings-section">
          <h3 class="settings-section-title">💾 ${t('backup_title')}</h3>
          <div class="settings-card">
            <div class="settings-row">
              <div class="sr-info">
                <span class="sr-label">${t('export_backup')}</span>
                <span class="sr-desc">${t('export_desc')}</span>
              </div>
              <button class="btn-sm btn-primary" onclick="App.doExport()">${t('export_btn')}</button>
            </div>
            <div class="settings-divider"></div>
            <div class="settings-row">
              <div class="sr-info">
                <span class="sr-label">${t('import_backup')}</span>
                <span class="sr-desc">${t('import_desc')}</span>
              </div>
              <button class="btn-sm btn-secondary" onclick="App.doImport()">${t('import_btn')}</button>
            </div>
            <div class="settings-divider"></div>
            <div class="settings-row">
              <div class="sr-info">
                <span class="sr-label">${t('clear_all')}</span>
                <span class="sr-desc">${t('clear_desc')}</span>
              </div>
              <button class="btn-sm btn-danger" onclick="App.confirmClearAll()">${t('clear_btn')}</button>
            </div>
          </div>
        </div>

      </div>`;
  }

  // ── YEDEK (eski sayfa kalsın, backup nav'ı kaldırmadık ama settings'e taşıdık) ──
  async function renderBackup(container) {
    renderSettings(container); // Yedek sayfası → ayarlar'a yönlendir
  }

  // ── TEMA EDİTÖRÜ ─────────────────────────────────────────────────────────
  let _themeColors = null;
  let _themeGroup = 0;

  function getThemeColors() {
    if (!_themeColors) _themeColors = ThemeEngine.getCurrentColors();
    return _themeColors;
  }

  const THEME_GROUP_LABELS = [
    { label: '🎨 Arkaplan', keys: ['--bg-base','--bg-surface','--bg-elevated','--bg-card','--bg-input'] },
    { label: '✏️ Metin',    keys: ['--text-primary','--text-secondary','--text-muted'] },
    { label: '💜 Vurgu',    keys: ['--accent','--accent-light'] },
    { label: '🚦 Durum',    keys: ['--success','--warning','--danger','--info'] },
    { label: '🔲 Kenarlık', keys: ['--border','--border-light'] },
  ];

  const THEME_VAR_LABELS = {
    '--bg-base':'Ana Arkaplan','--bg-surface':'Yüzey','--bg-elevated':'Yükseltilmiş',
    '--bg-card':'Kart','--bg-input':'Giriş Alanı',
    '--text-primary':'Ana Metin','--text-secondary':'İkincil Metin','--text-muted':'Soluk Metin',
    '--accent':'Ana Vurgu','--accent-light':'Açık Vurgu',
    '--success':'Başarı','--warning':'Uyarı','--danger':'Hata','--info':'Bilgi',
    '--border':'Kenarlık','--border-light':'Açık Kenarlık',
  };

  function buildThemeEditorHTML() {
    const colors = getThemeColors();
    const presets = ThemeEngine.PRESETS;
    const group = THEME_GROUP_LABELS[_themeGroup];
    const allVars = ThemeEngine.COLOR_VARS;

    const accent = colors['--accent'] || '#6366f1';
    const bgBase = colors['--bg-base'] || '#0d0f14';
    const bgSurf = colors['--bg-surface'] || '#141720';
    const bgElev = colors['--bg-elevated'] || '#1c2030';
    const bgCard = colors['--bg-card'] || '#1e2235';
    const textP  = colors['--text-primary'] || '#eef0f7';
    const textS  = colors['--text-secondary'] || '#8892aa';
    const textM  = colors['--text-muted'] || '#545e78';
    const bord   = colors['--border'] || '#2a3048';
    const suc    = colors['--success'] || '#22c55e';
    const warn   = colors['--warning'] || '#f59e0b';
    const accL   = colors['--accent-light'] || '#818cf8';

    const phonePreview = `
      <div class="te-phone-wrap">
        <div class="te-phone" style="background:${bgBase};border-color:${bord}">
          <div class="te-statusbar" style="background:${bgSurf};border-color:${bord}">
            <span style="color:${textP};font-size:9px;font-weight:700">9:41</span>
            <span style="color:${textS};font-size:8px">📶🔋</span>
          </div>
          <div class="te-content">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
              <div>
                <div style="font-size:13px;font-weight:800;color:${textP}">Pazartesi</div>
                <div style="font-size:8px;color:${textS}">Mart 10</div>
              </div>
              <div style="display:flex;gap:4px">
                ${[['4','Ders'],['2','Sınav'],['7','Pom']].map(([n,l])=>`
                  <div style="background:${bgElev};border:1px solid ${bord};border-radius:6px;padding:3px 5px;text-align:center">
                    <div style="font-size:11px;font-weight:800;color:${textP}">${n}</div>
                    <div style="font-size:6px;color:${textM};font-weight:600">${l}</div>
                  </div>`).join('')}
              </div>
            </div>
            <div style="background:${bgElev};border:1px solid ${bord};border-left:3px solid ${accent};border-radius:7px;padding:6px 8px;margin-bottom:6px;display:flex;align-items:center;gap:6px">
              <div style="flex:1">
                <div style="font-size:7px;color:${textM};font-weight:700;text-transform:uppercase">Sıradaki</div>
                <div style="font-size:10px;font-weight:700;color:${textP}">Matematik 101</div>
                <div style="font-size:7px;color:${textS}">10:00 · B203</div>
              </div>
              <div style="background:${accent};color:white;border-radius:5px;padding:2px 6px;font-size:9px;font-weight:700">35m</div>
            </div>
            ${[['Matematik',accent],['Fizik',suc],['Tarih',warn]].map(([name,col])=>`
              <div style="background:${bgCard};border:1px solid ${bord};border-left:3px solid ${col};border-radius:6px;padding:5px 7px;margin-bottom:4px;display:flex;align-items:center">
                <div style="flex:1">
                  <div style="font-size:9px;font-weight:700;color:${textP}">${name}</div>
                  <div style="font-size:7px;color:${textS}">10:00</div>
                </div>
                <div style="width:16px;height:16px;border-radius:50%;background:${suc}22;display:flex;align-items:center;justify-content:center;font-size:9px">✓</div>
              </div>`).join('')}
            <div style="display:flex;gap:4px;margin-top:4px">
              ${['+ Ders','⏱ Pomodoro','+ Not'].map((btn,i)=>`
                <div style="flex:1;background:${bgElev};border:1px solid ${bord};border-radius:6px;padding:4px 2px;text-align:center;font-size:7px;font-weight:700;color:${i===0?accL:textS}">${btn}</div>`).join('')}
            </div>
          </div>
          <div class="te-nav" style="background:${bgSurf};border-color:${bord}">
            ${[['🏠','Ana'],['📅','Prog'],['📚','Ders'],['📝','Sın'],['⏱','Tim'],['📒','Not'],['⚙️','Ayr']].map(([ic,lb],i)=>`
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:1px;color:${i===0?accL:textM}">
                <span style="font-size:10px">${ic}</span>
                <span style="font-size:5px;font-weight:700;text-transform:uppercase">${lb}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>`;

    const presetsHTML = presets.map((p,idx) => `
      <button class="te-preset-btn" onclick="App.applyThemePreset(${idx})">
        <div style="display:flex;gap:3px;margin-bottom:4px">
          ${['--bg-base','--accent','--success','--warning'].map(k=>`
            <div style="width:11px;height:11px;border-radius:50%;background:${p.colors[k]};border:1px solid rgba(255,255,255,0.15)"></div>`).join('')}
        </div>
        <span>${p.name}</span>
      </button>`).join('');

    const groupTabsHTML = THEME_GROUP_LABELS.map((g,gi) => `
      <button class="te-group-tab ${gi===_themeGroup?'active':''}" onclick="App.setThemeGroup(${gi})">${g.label}</button>`).join('');

    const colorRowsHTML = group.keys.map(key => {
      const val = colors[key] || allVars.find(v=>v.key===key)?.default || '#000000';
      const safeVal = /^#[0-9A-Fa-f]{6}$/.test(val) ? val : '#6366f1';
      return `
        <div class="te-color-row">
          <label class="te-swatch-label">
            <div class="te-swatch" style="background:${val}"></div>
            <input type="color" value="${safeVal}" onchange="App.updateThemeColor('${key}',this.value)" class="te-color-native">
          </label>
          <div class="te-var-info">
            <span class="te-var-label">${THEME_VAR_LABELS[key] || key}</span>
            <span class="te-var-key">${key}</span>
          </div>
          <input type="text" value="${val}" maxlength="7" class="te-hex-input"
            oninput="App.updateThemeColor('${key}',this.value)" placeholder="#000000">
        </div>`;
    }).join('');

    return `
      <div class="te-preview-section">
        <div class="te-section-title">📱 Canlı Önizleme</div>
        ${phonePreview}
      </div>
      <div class="te-presets-section">
        <div class="te-section-title">✨ Hazır Temalar</div>
        <div class="te-presets-grid">${presetsHTML}</div>
      </div>
      <div class="te-colors-section">
        <div class="te-section-title">🖌️ Renkleri Düzenle</div>
        <div class="te-group-tabs">${groupTabsHTML}</div>
        <div class="te-color-list">${colorRowsHTML}</div>
      </div>
      <div class="te-actions">
        <button class="btn-secondary" onclick="App.resetTheme()">↺ Varsayılana Dön</button>
        <button class="btn-primary" onclick="App.saveTheme()">💾 Temayı Kaydet</button>
      </div>`;
  }

  function updateThemeColor(key, val) {
    if (!/^#[0-9A-Fa-f]{3,7}$/.test(val)) return;
    const colors = getThemeColors();
    colors[key] = val;
    _themeColors = colors;
    ThemeEngine.applyToDOM(colors);
    const wrapper = document.getElementById('theme-editor-wrapper');
    if (wrapper) wrapper.innerHTML = buildThemeEditorHTML();
  }

  function applyThemePreset(idx) {
    _themeColors = { ...ThemeEngine.getDefaults(), ...ThemeEngine.PRESETS[idx].colors };
    ThemeEngine.applyToDOM(_themeColors);
    const wrapper = document.getElementById('theme-editor-wrapper');
    if (wrapper) wrapper.innerHTML = buildThemeEditorHTML();
  }

  function setThemeGroup(gi) {
    _themeGroup = gi;
    const wrapper = document.getElementById('theme-editor-wrapper');
    if (wrapper) wrapper.innerHTML = buildThemeEditorHTML();
  }

  function saveTheme() {
    ThemeEngine.save(getThemeColors());
    showToast(lang === 'tr' ? '🎨 Tema kaydedildi!' : '🎨 Theme saved!', 'success');
  }

  function resetTheme() {
    _themeColors = ThemeEngine.reset();
    const wrapper = document.getElementById('theme-editor-wrapper');
    if (wrapper) wrapper.innerHTML = buildThemeEditorHTML();
    showToast(lang === 'tr' ? 'Tema sıfırlandı' : 'Theme reset', 'success');
  }

  // ── AYARLAR AKSİYONLARI ──────────────────────────────────────────────────
  async function setLanguage(newLang) {
    lang = newLang;
    await DB.setSetting('lang', lang);
    applyI18nToNav();
    renderSettings(document.getElementById('app-content'));
    showToast(lang === 'tr' ? 'Dil Türkçe olarak ayarlandı' : 'Language set to English', 'success');
  }

  async function setNotifSetting(key, value) {
    await DB.setSetting(key, value);
    if (key === 'notif_class' && value) await NotificationsModule.scheduleClassReminders();
    if (key === 'notif_exam'  && value) await NotificationsModule.scheduleExamCountdowns();
  }

  async function requestNotifPermission() {
    await NotificationsModule.requestPermission();
    renderSettings(document.getElementById('app-content'));
  }

  async function rescheduleNotifications() {
    await NotificationsModule.refreshAll();
    showToast(lang === 'tr' ? 'Bildirimler yenilendi' : 'Notifications refreshed', 'success');
  }

  // Özel renk yönetimi
  function previewColor(hex) {
    const preview = document.getElementById('color-add-preview');
    const native = document.getElementById('color-picker-native');
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      if (preview) preview.style.background = hex;
      if (native) native.value = hex;
    }
  }

  function syncColorPicker(hex) {
    const input = document.getElementById('color-hex-input');
    const preview = document.getElementById('color-add-preview');
    if (input) input.value = hex;
    if (preview) preview.style.background = hex;
  }

  async function addCustomColor() {
    const input = document.getElementById('color-hex-input');
    const hex = input?.value?.trim();
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) { showToast(t('color_invalid'), 'error'); return; }
    if (allColors().includes(hex)) { showToast(t('color_exists'), 'warning'); return; }
    customColors.push(hex);
    await DB.setSetting('customColors', customColors);
    renderSettings(document.getElementById('app-content'));
    showToast(t('color_added'), 'success');
  }

  async function removeCustomColor(hex) {
    customColors = customColors.filter(c => c !== hex);
    await DB.setSetting('customColors', customColors);
    renderSettings(document.getElementById('app-content'));
    showToast(t('color_removed'), 'success');
  }

  // ── MODALLER ──────────────────────────────────────────────────────────────
  function showModal(html) {
    let overlay = document.getElementById('modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'modal-overlay';
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = `
      <div class="modal-backdrop" onclick="App.closeModal()"></div>
      <div class="modal-content">${html}</div>`;
    overlay.classList.add('active');
  }

  function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  // Color picker HTML helper (varsayılan + özel renkler)
  function colorPickerHtml(selectedColor) {
    return `
      <div class="color-picker">
        ${allColors().map(c => `
          <button type="button" class="color-opt ${selectedColor === c ? 'selected' : ''}"
            style="background:${c}" data-color="${c}" onclick="App.selectColor(this,'${c}')"></button>`).join('')}
      </div>
      <input type="hidden" name="color" value="${selectedColor || allColors()[0]}">`;
  }

  async function showAddCourseModal(courseId = null) {
    let course = null;
    if (courseId) course = await CoursesModule.getById(courseId);
    const title = course ? t('edit') + ' ' + t('nav_courses').slice(0, -1) : t('add_course').replace('+ ', '');

    showModal(`
      <div class="modal-header">
        <h3>${title}</h3>
        <button onclick="App.closeModal()">×</button>
      </div>
      <form class="modal-form" id="course-form">
        <div class="form-group">
          <label>${t('course_name')} *</label>
          <input name="name" required value="${course?.name || ''}" placeholder="örn. Fizik 101">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${t('classroom')}</label>
            <input name="classroom" value="${course?.classroom || ''}" placeholder="örn. B103">
          </div>
          <div class="form-group">
            <label>${t('credits')}</label>
            <input name="credit" type="number" step="0.5" value="${course?.credit || ''}" placeholder="3">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${t('weekly_hours')}</label>
            <input name="weeklyHours" type="number" step="0.5" value="${course?.weeklyHours || ''}" placeholder="3">
          </div>
          <div class="form-group">
            <label>${t('max_absence_weeks')}</label>
            <input name="maxAbsenceWeeks" type="number" value="${course?.maxAbsenceWeeks || ''}" placeholder="2">
          </div>
        </div>
        <div class="form-group">
          <label>${t('instructor')}</label>
          <input name="instructor" value="${course?.instructor || ''}" placeholder="Hoca adı">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${t('semester_start')}</label>
            <input name="semesterStart" type="date" value="${course?.semesterStart || ''}">
          </div>
          <div class="form-group">
            <label>${t('semester_end')}</label>
            <input name="semesterEnd" type="date" value="${course?.semesterEnd || ''}">
          </div>
        </div>
        <div class="form-group">
          <label>${t('color')}</label>
          ${colorPickerHtml(course?.color)}
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" onclick="App.closeModal()">${t('cancel')}</button>
          <button type="submit" class="btn-primary">${t('save')}</button>
        </div>
      </form>`);

    document.getElementById('course-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      try {
        if (courseId) { await CoursesModule.update(courseId, data); }
        else { await CoursesModule.add(data); await NotificationsModule.refreshAll(); }
        closeModal();
        navigate(courseId ? 'course-detail' : 'courses', { id: courseId });
        showToast(course ? t('course_updated') : t('course_added'), 'success');
      } catch (err) { showToast(err.message, 'error'); }
    });
  }

  async function showEditCourseModal(courseId) { return showAddCourseModal(courseId); }

  async function showAddScheduleModal(preselectedCourseId = null) {
    const courses = await CoursesModule.getAll();
    if (!courses.length) { showToast(t('add_course_first'), 'warning'); return; }

    showModal(`
      <div class="modal-header">
        <h3>${t('add_class')}</h3>
        <button onclick="App.closeModal()">×</button>
      </div>
      <form class="modal-form" id="schedule-form">
        <div class="form-group">
          <label>${t('nav_courses')} *</label>
          <select name="courseId" required>
            ${courses.map(c => `<option value="${c.id}" ${preselectedCourseId == c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Gün *</label>
          <select name="day" required>
            ${Array.from({length:7},(_,i) => `<option value="${i}">${t('day_' + i)}</option>`).join('')}
          </select>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Başlangıç *</label><input name="startTime" type="time" required></div>
          <div class="form-group"><label>Bitiş *</label><input name="endTime" type="time" required></div>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" onclick="App.closeModal()">${t('cancel')}</button>
          <button type="submit" class="btn-primary">${t('save')}</button>
        </div>
      </form>`);

    document.getElementById('schedule-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      data.courseId = parseInt(data.courseId); data.day = String(data.day);
      try {
        await ScheduleModule.save(data);
        await NotificationsModule.scheduleClassReminders();
        closeModal();
        navigate(preselectedCourseId ? 'course-detail' : 'schedule', { id: preselectedCourseId });
        showToast(t('class_added'), 'success');
      } catch (err) {
        if (err.type === 'CONFLICT') {
          const confirmed = confirm('⚠️ ' + err.message + '\n\n' + t('add_anyway'));
          if (confirmed) {
            await ScheduleModule.save(data, true);
            closeModal();
            navigate(preselectedCourseId ? 'course-detail' : 'schedule', { id: preselectedCourseId });
            showToast(t('conflict_added'), 'warning');
          }
        } else { showToast(err.message, 'error'); }
      }
    });
  }

  async function showAddExamModal(preselectedCourseId = null) {
    const courses = await CoursesModule.getAll();
    showModal(`
      <div class="modal-header">
        <h3>${t('add_exam')}</h3>
        <button onclick="App.closeModal()">×</button>
      </div>
      <form class="modal-form" id="exam-form">
        ${courses.length > 0 ? `
          <div class="form-group">
            <label>${t('nav_courses')}</label>
            <select name="courseId">
              <option value="">Ders yok</option>
              ${courses.map(c => `<option value="${c.id}" ${preselectedCourseId == c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>` : ''}
        <div class="form-group">
          <label>${t('exam_type')} *</label>
          <select name="type" required>
            <option value="midterm">${t('midterm')}</option>
            <option value="final">${t('final')}</option>
            <option value="quiz">${t('quiz')}</option>
            <option value="other">${t('other')}</option>
          </select>
        </div>
        <div class="form-group"><label>${t('exam_title')}</label><input name="title" placeholder="örn. Ara Sınav 1"></div>
        <div class="form-row">
          <div class="form-group"><label>${t('exam_date')}</label><input name="date" type="date" required></div>
          <div class="form-group"><label>${t('exam_time')}</label><input name="time" type="time"></div>
        </div>
        <div class="form-group"><label>${t('location')}</label><input name="location" placeholder="örn. A201"></div>
        <div class="form-group"><label>${t('notes_field')}</label><textarea name="note" rows="2" placeholder="Notlar..."></textarea></div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" onclick="App.closeModal()">${t('cancel')}</button>
          <button type="submit" class="btn-primary">${t('save')}</button>
        </div>
      </form>`);

    document.getElementById('exam-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      if (data.courseId) data.courseId = parseInt(data.courseId);
      try {
        const saved = await ExamsModule.add(data);
        await NotificationsModule.scheduleExamCountdowns();
        // 14 gün içindeyse hemen in-app bildirim oluştur
        await scheduleExamInAppNotif(saved);
        closeModal();
        navigate(preselectedCourseId ? 'course-detail' : 'exams', { id: preselectedCourseId });
        showToast(t('exam_added'), 'success');
      } catch (err) { showToast(err.message, 'error'); }
    });
  }

  async function showAddNoteModal(preselectedCourseId = null, preselectedCategoryId = null) {
    const [courses, categories] = await Promise.all([
      CoursesModule.getAll(),
      NotesModule.getAllCategories(),
    ]);

    showModal(`
      <div class="modal-header">
        <h3>${t('add_note')}</h3>
        <button onclick="App.closeModal()">×</button>
      </div>
      <form class="modal-form" id="note-form">
        ${categories.length > 0 ? `
          <div class="form-group">
            <label>${t('category_opt')}</label>
            <select name="categoryId">
              <option value="">${t('no_category')}</option>
              ${categories.map(c => `<option value="${c.id}" ${preselectedCategoryId == c.id ? 'selected' : ''}>${c.icon || '📁'} ${c.name}</option>`).join('')}
            </select>
          </div>` : ''}
        ${courses.length > 0 ? `
          <div class="form-group">
            <label>${t('course_opt')}</label>
            <select name="courseId">
              <option value="">${t('no_category')}</option>
              ${courses.map(c => `<option value="${c.id}" ${preselectedCourseId == c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>` : ''}
        <div class="form-group"><label>${t('note_title')}</label><input name="title" placeholder="${t('note_title')}"></div>
        <div class="form-group"><label>${t('note_content')}</label><textarea name="content" rows="5" required placeholder="${t('write_note')}"></textarea></div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" onclick="App.closeModal()">${t('cancel')}</button>
          <button type="submit" class="btn-primary">${t('save_note')}</button>
        </div>
      </form>`);

    document.getElementById('note-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      if (data.courseId) data.courseId = parseInt(data.courseId);
      if (data.categoryId) data.categoryId = parseInt(data.categoryId);
      await NotesModule.addText(data);
      closeModal();
      navigate('notes');
      showToast(t('note_saved'), 'success');
    });
  }

  // Kategori yönetim modal'ı
  async function showManageCategoriesModal() {
    const categories = await NotesModule.getAllCategories();

    showModal(`
      <div class="modal-header">
        <h3>${t('manage_categories')}</h3>
        <button onclick="App.closeModal()">×</button>
      </div>
      <div class="category-manager">
        <div class="cat-list" id="cat-list">
          ${categories.length === 0 ? `<p class="empty-text">${t('no_categories')}</p>` :
            categories.map(cat => `
              <div class="cat-item">
                <div class="cat-icon" style="background:${cat.color}22;color:${cat.color}">${cat.icon || '📁'}</div>
                <span class="cat-name">${cat.name}</span>
                <div class="cat-swatch" style="background:${cat.color}"></div>
                <button class="cat-del" onclick="App.deleteCategory(${cat.id})">🗑️</button>
              </div>`).join('')}
        </div>
        <div class="cat-add-form">
          <h4>Yeni Kategori</h4>
          <div class="form-row">
            <div class="form-group" style="flex:0 0 56px">
              <label>İkon</label>
              <input id="cat-icon" type="text" maxlength="2" value="📁" style="text-align:center;font-size:1.2rem">
            </div>
            <div class="form-group" style="flex:1">
              <label>${t('category_name')} *</label>
              <input id="cat-name" placeholder="örn. Fizik, Matematik">
            </div>
          </div>
          <div class="form-group">
            <label>${t('color')}</label>
            <div class="color-picker" id="cat-color-picker">
              ${allColors().map((c,i) => `
                <button type="button" class="color-opt ${i === 0 ? 'selected' : ''}"
                  style="background:${c}" data-color="${c}" onclick="App.selectCatColor(this,'${c}')"></button>`).join('')}
            </div>
            <input type="hidden" id="cat-color-val" value="${allColors()[0]}">
          </div>
          <button class="btn-primary" style="width:100%" onclick="App.saveNewCategory()">${t('add_category')}</button>
        </div>
      </div>`);
  }

  function selectCatColor(btn, color) {
    document.querySelectorAll('#cat-color-picker .color-opt').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const hidden = document.getElementById('cat-color-val');
    if (hidden) hidden.value = color;
  }

  async function saveNewCategory() {
    const name  = document.getElementById('cat-name')?.value?.trim();
    const icon  = document.getElementById('cat-icon')?.value?.trim() || '📁';
    const color = document.getElementById('cat-color-val')?.value || allColors()[0];
    if (!name) { showToast(lang === 'tr' ? 'Kategori adı gerekli' : 'Category name required', 'error'); return; }
    await NotesModule.addCategory({ name, icon, color });
    closeModal();
    navigate('notes');
    showToast(lang === 'tr' ? 'Kategori eklendi' : 'Category added', 'success');
  }

  async function deleteCategory(id) {
    if (!confirm(t('delete_category_confirm'))) return;
    await NotesModule.removeCategory(id);
    closeModal();
    navigate('notes');
    showToast(lang === 'tr' ? 'Kategori silindi' : 'Category deleted', 'success');
  }

  // ── AKSİYONLAR ───────────────────────────────────────────────────────────
  async function quickAttendance(courseId) {
    const course = await CoursesModule.getById(courseId);
    if (!course) return;
    showModal(`
      <div class="modal-header">
        <h3>${t('mark_attendance')}</h3>
        <button onclick="App.closeModal()">×</button>
      </div>
      <div class="attendance-modal">
        <p>${course.name} · Bugün</p>
        <div class="att-btn-group">
          <button class="att-modal-btn present" onclick="App.recordAttendance(${courseId},'present');App.closeModal();App.showToast('${t('present')}','success')">✓ ${t('present')}</button>
          <button class="att-modal-btn late"    onclick="App.recordAttendance(${courseId},'late');App.closeModal();App.showToast('${t('late')}','warning')">⏰ ${t('late')}</button>
          <button class="att-modal-btn absent"  onclick="App.recordAttendance(${courseId},'absent');App.closeModal();App.showToast('${t('absent')}','error')">✗ ${t('absent')}</button>
        </div>
      </div>`);
  }

  async function recordAttendance(courseId, status) {
    const course = await CoursesModule.getById(courseId);
    const hours = course?.weeklyHours ? course.weeklyHours / 5 : 0;
    await AttendanceModule.record({ courseId, status, hours: status === 'absent' ? hours : 0 });
    navigate(currentPage === 'course-detail' ? 'course-detail' : currentPage, { id: courseId });
  }

  async function quickCapture() {
    try {
      const imageData = await NotesModule.capturePhoto();
      const [courses, categories] = await Promise.all([CoursesModule.getAll(), NotesModule.getAllCategories()]);
      showModal(`
        <div class="modal-header">
          <h3>${lang === 'tr' ? 'Fotoğraf Notu Kaydet' : 'Save Photo Note'}</h3>
          <button onclick="App.closeModal()">×</button>
        </div>
        <form class="modal-form" id="photo-form">
          <img src="${imageData}" style="width:100%;border-radius:8px;margin-bottom:12px">
          ${categories.length > 0 ? `
            <div class="form-group">
              <label>${t('category_opt')}</label>
              <select name="categoryId">
                <option value="">${t('no_category')}</option>
                ${categories.map(c => `<option value="${c.id}">${c.icon || '📁'} ${c.name}</option>`).join('')}
              </select>
            </div>` : ''}
          <div class="form-group"><label>${t('caption')}</label><input name="caption" placeholder="${t('caption')}..."></div>
          ${courses.length > 0 ? `
            <div class="form-group">
              <label>${t('course_opt')}</label>
              <select name="courseId">
                <option value="">${t('no_category')}</option>
                ${courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
              </select>
            </div>` : ''}
          <input type="hidden" name="imageData" value="${imageData}">
          <div class="modal-actions">
            <button type="button" class="btn-secondary" onclick="App.closeModal()">${t('discard')}</button>
            <button type="submit" class="btn-primary">${t('save_photo')}</button>
          </div>
        </form>`);

      document.getElementById('photo-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        if (data.courseId) data.courseId = parseInt(data.courseId);
        if (data.categoryId) data.categoryId = parseInt(data.categoryId);
        await NotesModule.addPhoto(data);
        closeModal(); navigate('notes');
        showToast(t('photo_saved'), 'success');
      });
    } catch (err) { showToast('Fotoğraf alınamadı: ' + err.message, 'error'); }
  }

  function quickAddNote() { showAddNoteModal(null); }

  async function deleteCourse(id) {
    if (!confirm(t('confirm_delete_course'))) return;
    await CoursesModule.remove(id);
    navigate('courses');
    showToast(t('course_deleted'), 'success');
  }

  async function deleteScheduleItem(id, returnCourseId = null) {
    if (!confirm(t('confirm_delete_schedule'))) return;
    await ScheduleModule.remove(id);
    await NotificationsModule.scheduleClassReminders();
    if (returnCourseId) navigate('course-detail', { id: returnCourseId });
    else navigate('schedule');
    showToast(t('schedule_removed'), 'success');
  }

  async function deleteExam(id, returnCourseId = null) {
    if (!confirm(t('confirm_delete_exam'))) return;
    await ExamsModule.remove(id);
    if (returnCourseId) navigate('course-detail', { id: returnCourseId });
    else navigate('exams');
    showToast(t('exam_deleted'), 'success');
  }

  async function deleteNote(id) {
    if (!confirm(t('confirm_delete_note'))) return;
    await NotesModule.remove(id);
    navigate('notes');
    showToast(t('note_deleted'), 'success');
  }

  // Not defteri görünümü — tam ekran, çizgili sayfa
  async function openNoteBook(id) {
    const note = await NotesModule.getById(id);
    if (!note) return;
    const [courses, categories] = await Promise.all([CoursesModule.getAll(), NotesModule.getAllCategories()]);
    const course = courses.find(c => c.id === note.courseId);
    const category = categories.find(c => c.id === note.categoryId);
    const dateStr = note.createdAt ? new Date(note.createdAt).toLocaleDateString('tr-TR', { day:'numeric', month:'long', year:'numeric' }) : '';

    const overlay = document.createElement('div');
    overlay.className = 'notebook-overlay';
    overlay.innerHTML = `
      <div class="notebook-page">
        <div class="notebook-topbar">
          <button class="nb-back" onclick="this.closest('.notebook-overlay').remove()">← Geri</button>
          <div class="nb-meta">
            ${category ? `<span class="nc-category-badge" style="background:${category.color}22;color:${category.color};border:1px solid ${category.color}44">${category.icon||'📁'} ${category.name}</span>` : ''}
            ${course ? `<span class="nc-course" style="background:${course.color}20;color:${course.color}">${course.name}</span>` : ''}
          </div>
          <button class="nb-delete" onclick="App.deleteNoteFromBook(${id}, this)">🗑 Sil</button>
        </div>
        <div class="notebook-paper">
          <div class="notebook-lines"></div>
          <div class="notebook-content">
            <div class="nb-title-wrap">
              <div class="nb-title"
                   contenteditable="true"
                   data-id="${id}"
                   data-field="title"
                   onblur="App.saveNoteField(this)"
                   placeholder="Başlık…">${note.title || ''}</div>
            </div>
            <div class="nb-body"
                 contenteditable="true"
                 data-id="${id}"
                 data-field="content"
                 onblur="App.saveNoteField(this)"
                 placeholder="Notlarını buraya yaz…">${(note.content || '').replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="notebook-footer">
          <span class="nb-date">${dateStr}</span>
          <span class="nb-wordcount" id="nb-wc-${id}"></span>
        </div>
      </div>`;

    document.body.appendChild(overlay);

    // Kelime sayacı
    const bodyEl = overlay.querySelector('.nb-body');
    const wcEl = overlay.querySelector(`#nb-wc-${id}`);
    function updateWC() {
      const words = (bodyEl.innerText || '').trim().split(/\s+/).filter(Boolean).length;
      wcEl.textContent = words + ' kelime';
    }
    updateWC();
    bodyEl.addEventListener('input', updateWC);

    // Geri tuşu ile kapat
    const escHandler = (e) => { if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', escHandler); } };
    document.addEventListener('keydown', escHandler);
  }

  async function deleteNoteFromBook(id, btn) {
    if (!confirm(t('confirm_delete_note'))) return;
    await NotesModule.remove(id);
    btn.closest('.notebook-overlay').remove();
    navigate('notes');
    showToast(t('note_deleted'), 'success');
  }

  async function addGrade(examId) {
    showModal(`
      <div class="modal-header">
        <h3>${t('add_grade')}</h3>
        <button onclick="App.closeModal()">×</button>
      </div>
      <form class="modal-form" id="grade-form">
        <div class="form-group">
          <label>${t('grade')}</label>
          <input name="grade" type="number" min="0" max="100" step="0.1" required placeholder="87.5">
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" onclick="App.closeModal()">${t('cancel')}</button>
          <button type="submit" class="btn-primary">${t('save')}</button>
        </div>
      </form>`);
    document.getElementById('grade-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      await ExamsModule.update(examId, { grade: parseFloat(data.grade) });
      closeModal(); navigate('exams');
      showToast(t('grade_saved'), 'success');
    });
  }

  // ── POMODORO KONTROLLERİ ─────────────────────────────────────────────────
  async function pomStart() {
    const goalInput = document.getElementById('pom-goal');
    const courseSelect = document.getElementById('pom-course');
    PomodoroModule.start(
      { goal: goalInput?.value || '', courseId: courseSelect?.value ? parseInt(courseSelect.value) : null },
      {
        onTick: (state) => updatePomodoroDisplay(state),
        onPhaseEnd: (state) => { updatePomodoroDisplay(state); renderPomodoro(document.getElementById('app-content')); },
      }
    );
    await renderPomodoro(document.getElementById('app-content'));
  }

  function pomPause() {
    PomodoroModule.pause();
    const btn = document.getElementById('pom-pause-btn');
    if (btn) btn.textContent = PomodoroModule.getState().isPaused ? t('resume') : t('pause');
  }

  function pomSkip() { PomodoroModule.skip(); }

  function pomStop() {
    if (!confirm(t('stop_pomodoro_confirm'))) return;
    PomodoroModule.stop();
    renderPomodoro(document.getElementById('app-content'));
  }

  function showPomSettings() {
    const cfg = PomodoroModule.getSettings();
    showModal(`
      <div class="modal-header">
        <h3>⚙ ${t('pom_settings')}</h3>
        <button onclick="App.closeModal()">×</button>
      </div>
      <form class="modal-form" id="pom-cfg-form">
        <div class="pom-settings-grid">
          <div class="form-group">
            <label>${t('pom_work')}</label>
            <div class="pom-cfg-row">
              <button type="button" class="pom-cfg-btn" onclick="App.stepPomVal('workMin',-5)">−</button>
              <input id="pom-cfg-work" name="workMin" type="number" min="1" max="120" value="${cfg.workMin}" class="pom-cfg-input">
              <button type="button" class="pom-cfg-btn" onclick="App.stepPomVal('workMin',5)">+</button>
            </div>
          </div>
          <div class="form-group">
            <label>${t('pom_short_break')}</label>
            <div class="pom-cfg-row">
              <button type="button" class="pom-cfg-btn" onclick="App.stepPomVal('shortBreakMin',-1)">−</button>
              <input id="pom-cfg-short" name="shortBreakMin" type="number" min="1" max="60" value="${cfg.shortBreakMin}" class="pom-cfg-input">
              <button type="button" class="pom-cfg-btn" onclick="App.stepPomVal('shortBreakMin',1)">+</button>
            </div>
          </div>
          <div class="form-group">
            <label>${t('pom_long_break')}</label>
            <div class="pom-cfg-row">
              <button type="button" class="pom-cfg-btn" onclick="App.stepPomVal('longBreakMin',-5)">−</button>
              <input id="pom-cfg-long" name="longBreakMin" type="number" min="1" max="60" value="${cfg.longBreakMin}" class="pom-cfg-input">
              <button type="button" class="pom-cfg-btn" onclick="App.stepPomVal('longBreakMin',5)">+</button>
            </div>
          </div>
          <div class="form-group">
            <label>${t('pom_sessions')}</label>
            <div class="pom-cfg-row">
              <button type="button" class="pom-cfg-btn" onclick="App.stepPomVal('sessionsBeforeLong',-1)">−</button>
              <input id="pom-cfg-sessions" name="sessionsBeforeLong" type="number" min="1" max="10" value="${cfg.sessionsBeforeLong}" class="pom-cfg-input">
              <button type="button" class="pom-cfg-btn" onclick="App.stepPomVal('sessionsBeforeLong',1)">+</button>
            </div>
          </div>
        </div>
        <div class="modal-actions" style="margin-top:16px">
          <button type="button" class="btn-secondary" onclick="App.resetPomSettings()">Varsayılana Döndür</button>
          <button type="submit" class="btn-primary">${t('save')}</button>
        </div>
      </form>`);

    document.getElementById('pom-cfg-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      PomodoroModule.saveSettings({
        workMin: Math.max(1, parseInt(data.workMin) || 25),
        shortBreakMin: Math.max(1, parseInt(data.shortBreakMin) || 5),
        longBreakMin: Math.max(1, parseInt(data.longBreakMin) || 15),
        sessionsBeforeLong: Math.max(1, parseInt(data.sessionsBeforeLong) || 4),
      });
      PomodoroModule.stop();
      PomodoroModule.reset();
      closeModal();
      renderPomodoro(document.getElementById('app-content'));
      showToast('Pomodoro ayarları kaydedildi ✓', 'success');
    });
  }

  function stepPomVal(field, delta) {
    const map = { workMin: 'pom-cfg-work', shortBreakMin: 'pom-cfg-short', longBreakMin: 'pom-cfg-long', sessionsBeforeLong: 'pom-cfg-sessions' };
    const el = document.getElementById(map[field]);
    if (!el) return;
    el.value = Math.max(parseInt(el.min) || 1, Math.min(parseInt(el.max) || 120, (parseInt(el.value) || 0) + delta));
  }

  function resetPomSettings() {
    PomodoroModule.saveSettings({ workMin: 25, shortBreakMin: 5, longBreakMin: 15, sessionsBeforeLong: 4 });
    closeModal();
    renderPomodoro(document.getElementById('app-content'));
    showToast('Varsayılan değerlere döndürüldü', 'success');
  }

  // ── ARAMA ────────────────────────────────────────────────────────────────
  async function searchNotes(query) {
    if (!query.trim()) { navigate('notes'); return; }
    const [results, courses, categories] = await Promise.all([
      NotesModule.searchNotes(query),
      CoursesModule.getAll(),
      NotesModule.getAllCategories(),
    ]);
    const grid = document.getElementById('notes-grid');
    if (!grid) return;
    grid.innerHTML = results.map(note => renderNoteCard(note, courses, categories)).join('')
      || `<p class="empty-text">${t('no_results')}</p>`;
  }

  // ── YEDEK ────────────────────────────────────────────────────────────────
  async function doExport() {
    try { const r = await BackupModule.exportBackup(); showToast(r.message, 'success'); }
    catch (err) { showToast('Export hatası: ' + err.message, 'error'); }
  }

  async function doImport() {
    try { const r = await BackupModule.importFromFile(); showToast(r.message, 'success'); navigate('dashboard'); }
    catch (err) { showToast('Import hatası: ' + err.message, 'error'); }
  }

  async function confirmClearAll() {
    if (!confirm(t('confirm_clear_all'))) return;
    if (!confirm(t('confirm_clear_all2'))) return;
    await BackupModule.clearAllData();
    showToast(t('data_cleared'), 'success');
    navigate('dashboard');
  }

  // ── YARDIMCILAR ──────────────────────────────────────────────────────────
  function selectColor(btn, color) {
    document.querySelectorAll('.color-opt').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const form = btn.closest('form');
    if (form) { const h = form.querySelector('input[name="color"]'); if (h) h.value = color; }
  }

  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
  }

  // ── BAŞLATMA ─────────────────────────────────────────────────────────────
  async function init() {
    try { ThemeEngine.load(); } catch(e) {}
    try {
      await DB.openDatabase();
      await loadSettings();
    } catch(e) {
      console.error('DB init error:', e);
      // DB açılmasa bile devam et
    }
    // Bildirimler non-blocking
    NotificationsModule.init().catch(()=>{});
    NotificationsModule.createChannel().catch(()=>{});
    navigate('dashboard');
  }

  return {
    init, navigate, t,
    showModal, closeModal,
    showAddCourseModal, showEditCourseModal, showAddScheduleModal,
    showAddExamModal, showAddNoteModal,
    showManageCategoriesModal, saveNewCategory, deleteCategory, selectCatColor,
    quickAttendance, recordAttendance, quickCapture, quickAddNote,
    markToday, undoTodayAttendance, addManualAbsence, addManualAbsenceQuick, deleteAttRecord, toggleAttDetail,
    makeNoteEditable, saveNoteField, expandNote, openPhotoFullscreen, openNoteBook, deleteNoteFromBook,
    notePointerDown, notePointerUp, handleNoteClick,
    exitNoteSelectMode, toggleSelectAllNotes, deleteSelectedNotes,
    deleteCourse, deleteScheduleItem, deleteExam, deleteNote, addGrade,
    pomStart, pomPause, pomSkip, pomStop, showPomSettings, stepPomVal, resetPomSettings,
    searchNotes, doExport, doImport, confirmClearAll,
    selectColor, showToast,
    setLanguage, setNotifSetting, requestNotifPermission, rescheduleNotifications,
    previewColor, syncColorPicker, addCustomColor, removeCustomColor,
    buildThemeEditorHTML, updateThemeColor, applyThemePreset, setThemeGroup, saveTheme, resetTheme,
    // Hatırlatıcılar
    showAddReminderModal, switchReminderTab, toggleReminder, deleteReminder,
    // Bildirimler
    tapNotif, markAllNotifsRead, deleteInAppNotif,
    renderStatistics,
  };
})();

window.App = App;

document.addEventListener('DOMContentLoaded', () => { App.init(); });
