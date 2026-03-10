/**
 * Schedule Module
 * Student Academic Manager
 */

const ScheduleModule = (() => {
  async function getAll() {
    return DB.getAllRecords(DB.STORES.SCHEDULE);
  }

  async function getByCourse(courseId) {
    return DB.getRecordsByIndex(DB.STORES.SCHEDULE, 'courseId', courseId);
  }

  async function getByDay(day) {
    return DB.getRecordsByIndex(DB.STORES.SCHEDULE, 'day', String(day));
  }

  async function getTodayClasses() {
    const today = TimeUtils.getCurrentDayIndex();
    const items = await getByDay(String(today));
    items.sort((a, b) => TimeUtils.timeToMinutes(a.startTime) - TimeUtils.timeToMinutes(b.startTime));
    return items;
  }

  async function getWeeklySchedule() {
    const all = await getAll();
    const schedule = {};
    for (let i = 0; i < 7; i++) {
      schedule[i] = all
        .filter(item => String(item.day) === String(i))
        .sort((a, b) => TimeUtils.timeToMinutes(a.startTime) - TimeUtils.timeToMinutes(b.startTime));
    }
    return schedule;
  }

  async function add(scheduleData) {
    const item = {
      courseId: scheduleData.courseId,
      day: String(scheduleData.day),
      startTime: scheduleData.startTime,
      endTime: scheduleData.endTime,
    };

    // Conflict detection
    const allExisting = await getAll();
    const conflicts = ConflictDetector.detectConflicts(item, allExisting);

    return { item, conflicts };
  }

  async function save(scheduleData, forceAdd = false) {
    const { item, conflicts } = await add(scheduleData);

    if (conflicts.length > 0 && !forceAdd) {
      const courses = await CoursesModule.getAll();
      const message = ConflictDetector.buildConflictMessage(conflicts, courses);
      throw { type: 'CONFLICT', message, conflicts };
    }

    const id = await DB.addRecord(DB.STORES.SCHEDULE, item);
    return { ...item, id };
  }

  async function update(id, data) {
    const existing = await DB.getRecord(DB.STORES.SCHEDULE, id);
    if (!existing) throw new Error('Schedule item not found');

    const updated = { ...existing, ...data, id };
    await DB.updateRecord(DB.STORES.SCHEDULE, updated);
    return updated;
  }

  async function remove(id) {
    return DB.deleteRecord(DB.STORES.SCHEDULE, id);
  }

  async function getNextClass() {
    const all = await getAll();
    if (!all.length) return null;

    const courses = await CoursesModule.getAll();
    const enriched = all.map(item => {
      const course = courses.find(c => c.id === item.courseId);
      return { ...item, courseName: course?.name || 'Unknown', classroom: course?.classroom || '', color: course?.color || '#6366f1' };
    });

    return TimeUtils.getMinutesUntilNextClass(enriched);
  }

  async function buildNotificationSchedule() {
    const all = await getAll();
    const courses = await CoursesModule.getAll();
    const notifications = [];

    for (const item of all) {
      const course = courses.find(c => c.id === item.courseId);
      if (!course) continue;

      notifications.push({
        scheduleId: item.id,
        courseId: item.courseId,
        courseName: course.name,
        classroom: course.classroom,
        day: item.day,
        startTime: item.startTime,
        notifyMinutesBefore: 15,
      });
    }
    return notifications;
  }

  return {
    getAll,
    getByCourse,
    getByDay,
    getTodayClasses,
    getWeeklySchedule,
    add,
    save,
    update,
    remove,
    getNextClass,
    buildNotificationSchedule,
  };
})();

window.ScheduleModule = ScheduleModule;
