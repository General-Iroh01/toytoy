/**
 * Attendance Module
 * Student Academic Manager
 */

const AttendanceModule = (() => {
  const STATUS = { PRESENT: 'present', ABSENT: 'absent', LATE: 'late', EXCUSED: 'excused' };

  async function getAll() {
    return DB.getAllRecords(DB.STORES.ATTENDANCE);
  }

  async function getByCourse(courseId) {
    return DB.getRecordsByIndex(DB.STORES.ATTENDANCE, 'courseId', courseId);
  }

  async function getByDate(date) {
    return DB.getRecordsByIndex(DB.STORES.ATTENDANCE, 'date', date);
  }

  async function record(data) {
    const record = {
      courseId: data.courseId,
      date: data.date || TimeUtils.todayString(),
      status: data.status || STATUS.PRESENT,
      hours: parseFloat(data.hours) || 0,
      note: data.note?.trim() || '',
    };
    const id = await DB.addRecord(DB.STORES.ATTENDANCE, record);
    return { ...record, id };
  }

  async function update(id, data) {
    const existing = await DB.getRecord(DB.STORES.ATTENDANCE, id);
    if (!existing) throw new Error('Attendance record not found');
    const updated = { ...existing, ...data, id };
    await DB.updateRecord(DB.STORES.ATTENDANCE, updated);
    return updated;
  }

  async function remove(id) {
    return DB.deleteRecord(DB.STORES.ATTENDANCE, id);
  }

  async function getCourseAttendanceSummary(courseId) {
    const course = await CoursesModule.getById(courseId);
    if (!course) return null;

    const records = await getByCourse(courseId);
    const present = records.filter(r => r.status === STATUS.PRESENT || r.status === STATUS.LATE);
    const absent = records.filter(r => r.status === STATUS.ABSENT);
    const excused = records.filter(r => r.status === STATUS.EXCUSED);

    const absenceHours = absent.reduce((sum, r) => sum + (r.hours || 0), 0);
    const allowedHours = course.totalAbsenceHours || 0;
    const remainingHours = Math.max(0, allowedHours - absenceHours);
    const dangerLevel = allowedHours > 0
      ? absenceHours / allowedHours
      : 0;

    return {
      courseId,
      courseName: course.name,
      color: course.color,
      totalRecords: records.length,
      presentCount: present.length,
      absentCount: absent.length,
      excusedCount: excused.length,
      absenceHours,
      allowedHours,
      remainingHours,
      dangerLevel, // 0-1
      isAtRisk: dangerLevel >= 0.75,
      isOverLimit: dangerLevel >= 1.0,
      records: records.sort((a, b) => b.date.localeCompare(a.date)),
    };
  }

  async function getAllCourseSummaries() {
    const courses = await CoursesModule.getAll();
    const summaries = [];
    for (const course of courses) {
      summaries.push(await getCourseAttendanceSummary(course.id));
    }
    return summaries.filter(Boolean);
  }

  async function markTodayClasses() {
    const todayClasses = await ScheduleModule.getTodayClasses();
    const today = TimeUtils.todayString();
    const todayRecords = await getByDate(today);

    const pending = [];
    for (const cls of todayClasses) {
      const alreadyRecorded = todayRecords.find(r => r.courseId === cls.courseId);
      if (!alreadyRecorded) {
        const course = await CoursesModule.getById(cls.courseId);
        pending.push({
          scheduleId: cls.id,
          courseId: cls.courseId,
          courseName: course?.name || 'Unknown',
          startTime: cls.startTime,
          endTime: cls.endTime,
        });
      }
    }
    return pending;
  }

  return {
    STATUS,
    getAll,
    getByCourse,
    getByDate,
    record,
    update,
    remove,
    getCourseAttendanceSummary,
    getAllCourseSummaries,
    markTodayClasses,
  };
})();

window.AttendanceModule = AttendanceModule;
