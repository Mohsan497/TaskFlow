export type TaskStatus = 'pending' | 'done';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: string; // ISO date string, e.g. 2026-07-08
  dueTime?: string; // e.g. "14:30"
  createdAt: string;
  updatedAt: string;
}

export interface SummaryStats {
  totalTasks: number;
  totalProjects: number;
  pending: number;
  done: number;
}
