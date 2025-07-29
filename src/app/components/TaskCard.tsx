import React from 'react';
import { Task } from '@/lib/mockData';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const getBgColor = () => {
    switch (task.color) {
      case 'blue':
        return 'bg-blue-100';
      case 'purple':
        return 'bg-purple-100';
      case 'yellow':
        return 'bg-yellow-100';
      case 'pink':
        return 'bg-pink-100';
      case 'green':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className={`${getBgColor()} p-5 rounded-xl shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input type="checkbox" className="h-5 w-5 mr-3 rounded" />
          <h3 className="font-semibold text-gray-800">{task.title}</h3>
        </div>
        <i className="fas fa-ellipsis-h text-gray-500"></i>
      </div>
      <p className="text-gray-600 text-sm mb-4">{task.description}</p>
      <div className="text-sm font-medium text-gray-700">{task.time}</div>
    </div>
  );
};

export default TaskCard;
