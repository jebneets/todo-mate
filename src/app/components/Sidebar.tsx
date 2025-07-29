import React from 'react';
import { DbTaskList } from '~/types';

interface SidebarProps {
  taskLists: DbTaskList[];
  activeListId: string;
  onListSelect: (listId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ taskLists, activeListId, onListSelect }) => {
  return (
    <aside className="w-64 bg-white p-5 border-r border-gray-200 flex flex-col">
      <div className="flex items-center mb-10">
        <img src="/assets/Todo-Mate-logo.png" alt="Todo Mate" className="w-10 h-10 mr-2" />
        <span className="text-2xl font-semibold text-gray-800">Todo Mate</span>
      </div>
      <nav className="flex-1">
        <ul>
          <li className="mb-4">
            <a href="#" className="flex items-center text-gray-600 font-medium">
              <i className="fas fa-calendar-alt mr-3"></i>
              Overview
            </a>
          </li>
          <li className="mb-4 bg-blue-100 rounded-lg p-2">
            <div className="flex items-center text-blue-600 font-medium mb-2">
              <i className="fas fa-list-alt mr-3"></i>
              Todo Lists
              <i className="fas fa-chevron-down ml-auto"></i>
            </div>
            <ul className="pl-8 space-y-2">
              {taskLists.map((taskList) => (
                <li key={taskList.id}>
                  <button
                    onClick={() => onListSelect(taskList.id)}
                    className={`flex items-center w-full text-left py-1 px-2 rounded transition-colors ${
                      activeListId === taskList.id
                        ? 'bg-brand-blue text-white'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <i className={`${taskList.icon || 'fas fa-list'} mr-2 text-sm`}></i>
                    {taskList.name}
                    <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                      activeListId === taskList.id
                        ? 'bg-white bg-opacity-20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {taskList.tasks.length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
