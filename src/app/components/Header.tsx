'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

interface HeaderProps {
  onCreateList?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateList }) => {
  const { data: session } = useSession();
  const currentDate = new Date().toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });

  return (
    <header className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          {currentDate}
          <i className="fas fa-chevron-down text-sm ml-2"></i>
        </h2>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input type="text" placeholder="Search List" className="bg-gray-100 rounded-lg py-2 pl-10 pr-4 focus:outline-none" />
        </div>
        <button 
          onClick={onCreateList}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          + Add New List
        </button>
        <div className="flex items-center space-x-4">
          <i className="fas fa-bell text-xl text-gray-600"></i>
          <div className="relative group">
            <img 
              src={session?.user?.image || "https://i.imgur.com/m5dM40w.png"} 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full cursor-pointer" 
            />
            <div className="absolute right-0 top-12 hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48 z-10">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-medium text-gray-800">{session?.user?.name}</p>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
              </div>
              <a 
                href="/api/auth/signout" 
                className="block px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
