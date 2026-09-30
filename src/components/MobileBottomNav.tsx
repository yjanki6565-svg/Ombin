import React from 'react';
import { LayoutDashboard, CheckSquare, Repeat, FileText, Settings } from 'lucide-react';
import { NavModule } from '../types';

interface MobileBottomNavProps {
  activeModule: NavModule;
  onNavigate: (module: NavModule) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeModule, onNavigate }) => {
  const tabs: { id: NavModule; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'tasks', label: 'Tasks', icon: <CheckSquare className="h-4 w-4" /> },
    { id: 'routine', label: 'Habits', icon: <Repeat className="h-4 w-4" /> },
    { id: 'notes', label: 'Notes', icon: <FileText className="h-4 w-4" /> },
    { id: 'settings', label: 'More', icon: <Settings className="h-4 w-4" /> }
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-16 pb-safe items-center justify-around border-t border-slate-200/80 bg-white/90 px-2 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90 md:hidden shadow-xl">
      {tabs.map(tab => {
        const isActive = activeModule === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onNavigate(tab.id)}
            className={`relative flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1.5 px-2 transition-all cursor-pointer ${
              isActive
                ? 'font-bold text-indigo-600 dark:text-indigo-400'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
              {tab.icon}
            </div>
            <span className="text-[10px] font-semibold tracking-tight leading-tight">{tab.label}</span>
            {isActive && (
              <span className="absolute bottom-1 h-1 w-1 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
