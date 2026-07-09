export const isNonEmpty = (value: string): boolean => value.trim().length > 0;

export const validateTaskTitle = (title: string): string | null => {
  if (!isNonEmpty(title)) return 'Task title is required';
  if (title.trim().length > 80) return 'Title must be under 80 characters';
  return null;
};

export const validateProjectName = (name: string): string | null => {
  if (!isNonEmpty(name)) return 'Project name is required';
  if (name.trim().length > 40) return 'Name must be under 40 characters';
  return null;
};
