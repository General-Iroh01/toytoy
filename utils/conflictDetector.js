/**
 * Schedule Conflict Detector
 * Student Academic Manager
 */

function detectConflicts(newClass, existingClasses) {
  const conflicts = [];

  for (const existing of existingClasses) {
    if (String(newClass.day) !== String(existing.day)) continue;
    if (newClass.id && newClass.id === existing.id) continue;

    const newStart = TimeUtils.timeToMinutes(newClass.startTime);
    const newEnd = TimeUtils.timeToMinutes(newClass.endTime);
    const exStart = TimeUtils.timeToMinutes(existing.startTime);
    const exEnd = TimeUtils.timeToMinutes(existing.endTime);

    if (newStart < exEnd && newEnd > exStart) {
      conflicts.push({
        conflictingClass: existing,
        overlapStart: Math.max(newStart, exStart),
        overlapEnd: Math.min(newEnd, exEnd),
        overlapMinutes: Math.min(newEnd, exEnd) - Math.max(newStart, exStart),
      });
    }
  }

  return conflicts;
}

function buildConflictMessage(conflicts, courses) {
  if (!conflicts.length) return null;
  
  const lines = conflicts.map(c => {
    const course = courses.find(cr => cr.id === c.conflictingClass.courseId);
    const courseName = course ? course.name : 'Unknown Course';
    const day = TimeUtils.getDayName(parseInt(c.conflictingClass.day));
    const start = TimeUtils.formatTime(c.conflictingClass.startTime);
    const end = TimeUtils.formatTime(c.conflictingClass.endTime);
    return `${courseName} (${day} ${start}–${end})`;
  });

  return `Schedule conflict detected with:\n${lines.join('\n')}`;
}

window.ConflictDetector = {
  detectConflicts,
  buildConflictMessage,
};
