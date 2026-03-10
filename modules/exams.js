/**
 * Exams Module
 * Student Academic Manager
 */

const ExamsModule = (() => {
  const EXAM_TYPES = { MIDTERM: 'midterm', FINAL: 'final', QUIZ: 'quiz', OTHER: 'other' };
  const COUNTDOWN_START_DAYS = 14;

  async function getAll() {
    return DB.getAllRecords(DB.STORES.EXAMS);
  }

  async function getByCourse(courseId) {
    return DB.getRecordsByIndex(DB.STORES.EXAMS, 'courseId', courseId);
  }

  async function add(data) {
    const exam = {
      courseId: data.courseId,
      type: data.type || EXAM_TYPES.OTHER,
      title: data.title?.trim() || '',
      date: data.date,
      time: data.time || '',
      location: data.location?.trim() || '',
      note: data.note?.trim() || '',
      grade: data.grade !== undefined ? data.grade : null,
    };
    const id = await DB.addRecord(DB.STORES.EXAMS, exam);
    return { ...exam, id };
  }

  async function update(id, data) {
    const existing = await DB.getRecord(DB.STORES.EXAMS, id);
    if (!existing) throw new Error('Exam not found');
    const updated = { ...existing, ...data, id };
    await DB.updateRecord(DB.STORES.EXAMS, updated);
    return updated;
  }

  async function remove(id) {
    return DB.deleteRecord(DB.STORES.EXAMS, id);
  }

  async function getUpcoming(limitDays = 60) {
    const all = await getAll();
    const courses = await CoursesModule.getAll();
    const today = TimeUtils.todayString();

    return all
      .filter(exam => exam.date >= today)
      .map(exam => {
        const course = courses.find(c => c.id === exam.courseId);
        const days = TimeUtils.daysUntil(exam.date);
        return {
          ...exam,
          courseName: course?.name || 'Unknown',
          color: course?.color || '#6366f1',
          daysUntil: days,
          countdown: TimeUtils.formatCountdown(days),
          showCountdown: days <= COUNTDOWN_START_DAYS,
        };
      })
      .filter(e => e.daysUntil <= limitDays)
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  async function getExamsNeedingCountdown() {
    const upcoming = await getUpcoming(COUNTDOWN_START_DAYS);
    return upcoming.filter(e => e.showCountdown);
  }

  async function getPastWithGrades() {
    const all = await getAll();
    const courses = await CoursesModule.getAll();
    const today = TimeUtils.todayString();

    return all
      .filter(exam => exam.date < today)
      .map(exam => {
        const course = courses.find(c => c.id === exam.courseId);
        return {
          ...exam,
          courseName: course?.name || 'Unknown',
          color: course?.color || '#6366f1',
        };
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  async function getGPASummary() {
    const past = await getPastWithGrades();
    const graded = past.filter(e => e.grade !== null && e.grade !== undefined);
    if (!graded.length) return null;

    const avg = graded.reduce((sum, e) => sum + parseFloat(e.grade), 0) / graded.length;
    return {
      totalExams: graded.length,
      averageGrade: Math.round(avg * 100) / 100,
      highest: Math.max(...graded.map(e => parseFloat(e.grade))),
      lowest: Math.min(...graded.map(e => parseFloat(e.grade))),
    };
  }

  return {
    EXAM_TYPES,
    COUNTDOWN_START_DAYS,
    getAll,
    getByCourse,
    add,
    update,
    remove,
    getUpcoming,
    getExamsNeedingCountdown,
    getPastWithGrades,
    getGPASummary,
  };
})();

window.ExamsModule = ExamsModule;
