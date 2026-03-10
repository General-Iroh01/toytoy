/**
 * Courses Module
 * Student Academic Manager
 */

const CoursesModule = (() => {
  async function getAll() {
    return DB.getAllRecords(DB.STORES.COURSES);
  }

  async function getById(id) {
    return DB.getRecord(DB.STORES.COURSES, id);
  }

  async function add(courseData) {
    const course = {
      name: courseData.name.trim(),
      classroom: courseData.classroom?.trim() || '',
      credit: parseFloat(courseData.credit) || 0,
      weeklyHours: parseFloat(courseData.weeklyHours) || 0,
      maxAbsenceWeeks: parseInt(courseData.maxAbsenceWeeks) || 0,
      semesterStart: courseData.semesterStart || '',
      semesterEnd: courseData.semesterEnd || '',
      color: courseData.color || generateColor(courseData.name),
      instructor: courseData.instructor?.trim() || '',
      description: courseData.description?.trim() || '',
    };

    // Calculate total allowed absence hours
    course.totalAbsenceHours = course.weeklyHours * course.maxAbsenceWeeks;

    const id = await DB.addRecord(DB.STORES.COURSES, course);
    return { ...course, id };
  }

  async function update(id, data) {
    const course = await getById(id);
    if (!course) throw new Error('Course not found');

    const updated = { ...course, ...data };
    // Recalculate absence hours if relevant fields changed
    if (data.weeklyHours !== undefined || data.maxAbsenceWeeks !== undefined) {
      updated.totalAbsenceHours = updated.weeklyHours * updated.maxAbsenceWeeks;
    }

    await DB.updateRecord(DB.STORES.COURSES, updated);
    return updated;
  }

  async function remove(id) {
    // Cascade delete related data
    const schedItems = await DB.getRecordsByIndex(DB.STORES.SCHEDULE, 'courseId', id);
    for (const item of schedItems) await DB.deleteRecord(DB.STORES.SCHEDULE, item.id);

    const attRecords = await DB.getRecordsByIndex(DB.STORES.ATTENDANCE, 'courseId', id);
    for (const rec of attRecords) await DB.deleteRecord(DB.STORES.ATTENDANCE, rec.id);

    const exams = await DB.getRecordsByIndex(DB.STORES.EXAMS, 'courseId', id);
    for (const e of exams) await DB.deleteRecord(DB.STORES.EXAMS, e.id);

    const notes = await DB.getRecordsByIndex(DB.STORES.NOTES, 'courseId', id);
    for (const n of notes) await DB.deleteRecord(DB.STORES.NOTES, n.id);

    const pomodoros = await DB.getRecordsByIndex(DB.STORES.POMODORO, 'courseId', id);
    for (const p of pomodoros) await DB.deleteRecord(DB.STORES.POMODORO, p.id);

    return DB.deleteRecord(DB.STORES.COURSES, id);
  }

  async function getStats(courseId) {
    const course = await getById(courseId);
    if (!course) return null;

    const attendance = await DB.getRecordsByIndex(DB.STORES.ATTENDANCE, 'courseId', courseId);
    const pomodoros = await DB.getRecordsByIndex(DB.STORES.POMODORO, 'courseId', courseId);

    const absences = attendance.filter(a => a.status === 'absent');
    const lates    = attendance.filter(a => a.status === 'late');
    const presents = attendance.filter(a => a.status === 'present');
    const absenceHours = absences.reduce((sum, a) => sum + (a.hours || 1), 0)
                       + lates.reduce((sum, a) => sum + (a.hours || 0.5), 0);
    const totalStudyMinutes = pomodoros.reduce((sum, p) => sum + (p.totalMinutes || 0), 0);

    const absencePct = course.totalAbsenceHours > 0
      ? Math.round((absenceHours / course.totalAbsenceHours) * 100)
      : 0;

    return {
      course,
      totalSessions: attendance.length,
      absenceSessions: absences.length,
      presentSessions: presents.length,
      lateSessions: lates.length,
      absenceHours,
      remainingAbsenceHours: Math.max(0, (course.totalAbsenceHours || 0) - absenceHours),
      absencePercentage: absencePct,
      isAtRisk: absencePct >= 75,
      totalStudyMinutes,
      pomodoroCount: pomodoros.length,
    };
  }

  function generateColor(name) {
    const colors = [
      '#6366f1','#8b5cf6','#ec4899','#ef4444','#f97316',
      '#eab308','#22c55e','#14b8a6','#06b6d4','#3b82f6',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  return { getAll, getById, add, update, remove, getStats, generateColor };
})();

window.CoursesModule = CoursesModule;
