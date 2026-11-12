import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

const MainLayout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        theme === 'light'
          ? 'bg-sky-50/50 text-slate-800'
          : 'bg-slate-900 text-slate-100'
      }`}
    >
      <Header/>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <Outlet/>
      </main>
    </div>
  );
};

export default MainLayout;