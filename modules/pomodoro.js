/**
 * Pomodoro Module
 * Student Academic Manager
 */

const PomodoroModule = (() => {
  // Ayarları localStorage'dan oku, yoksa varsayılan değerleri kullan
  function getSettings() {
    try {
      const s = localStorage.getItem('pom_settings_v1');
      if (s) return JSON.parse(s);
    } catch(e) {}
    return { workMin: 25, shortBreakMin: 5, longBreakMin: 15, sessionsBeforeLong: 4 };
  }

  function saveSettings(cfg) {
    localStorage.setItem('pom_settings_v1', JSON.stringify(cfg));
  }

  function getDurations() {
    const s = getSettings();
    return {
      WORK_DURATION: s.workMin * 60,
      SHORT_BREAK: s.shortBreakMin * 60,
      LONG_BREAK: s.longBreakMin * 60,
      SESSIONS_BEFORE_LONG_BREAK: s.sessionsBeforeLong,
    };
  }

  // Eski sabit değerlere referans için (dışarıdan erişilebilir)
  const WORK_DURATION = 25 * 60;
  const SHORT_BREAK = 5 * 60;
  const LONG_BREAK = 15 * 60;
  const SESSIONS_BEFORE_LONG_BREAK = 4;

  let timer = null;
  let state = {
    isRunning: false,
    isPaused: false,
    phase: 'work',
    secondsLeft: getDurations().WORK_DURATION,
    sessionCount: 0,
    currentSession: null,
    onTick: null,
    onPhaseEnd: null,
  };

  function start(sessionData, callbacks = {}) {
    if (state.isRunning) stop();
    const d = getDurations();

    state.currentSession = {
      courseId: sessionData.courseId || null,
      goal: sessionData.goal || '',
      startTime: new Date().toISOString(),
      pomodorosCompleted: 0,
      totalMinutes: 0,
    };

    state.isRunning = true;
    state.isPaused = false;
    state.phase = 'work';
    state.secondsLeft = d.WORK_DURATION;
    state.sessionCount = 0;
    state.onTick = callbacks.onTick || null;
    state.onPhaseEnd = callbacks.onPhaseEnd || null;

    tick();
  }

  function pause() {
    if (!state.isRunning) return;
    state.isPaused = !state.isPaused;
    if (!state.isPaused) tick();
  }

  function stop() {
    if (timer) { clearTimeout(timer); timer = null; }
    state.isRunning = false;
    state.isPaused = false;
  }

  function skip() {
    if (timer) { clearTimeout(timer); timer = null; }
    handlePhaseEnd();
  }

  function reset() {
    stop();
    state.secondsLeft = getDurations().WORK_DURATION;
    state.phase = 'work';
    state.sessionCount = 0;
  }

  function tick() {
    if (!state.isRunning || state.isPaused) return;
    if (state.onTick) state.onTick({ ...state });
    if (state.secondsLeft <= 0) { handlePhaseEnd(); return; }
    state.secondsLeft--;
    timer = setTimeout(tick, 1000);
  }

  async function handlePhaseEnd() {
    if (timer) { clearTimeout(timer); timer = null; }
    const d = getDurations();
    const workMinutes = Math.round(d.WORK_DURATION / 60);

    if (state.phase === 'work') {
      state.sessionCount++;
      state.currentSession.pomodorosCompleted++;
      state.currentSession.totalMinutes += workMinutes;

      await savePomodoro(workMinutes);

      if (state.sessionCount % d.SESSIONS_BEFORE_LONG_BREAK === 0) {
        state.phase = 'long-break';
        state.secondsLeft = d.LONG_BREAK;
      } else {
        state.phase = 'short-break';
        state.secondsLeft = d.SHORT_BREAK;
      }

      const breakLen = state.phase === 'long-break'
        ? Math.round(d.LONG_BREAK / 60) + ' dk'
        : Math.round(d.SHORT_BREAK / 60) + ' dk';
      await NotificationsModule.showImmediate('🍅 Pomodoro Bitti!', `Harika! ${breakLen} mola zamanı.`);
    } else {
      state.phase = 'work';
      state.secondsLeft = d.WORK_DURATION;
      await NotificationsModule.showImmediate('⏰ Mola Bitti!', 'Tekrar odaklanma zamanı!');
    }

    if (state.onPhaseEnd) state.onPhaseEnd({ ...state });
    tick();
  }

  async function savePomodoro(minutes = 25) {
    if (!state.currentSession) return;
    await DB.addRecord(DB.STORES.POMODORO, {
      courseId: state.currentSession.courseId,
      goal: state.currentSession.goal,
      date: TimeUtils.todayString(),
      pomodoroCount: 1,
      totalMinutes: minutes,
    });
  }

  async function getStats(days = 30) {
    const all = await DB.getAllRecords(DB.STORES.POMODORO);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().split('T')[0];
    const recent = all.filter(p => p.date >= cutoffStr);
    const courses = await CoursesModule.getAll();

    const byCourse = {};
    for (const p of recent) {
      if (!p.courseId) continue;
      if (!byCourse[p.courseId]) byCourse[p.courseId] = { count: 0, minutes: 0 };
      byCourse[p.courseId].count += p.pomodoroCount || 1;
      byCourse[p.courseId].minutes += p.totalMinutes || 25;
    }

    const courseStats = Object.entries(byCourse).map(([id, stats]) => {
      const course = courses.find(c => c.id === parseInt(id));
      return { courseId: parseInt(id), courseName: course?.name || 'Unknown', color: course?.color || '#6366f1', ...stats };
    }).sort((a, b) => b.minutes - a.minutes);

    const byDay = Array(7).fill(0);
    for (const p of recent) {
      const d = new Date(p.date + 'T00:00:00').getDay();
      byDay[d] += p.pomodoroCount || 1;
    }

    const byWeek = {};
    for (const p of recent) {
      const d = new Date(p.date + 'T00:00:00');
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      const key = weekStart.toISOString().split('T')[0];
      if (!byWeek[key]) byWeek[key] = 0;
      byWeek[key] += p.pomodoroCount || 1;
    }

    return {
      totalPomodoros: recent.reduce((s, p) => s + (p.pomodoroCount || 1), 0),
      totalMinutes: recent.reduce((s, p) => s + (p.totalMinutes || 25), 0),
      byCourse: courseStats,
      byDay,
      byWeek: Object.entries(byWeek).sort((a, b) => a[0].localeCompare(b[0])),
      mostStudiedCourse: courseStats[0] || null,
    };
  }

  function getState() { return { ...state }; }
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  return {
    WORK_DURATION, SHORT_BREAK, LONG_BREAK,
    getSettings, saveSettings, getDurations,
    start, pause, stop, skip, reset,
    getStats, getState, formatTime,
  };
})();

window.PomodoroModule = PomodoroModule;
