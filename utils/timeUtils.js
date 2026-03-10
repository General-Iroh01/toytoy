/**
 * Time Utilities
 * Student Academic Manager
 */

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAYS_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2,'0')} ${ampm}`;
}

function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function formatDateShort(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
}

function getDayName(dayIndex) {
  return DAYS[dayIndex] || '';
}

function getDayShort(dayIndex) {
  return DAYS_SHORT[dayIndex] || '';
}

function getDayIndex(dayName) {
  return DAYS.findIndex(d => d.toLowerCase() === dayName.toLowerCase());
}

function getCurrentDayIndex() {
  return new Date().getDay();
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const target = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0,0,0,0);
  const diff = target - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function isToday(dateStr) {
  const today = new Date().toISOString().split('T')[0];
  return dateStr === today;
}

function isFuture(dateStr) {
  const today = new Date().toISOString().split('T')[0];
  return dateStr > today;
}

function isPast(dateStr) {
  const today = new Date().toISOString().split('T')[0];
  return dateStr < today;
}

function todayString() {
  return new Date().toISOString().split('T')[0];
}

function nowTimeString() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}

function getWeekDates(offsetWeeks = 0) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - dayOfWeek + (offsetWeeks * 7));
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

function getMinutesUntilNextClass(scheduleItems) {
  const now = new Date();
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  let soonest = null;
  let soonestMinutes = Infinity;

  for (const item of scheduleItems) {
    const itemDay = parseInt(item.day);
    const startMinutes = timeToMinutes(item.startTime);
    
    let minutesUntil;
    if (itemDay === currentDay) {
      minutesUntil = startMinutes - currentMinutes;
    } else {
      let daysUntilClass = (itemDay - currentDay + 7) % 7;
      if (daysUntilClass === 0) daysUntilClass = 7;
      minutesUntil = daysUntilClass * 24 * 60 + startMinutes - currentMinutes;
    }

    if (minutesUntil > 0 && minutesUntil < soonestMinutes) {
      soonestMinutes = minutesUntil;
      soonest = { ...item, minutesUntil };
    }
  }
  return soonest;
}

function formatDuration(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatCountdown(days) {
  if (days < 0) return 'Past';
  if (days === 0) return 'Today!';
  if (days === 1) return 'Tomorrow';
  if (days <= 7) return `${days} days`;
  if (days <= 30) return `${Math.ceil(days/7)} weeks`;
  return `${Math.ceil(days/30)} months`;
}

window.TimeUtils = {
  DAYS,
  DAYS_SHORT,
  MONTHS,
  formatTime,
  timeToMinutes,
  minutesToTime,
  formatDate,
  formatDateShort,
  getDayName,
  getDayShort,
  getDayIndex,
  getCurrentDayIndex,
  daysUntil,
  isToday,
  isFuture,
  isPast,
  todayString,
  nowTimeString,
  getWeekDates,
  getMinutesUntilNextClass,
  formatDuration,
  formatCountdown,
};
