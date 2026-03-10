/**
 * Database Module - IndexedDB Implementation
 * Student Academic Manager - Offline First
 */

const DB_NAME = 'AcademicManagerDB';
const DB_VERSION = 3;

const STORES = {
  COURSES: 'courses',
  SCHEDULE: 'schedule',
  ATTENDANCE: 'attendance',
  EXAMS: 'exams',
  NOTES: 'notes',
  NOTE_CATEGORIES: 'note_categories',
  POMODORO: 'pomodoro',
  SETTINGS: 'settings',
  REMINDERS: 'reminders',
  RECENT_VISITS: 'recent_visits',
  IN_APP_NOTIFS: 'in_app_notifs',
};

let db = null;

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (db) { resolve(db); return; }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      const names = database.objectStoreNames;

      // Helper: store yoksa oluştur, varsa atla
      function ensure(name, opts, indexes) {
        if (names.contains(name)) return;
        const s = database.createObjectStore(name, opts);
        if (indexes) indexes.forEach(([k, unique]) => s.createIndex(k, k, { unique: !!unique }));
      }

      ensure(STORES.COURSES,         { keyPath: 'id', autoIncrement: true }, [['name',false]]);
      ensure(STORES.SCHEDULE,        { keyPath: 'id', autoIncrement: true }, [['courseId',false],['day',false]]);
      ensure(STORES.ATTENDANCE,      { keyPath: 'id', autoIncrement: true }, [['courseId',false],['date',false]]);
      ensure(STORES.EXAMS,           { keyPath: 'id', autoIncrement: true }, [['courseId',false],['date',false]]);
      ensure(STORES.NOTES,           { keyPath: 'id', autoIncrement: true }, [['courseId',false],['createdAt',false],['type',false],['categoryId',false]]);
      ensure(STORES.NOTE_CATEGORIES, { keyPath: 'id', autoIncrement: true }, [['name',false]]);
      ensure(STORES.POMODORO,        { keyPath: 'id', autoIncrement: true }, [['courseId',false],['date',false]]);
      ensure(STORES.SETTINGS,        { keyPath: 'key' });
      ensure(STORES.REMINDERS,       { keyPath: 'id', autoIncrement: true }, [['type',false],['nextTrigger',false]]);
      ensure(STORES.RECENT_VISITS,   { keyPath: 'key' });
      ensure(STORES.IN_APP_NOTIFS,   { keyPath: 'id', autoIncrement: true }, [['createdAt',false],['read',false]]);
    };

    request.onsuccess = (event) => { db = event.target.result; resolve(db); };
    request.onerror  = (event) => { reject(new Error('Database error: ' + event.target.error)); };
  });
}

async function addRecord(storeName, data) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.add({ ...data, createdAt: data.createdAt || new Date().toISOString() });
    request.onsuccess = () => resolve(request.result);
    request.onerror  = () => reject(request.error);
  });
}

async function updateRecord(storeName, data) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.put({ ...data, updatedAt: new Date().toISOString() });
    request.onsuccess = () => resolve(request.result);
    request.onerror  = () => reject(request.error);
  });
}

async function deleteRecord(storeName, id) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.delete(id);
    request.onsuccess = () => resolve(true);
    request.onerror  = () => reject(request.error);
  });
}

async function getRecord(storeName, id) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror  = () => reject(request.error);
  });
}

async function getAllRecords(storeName) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror  = () => reject(request.error);
  });
}

async function getRecordsByIndex(storeName, indexName, value) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const index = store.index(indexName);
    const request = index.getAll(value);
    request.onsuccess = () => resolve(request.result || []);
    request.onerror  = () => reject(request.error);
  });
}

async function clearStore(storeName) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.clear();
    request.onsuccess = () => resolve(true);
    request.onerror  = () => reject(request.error);
  });
}

async function getSetting(key, defaultValue = null) {
  const record = await getRecord(STORES.SETTINGS, key);
  return record ? record.value : defaultValue;
}

async function setSetting(key, value) {
  return updateRecord(STORES.SETTINGS, { key, value });
}

async function exportAllData() {
  const data = {};
  for (const storeName of Object.values(STORES)) {
    data[storeName] = await getAllRecords(storeName);
  }
  return data;
}

async function importAllData(data) {
  for (const storeName of Object.values(STORES)) {
    if (data[storeName]) {
      await clearStore(storeName);
      const database = await openDatabase();
      const tx = database.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      for (const record of data[storeName]) { store.put(record); }
      await new Promise((resolve, reject) => { tx.oncomplete = resolve; tx.onerror = reject; });
    }
  }
}

window.DB = {
  STORES, openDatabase,
  addRecord, updateRecord, deleteRecord,
  getRecord, getAllRecords, getRecordsByIndex,
  clearStore, getSetting, setSetting,
  exportAllData, importAllData,
};
