import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Project, Task, SummaryStats } from '@/types';
import { storage } from '@/services/storage';
import { nowISO } from '@/utils/dateHelpers';
import { projectColors } from '@/theme';

interface DataContextValue {
  tasks: Task[];
  projects: Project[];
  loading: boolean;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  summary: SummaryStats;
  addTask: (input: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskStatus: (id: string) => Promise<void>;
  addProject: (input: Omit<Project, 'id' | 'createdAt'>) => Promise<Project>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  tasksForProject: (projectId: string) => Task[];
  clearAllData: () => Promise<void>;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

const genId = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      await storage.ensureSeeded();
      const [loadedTasks, loadedProjects] = await Promise.all([
        storage.getTasks(),
        storage.getProjects(),
      ]);
      setTasks(loadedTasks);
      setProjects(loadedProjects);
      setSelectedProjectId(loadedProjects[0]?.id ?? null);
      setLoading(false);
    })();
  }, []);

  const persistTasks = useCallback(async (next: Task[]) => {
    setTasks(next);
    await storage.saveTasks(next);
  }, []);

  const persistProjects = useCallback(async (next: Project[]) => {
    setProjects(next);
    await storage.saveProjects(next);
  }, []);

  const addTask: DataContextValue['addTask'] = useCallback(
    async (input) => {
      const newTask: Task = {
        ...input,
        id: genId('task'),
        status: 'pending',
        createdAt: nowISO(),
        updatedAt: nowISO(),
      };
      await persistTasks([newTask, ...tasks]);
    },
    [tasks, persistTasks]
  );

  const updateTask: DataContextValue['updateTask'] = useCallback(
    async (id, updates) => {
      const next = tasks.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: nowISO() } : t));
      await persistTasks(next);
    },
    [tasks, persistTasks]
  );

  const deleteTask: DataContextValue['deleteTask'] = useCallback(
    async (id) => {
      await persistTasks(tasks.filter((t) => t.id !== id));
    },
    [tasks, persistTasks]
  );

  const toggleTaskStatus: DataContextValue['toggleTaskStatus'] = useCallback(
    async (id) => {
      const next = tasks.map((t) =>
        t.id === id
          ? { ...t, status: (t.status === 'done' ? 'pending' : 'done') as Task['status'], updatedAt: nowISO() }
          : t
      );
      await persistTasks(next);
    },
    [tasks, persistTasks]
  );

  const addProject: DataContextValue['addProject'] = useCallback(
    async (input) => {
      const newProject: Project = {
        ...input,
        id: genId('proj'),
        createdAt: nowISO(),
      };
      await persistProjects([...projects, newProject]);
      return newProject;
    },
    [projects, persistProjects]
  );

  const updateProject: DataContextValue['updateProject'] = useCallback(
    async (id, updates) => {
      const next = projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
      await persistProjects(next);
    },
    [projects, persistProjects]
  );

  const deleteProject: DataContextValue['deleteProject'] = useCallback(
    async (id) => {
      await persistProjects(projects.filter((p) => p.id !== id));
      await persistTasks(tasks.filter((t) => t.projectId !== id));
      if (selectedProjectId === id) {
        setSelectedProjectId(projects.find((p) => p.id !== id)?.id ?? null);
      }
    },
    [projects, tasks, persistProjects, persistTasks, selectedProjectId]
  );

  const tasksForProject = useCallback(
    (projectId: string) => tasks.filter((t) => t.projectId === projectId),
    [tasks]
  );

  // const clearAllData = useCallback(async () => {
  //   await storage.clearAll();
  //   await storage.ensureSeeded();
  //   const [loadedTasks, loadedProjects] = await Promise.all([storage.getTasks(), storage.getProjects()]);
  //   setTasks(loadedTasks);
  //   setProjects(loadedProjects);
  //   setSelectedProjectId(loadedProjects[0]?.id ?? null);
  // }, []);
  const clearAllData = useCallback(async () => {
  await storage.clearAll();

  setTasks([]);
  setProjects([]);
  setSelectedProjectId(null);
}, []);

  const summary: SummaryStats = useMemo(
    () => ({
      totalTasks: tasks.length,
      totalProjects: projects.length,
      pending: tasks.filter((t) => t.status === 'pending').length,
      done: tasks.filter((t) => t.status === 'done').length,
    }),
    [tasks, projects]
  );

  const value: DataContextValue = {
    tasks,
    projects,
    loading,
    selectedProjectId,
    setSelectedProjectId,
    summary,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    addProject,
    updateProject,
    deleteProject,
    tasksForProject,
    clearAllData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextValue => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

export const nextProjectColor = (existing: Project[]): string =>
  projectColors[existing.length % projectColors.length];
