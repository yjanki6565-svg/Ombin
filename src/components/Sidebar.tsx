import React from 'react';
import {
  LayoutDashboard, CheckSquare, Repeat, Target, Timer, FileText,
  BookOpen, Calculator, DollarSign, Heart, Briefcase, Users,
  Compass, Folder, Settings, X, HardDrive
} from 'lucide-react';
import { NavModule } from '../types';

interface SidebarProps {
  activeModule: NavModule;
  onNavigate: (module: NavModule) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  openTasksCount: number;
  remindersCount: number;
  onOpenComputerBackup?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  openTasksCount,
  remindersCount,
  onOpenComputerBackup,
}) => {
  const navItems: { id: NavModule; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'tasks', label: 'Tasks & Planner', icon: <CheckSquare className="h-4 w-4" />, badge: openTasksCount },
    { id: 'routine', label: 'Routine & Habits', icon: <Repeat className="h-4 w-4" /> },
    { id: 'goals', label: 'Goals & Strategy', icon: <Target className="h-4 w-4" /> },
    { id: 'focus', label: 'Focus (Deep Work)', icon: <Timer className="h-4 w-4" /> },
    { id: 'notes', label: 'Notes & Notebooks', icon: <FileText className="h-4 w-4" /> },
    { id: 'journal', label: 'Daily Journal', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'calculator', label: 'Calculator & Tools', icon: <Calculator className="h-4 w-4" /> },
    { id: 'finance', label: 'Finance & Ledger', icon: <DollarSign className="h-4 w-4" />, badge: 0 },
    { id: 'health', label: 'Health & Wellness', icon: <Heart className="h-4 w-4" /> },
    { id: 'work', label: 'Work & Learning', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'people', label: 'People & Relations', icon: <Users className="h-4 w-4" /> },
    { id: 'spiritual', label: 'Values & Spiritual', icon: <Compass className="h-4 w-4" /> },
    { id: 'things', label: 'Things & Documents', icon: <Folder className="h-4 w-4" /> },
    { id: 'settings', label: 'Settings & Sync', icon: <Settings className="h-4 w-4" />, badge: remindersCount }
  ];

  const handleSelect = (id: NavModule) => {
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Component */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200/80 bg-slate-50/80 backdrop-blur-xl transition-transform duration-200 ease-in-out dark:border-slate-800/80 dark:bg-slate-950/80 md:static md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* App Title & Mobile Close */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200/60 px-5 dark:border-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 font-serif font-bold text-white shadow-md shadow-indigo-500/25 ring-1 ring-white/20">
              ॐ
            </div>
            <div>
              <span className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight block">
                Om-LifeOS
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wide uppercase">
                Sovereign Executive Hub
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 md:hidden cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5 no-scrollbar">
          <nav className="space-y-0.5">
            {navItems.map(item => {
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`group relative flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300 font-bold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/60 dark:hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-indigo-600 dark:bg-indigo-400 shadow-sm shadow-indigo-500/50" />
                  )}
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`transition-colors ${
                        isActive
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {Boolean(item.badge && item.badge > 0) && (
                    <span
                      className={`rounded-lg px-1.5 py-0.5 text-[10px] font-mono font-bold tabular-nums ${
                        isActive
                          ? 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Computer Backup Quick Button */}
        <div className="border-t border-slate-200/60 p-3 space-y-2 text-center dark:border-slate-800/60">
          {onOpenComputerBackup && (
            <button
              type="button"
              onClick={() => {
                onOpenComputerBackup();
                onCloseMobile();
              }}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-indigo-200/80 bg-indigo-50/70 py-2 px-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition-all cursor-pointer shadow-2xs group"
            >
              <HardDrive className="h-3.5 w-3.5 group-hover:scale-105 transition-transform" />
              <span>Computer Backup</span>
            </button>
          )}

          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Local-First Sovereign OS
          </div>
          <div className="font-mono text-[9px] text-slate-400 dark:text-slate-500 tracking-wider">
            Multi-Device · IndexedDB Sync
          </div>
        </div>
      </aside>
    </>
  );
};
