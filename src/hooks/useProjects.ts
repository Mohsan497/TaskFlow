import { useData } from '@/context/DataContext';

/** Convenience hook exposing project-related state and actions only. */
export const useProjects = () => {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    selectedProjectId,
    setSelectedProjectId,
    loading,
  } = useData();
  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    selectedProjectId,
    setSelectedProjectId,
    loading,
  };
};
