const STORAGE_KEYS = {
  TASKS: 'tasks',
  EMAIL: 'userEmail',
  LAST_RESET: 'lastReset',
  SUBJECTS: 'subjects',
  CHECKLISTS: 'checklists'
};

export const storage = {
  getTasks: () => {
    try {
      const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      return tasks ? JSON.parse(tasks) : [];
    } catch {
      return [];
    }
  },

  saveTasks: (tasks) => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },

  getEmail: () => {
    return localStorage.getItem(STORAGE_KEYS.EMAIL) || '';
  },

  saveEmail: (email) => {
    localStorage.setItem(STORAGE_KEYS.EMAIL, email);
  },

  getLastReset: () => {
    return localStorage.getItem(STORAGE_KEYS.LAST_RESET);
  },

  saveLastReset: (date) => {
    localStorage.setItem(STORAGE_KEYS.LAST_RESET, date);
  },

  getSubjects: () => {
    try {
      const subjects = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
      return subjects ? JSON.parse(subjects) : [];
    } catch {
      return [];
    }
  },

  saveSubjects: (subjects) => {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  },

  getChecklists: () => {
    try {
      const checklists = localStorage.getItem(STORAGE_KEYS.CHECKLISTS);
      return checklists ? JSON.parse(checklists) : [];
    } catch {
      return [];
    }
  },

  saveChecklists: (checklists) => {
    localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(checklists));
  }
};