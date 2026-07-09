import AsyncStorage from '@react-native-async-storage/async-storage';
import { Project, Task, ThemeMode } from '@/types';
import { STORAGE_KEYS,
  //  seedProjects, seedTasks
   } from '@/constants';

async function getItem<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (e) {
    console.warn(`storage.getItem failed for ${key}`, e);
    return null;
  }
}

async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`storage.setItem failed for ${key}`, e);
  }
}

export const storage = {
  // async ensureSeeded(): Promise<void> {
  //   const seeded = await getItem<boolean>(STORAGE_KEYS.SEEDED);
  //   if (seeded) return;
  //   await setItem(STORAGE_KEYS.PROJECTS, seedProjects);
  //   await setItem(STORAGE_KEYS.TASKS, seedTasks);
  //   await setItem(STORAGE_KEYS.SEEDED, true);
  // },
  async ensureSeeded(): Promise<void> {
  // No demo data.
  // App starts empty on first launch.
  return;
},

  async getTasks(): Promise<Task[]> {
    return (await getItem<Task[]>(STORAGE_KEYS.TASKS)) ?? [];
  },

  async saveTasks(tasks: Task[]): Promise<void> {
    await setItem(STORAGE_KEYS.TASKS, tasks);
  },

  async getProjects(): Promise<Project[]> {
    return (await getItem<Project[]>(STORAGE_KEYS.PROJECTS)) ?? [];
  },

  async saveProjects(projects: Project[]): Promise<void> {
    await setItem(STORAGE_KEYS.PROJECTS, projects);
  },

  async getThemeMode(): Promise<ThemeMode | null> {
    return getItem<ThemeMode>(STORAGE_KEYS.THEME_MODE);
  },

  async saveThemeMode(mode: ThemeMode): Promise<void> {
    await setItem(STORAGE_KEYS.THEME_MODE, mode);
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TASKS,
      STORAGE_KEYS.PROJECTS,
      // STORAGE_KEYS.SEEDED,
    ]);
  },
};
