const CACHE = 'akademi-v6';
const FILES = [
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './storage/database.js',
  './utils/timeUtils.js',
  './utils/conflictDetector.js',
  './modules/courses.js',
  './modules/schedule.js',
  './modules/attendance.js',
  './modules/exams.js',
  './modules/notifications.js',
  './modules/pomodoro.js',
  './modules/notes.js',
  './modules/reminders.js',
  './modules/recentVisits.js',
  './modules/backup.js',
  './modules/themeEngine.js',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
