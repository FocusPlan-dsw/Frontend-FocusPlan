export type TaskP = {
  title: string;
  description?: string | null;
  startDate?: Date | null;
  dueDate?: Date | null;
  estimatedTime?: string | null;
};

export type TaskCompleted = TaskP & {
  id: string;
  completed: boolean;
};