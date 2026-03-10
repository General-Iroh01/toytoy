/**
 * Backup & Restore Module
 * Student Academic Manager
 */

const BackupModule = (() => {
  const BACKUP_VERSION = '1.0';

  async function exportBackup() {
    const data = await DB.exportAllData();
    const backup = {
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      appName: 'StudentAcademicManager',
      data,
    };

    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: 'application/json' });

    // Capacitor Filesystem
    if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform && Capacitor.isNativePlatform()) {
      const { Filesystem } = Capacitor.Plugins;
      const fileName = `academic-backup-${TimeUtils.todayString()}.json`;
      await Filesystem.writeFile({
        path: fileName,
        data: json,
        directory: 'DOCUMENTS',
        encoding: 'utf8',
      });
      return { success: true, fileName, message: `Backup saved to Documents/${fileName}` };
    }

    // Web fallback: download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `academic-backup-${TimeUtils.todayString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    return { success: true, message: 'Backup downloaded' };
  }

  async function importBackup(fileOrData) {
    let backup;

    if (typeof fileOrData === 'string') {
      backup = JSON.parse(fileOrData);
    } else if (fileOrData instanceof File) {
      const text = await fileOrData.text();
      backup = JSON.parse(text);
    } else {
      backup = fileOrData;
    }

    if (!backup.version || !backup.data || backup.appName !== 'StudentAcademicManager') {
      throw new Error('Invalid backup file format');
    }

    await DB.importAllData(backup.data);
    return { success: true, message: 'Data restored successfully' };
  }

  async function importFromFile() {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json,application/json';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) { reject(new Error('No file selected')); return; }
        try {
          const result = await importBackup(file);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      };
      input.click();
    });
  }

  async function getBackupInfo() {
    const data = await DB.exportAllData();
    return {
      courses: data.courses?.length || 0,
      scheduleItems: data.schedule?.length || 0,
      attendanceRecords: data.attendance?.length || 0,
      exams: data.exams?.length || 0,
      notes: data.notes?.length || 0,
      pomodoroSessions: data.pomodoro?.length || 0,
    };
  }

  async function clearAllData() {
    const stores = Object.values(DB.STORES);
    for (const store of stores) {
      await DB.clearStore(store);
    }
    return true;
  }

  return {
    exportBackup,
    importBackup,
    importFromFile,
    getBackupInfo,
    clearAllData,
  };
})();

window.BackupModule = BackupModule;
