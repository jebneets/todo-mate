'use client';

import React, { useState } from 'react';
import { Task } from '@/lib/mockData';
import { api } from '~/trpc/react';

interface TaskListProps {
  listName: string;
  taskListId: string;
  initialTasks?: Task[];
}

interface TaskItemProps {
  task: Task & { completed?: boolean; dbId?: string };
  onDelete: (taskId: string) => void;
  onToggle: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={task.completed || false}
            onChange={() => onToggle(task.dbId || task.id.toString())}
            className="h-5 w-5 mt-1 text-brand-blue border-gray-300 rounded focus:ring-brand-blue"
          />
          <div className="flex-1">
            <h3 className={`font-semibold text-gray-800 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <p className={`text-sm text-gray-600 mt-1 ${task.completed ? 'line-through' : ''}`}>
              {task.description}
            </p>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-xs text-gray-500">{task.time}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                task.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                task.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                task.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                task.color === 'pink' ? 'bg-pink-100 text-pink-800' :
                task.color === 'green' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {task.color}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(task.dbId || task.id.toString())}
          className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
          title="Delete task"
        >
          <i className="fas fa-trash text-sm"></i>
        </button>
      </div>
    </div>
  );
};

const TaskList: React.FC<TaskListProps> = ({ 
  listName,
  taskListId,
  initialTasks = []
}) => {
  const { data: tasks, refetch } = api.task.getByTaskListId.useQuery({ taskListId });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });
  const [showCompleted, setShowCompleted] = useState(false);

  const createTaskMutation = api.task.create.useMutation({
    onSuccess: () => {
      refetch();
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium'
      });
      setShowAddForm(false);
    },
  });

  const deleteTaskMutation = api.task.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const toggleTaskMutation = api.task.toggleComplete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    createTaskMutation.mutate({
      taskListId,
      title: newTask.title,
      notes: newTask.description || undefined,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined,
      priority: newTask.priority,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTaskMutation.mutate({ id: taskId });
  };

  const handleToggleTask = (taskId: string) => {
    toggleTaskMutation.mutate({ id: taskId });
  };

  // Convert database tasks to display format for compatibility
  const displayTasks = tasks ? tasks.map(task => ({
    id: parseInt(task.id.replace(/-/g, '').slice(0, 8), 16),
    title: task.title,
    description: task.notes || 'No description',
    time: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date',
    color: task.priority === 'high' ? 'purple' as const : 
           task.priority === 'low' ? 'green' as const : 'blue' as const,
    completed: task.isComplete,
    dbId: task.id // Keep original ID for database operations
  })) : [];

  const filteredTasks = displayTasks.filter(task => 
    showCompleted ? task.completed : !task.completed
  );

  const activeTasks = displayTasks.filter(task => !task.completed);
  const completedTasks = displayTasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      {/* TaskList Title */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">{listName}</h1>
        <p className="text-gray-600 mt-1">Manage your {listName.toLowerCase()} tasks</p>
      </div>
      
      {/* Header with filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowCompleted(false)}
            className={`text-lg font-semibold pb-2 border-b-2 transition-colors ${
              !showCompleted 
                ? 'text-gray-800 border-brand-blue' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Active Tasks ({activeTasks.length})
          </button>
          <button 
            onClick={() => setShowCompleted(true)}
            className={`text-lg font-semibold pb-2 border-b-2 transition-colors ${
              showCompleted 
                ? 'text-gray-800 border-brand-blue' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Completed ({completedTasks.length})
          </button>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <i className="fas fa-plus mr-2"></i>Add Task
        </button>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Task</h3>
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="Enter task title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="Enter task description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="submit"
                className="bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Task
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <i className="fas fa-tasks text-3xl mb-4"></i>
            <p className="text-lg">
              {showCompleted ? 'No completed tasks yet' : 'No active tasks'}
            </p>
            <p className="text-sm">
              {!showCompleted && 'Click "Add Task" to create your first task'}
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onToggle={handleToggleTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;