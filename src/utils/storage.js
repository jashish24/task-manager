const STORAGE_KEYS = {
  TASKS: 'tasks',
  EMAIL: 'userEmail',
  LAST_RESET: 'lastReset'
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
  }
};