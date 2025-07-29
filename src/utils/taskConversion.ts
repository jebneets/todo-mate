import { DbTask, Task, DbTaskList, TaskListData } from '~/types';

const priorityColors: Record<string, 'blue' | 'purple' | 'yellow' | 'pink' | 'green'> = {
  'low': 'green',
  'medium': 'blue', 
  'high': 'purple'
};

export function convertDbTaskToDisplayTask(dbTask: DbTask): Task {
  return {
    id: parseInt(dbTask.id.replace(/-/g, '').slice(0, 8), 16), // Convert UUID to number for display
    title: dbTask.title,
    description: dbTask.notes || 'No description',
    time: dbTask.dueDate ? new Date(dbTask.dueDate).toLocaleDateString() : 'No due date',
    color: priorityColors[dbTask.priority] || 'blue'
  };
}

export function convertDbTaskListToDisplayTaskList(dbTaskList: DbTaskList): TaskListData {
  return {
    id: dbTaskList.id,
    name: dbTaskList.name,
    icon: dbTaskList.icon,
    tasks: dbTaskList.tasks.map(convertDbTaskToDisplayTask)
  };
}