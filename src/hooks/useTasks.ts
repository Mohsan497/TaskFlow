import { useData } from '@/context/DataContext';

/** Convenience hook exposing task-related state and actions only. */
export const useTasks = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskStatus, tasksForProject, loading } = useData();
  return { tasks, addTask, updateTask, deleteTask, toggleTaskStatus, tasksForProject, loading };
};
