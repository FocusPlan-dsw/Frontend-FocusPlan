export type TaskP = {
  title: string;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  estimatedTime?: string;
};

export type TaskCompleted = TaskP & {
  id: string;
  completed: boolean;
  timeDedicated?: number;
};