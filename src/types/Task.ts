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
  estimatedTime?: number;
  actualStartDate?: Date;
  actualEndDate?: Date; 
  timeDedicated?: number;
};