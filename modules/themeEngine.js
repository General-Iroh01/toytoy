/**
 * Theme Engine — CSS değişkenlerini localStorage'a kaydeder ve uygular
 */
const ThemeEngine = (() => {

  const STORAGE_KEY = 'academi_theme_v1';

  const COLOR_VARS = [
    { key: '--bg-base',        default: '#0d0f14' },
    { key: '--bg-surface',     default: '#141720' },
    { key: '--bg-elevated',    default: '#1c2030' },
    { key: '--bg-card',        default: '#1e2235' },
    { key: '--bg-input',       default: '#252a3a' },
    { key: '--text-primary',   default: '#eef0f7' },
    { key: '--text-secondary', default: '#8892aa' },
    { key: '--text-muted',     default: '#545e78' },
    { key: '--accent',         default: '#6366f1' },
    { key: '--accent-light',   default: '#818cf8' },
    { key: '--success',        default: '#22c55e' },
    { key: '--warning',        default: '#f59e0b' },
    { key: '--danger',         default: '#ef4444' },
    { key: '--info',           default: '#06b6d4' },
    { key: '--border',         default: '#2a3048' },
    { key: '--border-light',   default: '#323a55' },
  ];

  const PRESETS = [
    {
      name: '🌑 Gece',
      colors: {
        '--bg-base':'#0d0f14','--bg-surface':'#141720','--bg-elevated':'#1c2030',
        '--bg-card':'#1e2235','--bg-input':'#252a3a',
        '--text-primary':'#eef0f7','--text-secondary':'#8892aa','--text-muted':'#545e78',
        '--accent':'#6366f1','--accent-light':'#818cf8',
        '--success':'#22c55e','--warning':'#f59e0b','--danger':'#ef4444','--info':'#06b6d4',
        '--border':'#2a3048','--border-light':'#323a55',
      },
    },
    {
      name: '🌊 Okyanus',
      colors: {
        '--bg-base':'#040e1a','--bg-surface':'#071828','--bg-elevated':'#0d2238',
        '--bg-card':'#0f2840','--bg-input':'#163350',
        '--text-primary':'#e0f2fe','--text-secondary':'#7db8d9','--text-muted':'#3d6580',
        '--accent':'#0ea5e9','--accent-light':'#38bdf8',
        '--success':'#10b981','--warning':'#f59e0b','--danger':'#f43f5e','--info':'#06b6d4',
        '--border':'#1a4060','--border-light':'#1e4d75',
      },
    },
    {
      name: '🌲 Orman',
      colors: {
        '--bg-base':'#070f0a','--bg-surface':'#0d1a10','--bg-elevated':'#122016',
        '--bg-card':'#14261a','--bg-input':'#1a3020',
        '--text-primary':'#d1fae5','--text-secondary':'#6fb584','--text-muted':'#3a5e46',
        '--accent':'#16a34a','--accent-light':'#4ade80',
        '--success':'#22c55e','--warning':'#ca8a04','--danger':'#dc2626','--info':'#0891b2',
        '--border':'#1c3826','--border-light':'#224430',
      },
    },
    {
      name: '🌸 Pembe',
      colors: {
        '--bg-base':'#130a10','--bg-surface':'#1e0f1a','--bg-elevated':'#291524',
        '--bg-card':'#2e182a','--bg-input':'#3a1f34',
        '--text-primary':'#fce7f3','--text-secondary':'#d17aa0','--text-muted':'#7a3d5c',
        '--accent':'#ec4899','--accent-light':'#f472b6',
        '--success':'#22c55e','--warning':'#f59e0b','--danger':'#ef4444','--info':'#e879f9',
        '--border':'#401a30','--border-light':'#4d2038',
      },
    },
    {
      name: '☀️ Açık',
      colors: {
        '--bg-base':'#f8fafc','--bg-surface':'#ffffff','--bg-elevated':'#f1f5f9',
        '--bg-card':'#ffffff','--bg-input':'#f8fafc',
        '--text-primary':'#0f172a','--text-secondary':'#475569','--text-muted':'#94a3b8',
        '--accent':'#6366f1','--accent-light':'#818cf8',
        '--success':'#16a34a','--warning':'#d97706','--danger':'#dc2626','--info':'#0284c7',
        '--border':'#e2e8f0','--border-light':'#cbd5e1',
      },
    },
    {
      name: '🍊 Kor',
      colors: {
        '--bg-base':'#0f0a04','--bg-surface':'#1a1008','--bg-elevated':'#22160a',
        '--bg-card':'#271a0c','--bg-input':'#332212',
        '--text-primary':'#fff7ed','--text-secondary':'#d4935a','--text-muted':'#7a4f2a',
        '--accent':'#f97316','--accent-light':'#fb923c',
        '--success':'#65a30d','--warning':'#eab308','--danger':'#dc2626','--info':'#0ea5e9',
        '--border':'#3d2510','--border-light':'#4d2f14',
      },
    },
  ];

  // Kaydedilen temayı yükle ve uygula
  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const colors = JSON.parse(saved);
        applyToDOM(colors);
        return colors;
      }
    } catch(e) {}
    return getDefaults();
  }

  function getDefaults() {
    return Object.fromEntries(COLOR_VARS.map(v => [v.key, v.default]));
  }

  function applyToDOM(colors) {
    const root = document.documentElement;
    for (const [key, val] of Object.entries(colors)) {
      if (val && /^#[0-9A-Fa-f]{3,8}$/.test(val)) {
        root.style.setProperty(key, val);
      }
    }
    // accent-dim otomatik türet
    const accent = colors['--accent'] || '#6366f1';
    root.style.setProperty('--accent-dim', accent + '20');
  }

  function save(colors) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(colors)); } catch(e) {}
    applyToDOM(colors);
  }

  function reset() {
    try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
    const defaults = getDefaults();
    applyToDOM(defaults);
    return defaults;
  }

  function getCurrentColors() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return getDefaults();
  }

  return { load, save, reset, applyToDOM, getDefaults, getCurrentColors, COLOR_VARS, PRESETS };
})();

window.ThemeEngine = ThemeEngine;
