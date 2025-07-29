// Database types based on Prisma schema
export interface DbTask {
  id: string;
  taskListId: string;
  title: string;
  notes: string | null;
  dueDate: Date | null;
  isComplete: boolean;
  priority: string;
  createdAt: Date;
}

export interface DbTaskList {
  id: string;
  userId: string;
  name: string;
  icon: string | null;
  createdAt: Date;
  tasks: DbTask[];
}

// Frontend display types for backward compatibility with components
export interface Task {
  id: number;
  title: string;
  description: string;
  time: string;
  color: 'blue' | 'purple' | 'yellow' | 'pink' | 'green';
}

export interface TaskListData {
  id: string;
  name: string;
  icon: string | null;
  tasks: Task[];
}