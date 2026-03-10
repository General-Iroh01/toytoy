/**
 * RecentVisits — Son ziyaret edilen sayfaları kaydeder
 */
const RecentVisitsModule = (() => {
  const MAX = 8;

  // Ziyareti kaydet
  async function record(page, params = {}, label, icon) {
    const key = page + (params.id ? ':' + params.id : '');
    const entry = {
      key, page, params, label, icon,
      visitedAt: new Date().toISOString(),
    };
    await DB.updateRecord(DB.STORES.RECENT_VISITS, entry);
    return entry;
  }

  // Son ziyaretleri getir (max 8, yeniden eskiye)
  async function getRecent() {
    const all = await DB.getAllRecords(DB.STORES.RECENT_VISITS);
    return all
      .sort((a, b) => b.visitedAt.localeCompare(a.visitedAt))
      .slice(0, MAX);
  }

  async function clear() {
    const all = await DB.getAllRecords(DB.STORES.RECENT_VISITS);
    for (const r of all) await DB.deleteRecord(DB.STORES.RECENT_VISITS, r.key);
  }

  return { record, getRecent, clear };
})();

window.RecentVisitsModule = RecentVisitsModule;
