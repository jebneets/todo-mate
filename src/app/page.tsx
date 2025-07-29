'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Sidebar from '@/src/app/components/Sidebar';
import Header from '@/src/app/components/Header';
import TaskList from '@/src/app/components/TaskList';
import { api } from '~/trpc/react';
import { convertDbTaskListToDisplayTaskList } from '~/utils/taskConversion';

// Landing page component for unauthenticated users
function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-brand-blue-light">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:px-12">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
            <i className="fas fa-check text-white text-sm"></i>
          </div>
          <span className="text-xl font-bold text-gray-900">TodoMate</span>
        </div>
        <a 
          href="/api/auth/signin" 
          className="bg-brand-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Sign In
        </a>
      </nav>

      {/* Hero Section */}
      <section className="text-center px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Work, without the
          <span className="text-brand-blue"> chaos</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Your ultimate productivity companion. Organize tasks, set priorities, and achieve your goals with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a 
            href="/api/auth/signin" 
            className="bg-brand-blue text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
          >
            Start for free
          </a>
          <button className="text-brand-blue border border-brand-blue px-8 py-4 rounded-lg hover:bg-brand-blue hover:text-white transition-all font-semibold text-lg">
            Watch demo
          </button>
        </div>
        
        {/* Mock app preview */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Today's Tasks</h3>
              <span className="bg-brand-blue text-white px-3 py-1 rounded-full text-sm">3 left</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-4 h-4 border-2 border-brand-blue rounded"></div>
                <span className="text-gray-700">Review project proposal</span>
                <span className="text-red-500 text-sm ml-auto">High</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
                <span className="text-gray-500 line-through">Call client about updates</span>
                <span className="text-green-500 text-sm ml-auto">Done</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-4 h-4 border-2 border-brand-blue rounded"></div>
                <span className="text-gray-700">Prepare presentation slides</span>
                <span className="text-yellow-500 text-sm ml-auto">Medium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Everything you need to stay organized
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-blue-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-tasks text-brand-blue text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Organization</h3>
              <p className="text-gray-600">Categorize and prioritize your tasks with intelligent sorting and filtering.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-calendar-alt text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Due Date Tracking</h3>
              <p className="text-gray-600">Never miss a deadline with smart reminders and calendar integration.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Progress Insights</h3>
              <p className="text-gray-600">Track your productivity with detailed analytics and progress reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Trusted by productive people everywhere
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex text-yellow-400 mb-4 justify-center">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-gray-600 mb-4">"TodoMate has completely transformed how I manage my daily tasks. It's intuitive and powerful."</p>
              <div className="font-semibold text-gray-900">Sarah Johnson</div>
              <div className="text-sm text-gray-500">Project Manager</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex text-yellow-400 mb-4 justify-center">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-gray-600 mb-4">"The best task management app I've used. Clean interface and all the features I need."</p>
              <div className="font-semibold text-gray-900">Mike Chen</div>
              <div className="text-sm text-gray-500">Software Developer</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex text-yellow-400 mb-4 justify-center">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-gray-600 mb-4">"Finally, a todo app that doesn't get in my way. Love the simplicity and effectiveness."</p>
              <div className="font-semibold text-gray-900">Emma Davis</div>
              <div className="text-sm text-gray-500">Marketing Director</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get organized?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who have transformed their productivity with TodoMate.
          </p>
          <a 
            href="/api/auth/signin" 
            className="bg-white text-brand-blue px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg inline-block"
          >
            Get started for free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                <i className="fas fa-check text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold">TodoMate</span>
            </div>
            <div className="text-gray-400">
              © 2024 TodoMate. Built with Next.js and love.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Todo app component for authenticated users
function TodoApp() {
  const { data: taskListsData, isLoading } = api.taskList.getAll.useQuery();
  const [activeListId, setActiveListId] = useState<string>('');
  
  // Set active list ID when data loads
  useEffect(() => {
    if (taskListsData && taskListsData.length > 0 && !activeListId) {
      setActiveListId(taskListsData[0].id);
    }
  }, [taskListsData, activeListId]);
  
  const activeList = taskListsData?.find(list => list.id === activeListId);
  
  const handleListSelect = (listId: string) => {
    setActiveListId(listId);
  };

  if (isLoading) {
    return (
      <div className="bg-[#f9f9f9] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          taskLists={taskListsData || []}
          activeListId={activeListId}
          onListSelect={handleListSelect}
        />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-y-auto">
            {activeList ? (
              <TaskList 
                listName={activeList.name}
                initialTasks={convertDbTaskListToDisplayTaskList(activeList).tasks} 
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No task lists found</p>
                <button className="bg-brand-blue text-white px-4 py-2 rounded-lg">
                  Create your first list
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (session) {
    return <TodoApp />;
  }
  
  return <LandingPage />;
}
