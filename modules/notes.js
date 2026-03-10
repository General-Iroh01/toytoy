/**
 * Notes Module — kategori destekli
 */
const NotesModule = (() => {
  const TYPES = { TEXT: 'text', PHOTO: 'photo' };

  // ── Notlar ────────────────────────────────────────────────────────────────
  async function getAll() { return DB.getAllRecords(DB.STORES.NOTES); }

  async function getById(id) { return DB.getRecord(DB.STORES.NOTES, id); }

  async function getByCourse(courseId) {
    return DB.getRecordsByIndex(DB.STORES.NOTES, 'courseId', courseId);
  }

  async function getByCategory(categoryId) {
    return DB.getRecordsByIndex(DB.STORES.NOTES, 'categoryId', categoryId);
  }

  async function addText(data) {
    const note = {
      type: TYPES.TEXT,
      courseId: data.courseId || null,
      categoryId: data.categoryId ? parseInt(data.categoryId) : null,
      title: data.title?.trim() || '',
      content: data.content?.trim() || '',
      tags: data.tags || [],
    };
    const id = await DB.addRecord(DB.STORES.NOTES, note);
    return { ...note, id };
  }

  async function addPhoto(data) {
    const note = {
      type: TYPES.PHOTO,
      courseId: data.courseId || null,
      categoryId: data.categoryId ? parseInt(data.categoryId) : null,
      title: data.title?.trim() || '',
      imageData: data.imageData,
      imagePath: data.imagePath || null,
      caption: data.caption?.trim() || '',
      tags: data.tags || [],
    };
    const id = await DB.addRecord(DB.STORES.NOTES, note);
    return { ...note, id };
  }

  async function update(id, data) {
    const existing = await DB.getRecord(DB.STORES.NOTES, id);
    if (!existing) throw new Error('Note not found');
    const updated = { ...existing, ...data, id };
    await DB.updateRecord(DB.STORES.NOTES, updated);
    return updated;
  }

  async function remove(id) { return DB.deleteRecord(DB.STORES.NOTES, id); }

  async function capturePhoto() {
    if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform && Capacitor.isNativePlatform()) {
      const { Camera } = Capacitor.Plugins;
      const image = await Camera.getPhoto({ quality: 80, allowEditing: false, resultType: 'base64', source: 'CAMERA' });
      return 'data:image/jpeg;base64,' + image.base64String;
    }
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file'; input.accept = 'image/*'; input.capture = 'environment';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) { reject(new Error('No file selected')); return; }
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      };
      input.click();
    });
  }

  async function searchNotes(query) {
    const all = await getAll();
    const q = query.toLowerCase();
    return all.filter(n =>
      n.title?.toLowerCase().includes(q) ||
      n.content?.toLowerCase().includes(q) ||
      n.caption?.toLowerCase().includes(q) ||
      n.tags?.some(t => t.toLowerCase().includes(q))
    );
  }

  async function getRecentNotes(limit = 10) {
    const all = await getAll();
    return all.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')).slice(0, limit);
  }

  // ── Kategoriler ───────────────────────────────────────────────────────────
  async function getAllCategories() {
    return DB.getAllRecords(DB.STORES.NOTE_CATEGORIES);
  }

  async function addCategory(data) {
    const cat = {
      name: data.name.trim(),
      color: data.color || '#6366f1',
      icon: data.icon || '📁',
    };
    const id = await DB.addRecord(DB.STORES.NOTE_CATEGORIES, cat);
    return { ...cat, id };
  }

  async function updateCategory(id, data) {
    const existing = await DB.getRecord(DB.STORES.NOTE_CATEGORIES, id);
    if (!existing) throw new Error('Category not found');
    const updated = { ...existing, ...data, id };
    await DB.updateRecord(DB.STORES.NOTE_CATEGORIES, updated);
    return updated;
  }

  async function removeCategory(id) {
    // Kategorideki notların categoryId'sini null yap
    const notes = await getByCategory(id);
    for (const n of notes) {
      await DB.updateRecord(DB.STORES.NOTES, { ...n, categoryId: null });
    }
    return DB.deleteRecord(DB.STORES.NOTE_CATEGORIES, id);
  }

  return {
    TYPES,
    getAll, getById, getByCourse, getByCategory,
    addText, addPhoto, update, remove,
    capturePhoto, searchNotes, getRecentNotes,
    getAllCategories, addCategory, updateCategory, removeCategory,
  };
})();

window.NotesModule = NotesModule;
