export type TaskP = {
  title: string;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  estimatedTime?: number;
};

export type TaskCompleted = TaskP & {
  id: string;
  completed: boolean;
  completedAt?: Date;
  performanceDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  estimatedTime?: number;
  timeDedicated?: number;
};