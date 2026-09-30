import React from 'react';
import {
  CheckSquare, Target, Repeat, DollarSign,
  ArrowUpRight, ArrowDownRight, Sparkles,
  BookOpen, Bell, ArrowRight
} from 'lucide-react';
import {
  Task, Goal, Routine, Habit, HabitLog, FinanceTransaction,
  FinanceAccount, Note, JournalEntry, NavModule, DailyPlanner,
  ReminderItem, AchievementItem
} from '../types';

interface DashboardViewProps {
  tasks: Task[];
  goals: Goal[];
  routines: Routine[];
  habits: Habit[];
  habitLogs: HabitLog[];
  finance: FinanceTransaction[];
  accounts: FinanceAccount[];
  notes: Note[];
  journal: JournalEntry[];
  dailyPlanner?: DailyPlanner;
  reminders?: ReminderItem[];
  achievements?: AchievementItem[];
  onNavigate: (module: NavModule) => void;
  onToggleTask: (id: string) => void;
  onLogHabit: (habitId: string, occurrence?: number) => void;
  onOpenQuickCapture: (type?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tasks,
  goals,
  routines,
  habits,
  habitLogs,
  finance,
  accounts,
  notes,
  journal,
  dailyPlanner,
  reminders = [],
  achievements = [],
  onNavigate,
  onToggleTask,
  onLogHabit,
  onOpenQuickCapture,
}) => {
  const today = new Date().toISOString().slice(0, 10);
  const priorityWeight: Record<string, number> = { High: 3, Medium: 2, Low: 1 };
  const sortedTasks = [...tasks]
    .filter(t => !t.done)
    .sort((a, b) => {
      if (a.dueAt && b.dueAt) {
        const d = a.dueAt.localeCompare(b.dueAt);
        if (d !== 0) return d;
      } else if (a.dueAt) return -1;
      else if (b.dueAt) return 1;
      const pA = priorityWeight[a.priority] || 0;
      const pB = priorityWeight[b.priority] || 0;
      if (pA !== pB) return pB - pA;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  const openTasks = sortedTasks;
  const todayTasks = sortedTasks.filter(t => (t.dueAt === today || t.date === today));

  // Financial calculations
  let income = 0;
  let expense = 0;
  let investment = 0;
  let loanRepay = 0;
  finance.forEach(f => {
    const amt = Number(f.amount) || 0;
    if (f.type === 'income') income += amt;
    else if (f.type === 'expense') expense += amt;
    else if (f.type === 'investment') investment += amt;
    else if (f.type === 'repayment') loanRepay += amt;
  });

  const operatingCashFlow = income - expense;
  const netCashFlow = operatingCashFlow - investment - loanRepay;
  const liquidCash = accounts.reduce((sum, a) => sum + (Number(a.balance) || 0), 0);
  const todayHabitLogs = habitLogs.filter(l => l.date === today);
  const activeReminders = [...reminders]
    .filter(r => r.status !== 'done')
    .sort((a, b) => (a.dueAt || '').localeCompare(b.dueAt || '') || (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Executive Command Center Banner (Compact, Full-Width Single-Line) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#090d1c] via-[#0f172a] to-[#080c18] px-5 py-4 sm:px-6 sm:py-4.5 lg:px-7 lg:py-5 text-white shadow-lg border border-white/10 ring-1 ring-white/10">
        <div className="relative z-10 w-full space-y-2">
          {/* Sovereign Badge */}
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/25 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold tracking-wider text-indigo-300 uppercase shadow-2xs">
              <span className="font-serif font-bold text-xs text-indigo-300">ॐ</span>
              <span>Om-LifeOS Command Center</span>
            </div>
          </div>

          {/* Inspirational Headline - Fluid sizing: Single line on desktop/laptop, beautiful clean wrap on tablet/mobile without clipping */}
          <h1 className="text-[15px] sm:text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold tracking-tight text-white leading-snug text-balance break-words xl:whitespace-nowrap w-full">
            Life can change your path, but never let it change who you become.
          </h1>

          {/* Daily Command Target / Philosophy */}
          <div className="flex items-start sm:items-center gap-2 text-xs sm:text-[13px] text-slate-300/85 font-normal leading-relaxed">
            <div className="mt-1 sm:mt-0 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 ring-2 ring-amber-400/25" />
            <p className="break-words">
              {dailyPlanner?.target || 'Unified sovereign personal operating system for high-leverage execution, double-entry financial clarity, and lifelong mastery.'}
            </p>
          </div>
        </div>

        {/* Subtle Ambient lighting mesh */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-violet-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* 4 Essential Metric Cards */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-4">
        <div className="executive-card p-4 sm:p-5 group cursor-default min-w-0">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider truncate">Open Tasks</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 shrink-0">
              <CheckSquare className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-mono text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums truncate">
            {openTasks.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>{todayTasks.length} scheduled for today</span>
          </div>
        </div>

        <div className="executive-card p-4 sm:p-5 group cursor-default min-w-0">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider truncate">Active Goals</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 shrink-0">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-mono text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums truncate">
            {goals.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
            <span>Active strategic trajectories</span>
          </div>
        </div>

        <div className="executive-card p-4 sm:p-5 group cursor-default min-w-0">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider truncate">Habits Logged</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 shrink-0">
              <Repeat className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 font-mono text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums truncate">
            {todayHabitLogs.length}<span className="text-slate-400 dark:text-slate-600 text-xl font-normal">/{habits.length || 0}</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
            <span>Recorded for today</span>
          </div>
        </div>

        <div className="executive-card p-4 sm:p-5 group cursor-default min-w-0">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider truncate">Net Flow</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 shrink-0">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className={`mt-3 font-mono text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums truncate ${netCashFlow >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            ₹{netCashFlow.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>Liquid balance: ₹{liquidCash.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          </div>
        </div>
      </div>

      {/* Grid: Tasks & Planner + Habits */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Today's Tasks & Execution Checkpoints (7 cols) */}
        <section className="lg:col-span-7 executive-card p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <CheckSquare className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Today's Priority Tasks & Planner
                </h2>
                <span className="text-[11px] text-slate-400 font-medium">
                  {todayTasks.length} pending for today · {dailyPlanner?.points?.filter(p => p.done).length || 0} checkpoints completed
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 flex items-center gap-1 cursor-pointer"
            >
              <span>Full Planner</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-2.5">
            {todayTasks.length === 0 && openTasks.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                All scheduled tasks completed. Capture new priorities anytime.
              </div>
            ) : (
              (todayTasks.length > 0 ? todayTasks : openTasks.slice(0, 5)).map(task => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100/90 p-3.5 transition-all hover:bg-slate-50/80 hover:border-slate-200 dark:border-slate-800/60 dark:hover:bg-slate-800/50"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <button
                      type="button"
                      onClick={() => onToggleTask(task.id)}
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-all cursor-pointer ${
                        task.done
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                          : 'border-slate-300 hover:border-indigo-500 dark:border-slate-600'
                      }`}
                    >
                      {task.done && '✓'}
                    </button>
                    <div className="min-w-0">
                      <div className={`truncate text-xs font-semibold ${task.done ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                        {task.title}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="capitalize font-medium">{task.domain}</span>
                        <span>·</span>
                        <span className={task.priority === 'High' ? 'font-bold text-rose-500' : ''}>
                          {task.priority} Priority
                        </span>
                        {task.dueAt && (
                          <>
                            <span>·</span>
                            <span>Due {task.dueAt}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Habit Consistency & Rituals (5 cols) */}
        <section className="lg:col-span-5 executive-card p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                <Repeat className="h-4.5 w-4.5" />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Habit Tracking
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('routine')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 flex items-center gap-1 cursor-pointer"
            >
              <span>Habits</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-2.5">
            {habits.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No habits configured. Define recurring rituals in Routine.
              </div>
            ) : (
              habits.slice(0, 5).map(habit => {
                const isDone = todayHabitLogs.some(l => l.habitId === habit.id);
                return (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100/90 p-3.5 dark:border-slate-800/60 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{habit.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {habit.frequency || 'Daily'} · {habit.timesPerDay || 1}x daily
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onLogHabit(habit.id)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                        isDone
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800 shadow-2xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {isDone ? '✓ Logged' : 'Log Habit'}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      {/* Grid: Financial Flow Overview + Strategic Goals */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Strategic Goals (6 cols) */}
        <section className="lg:col-span-6 executive-card p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <Target className="h-4.5 w-4.5" />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Strategic Goals & Trajectory
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('goals')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 flex items-center gap-1 cursor-pointer"
            >
              <span>Goals</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {goals.slice(0, 4).map(goal => (
              <div key={goal.id} className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-900 dark:text-white truncate pr-2">{goal.title}</span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {goal.progress}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300"
                    style={{ width: `${Math.max(0, Math.min(100, goal.progress))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Financial Flow & Cashflow Overview (6 cols) */}
        <section className="lg:col-span-6 executive-card p-5 sm:p-6 border-2 border-amber-200/60 dark:border-amber-500/20">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">💰</span>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  Expenses & Income
                </h2>
                <span className="text-[11px] text-slate-400 font-medium">
                  Operating cashflow & liquid balances
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('finance')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 flex items-center gap-1 cursor-pointer"
            >
              <span>Ledger</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50/80 p-3.5 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <ArrowDownRight className="h-3.5 w-3.5 text-emerald-600" />
                <span>Operating Inflow</span>
              </div>
              <div className="mt-1 font-mono text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                ₹{income.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50/80 p-3.5 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <ArrowUpRight className="h-3.5 w-3.5 text-rose-600" />
                <span>Operating Outflow</span>
              </div>
              <div className="mt-1 font-mono text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                ₹{expense.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          {/* Quick Transaction stream */}
          <div className="mt-4 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Recent Activity
            </div>
            {[...finance].sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.createdAt || 0) - (a.createdAt || 0)).slice(0, 3).map(tx => (
              <div
                key={tx.id}
                className="flex items-center justify-between text-xs sm:text-sm py-1.5 border-b border-slate-50 dark:border-slate-800/40 last:border-0"
              >
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{tx.category}</span>
                  {tx.note && <span className="ml-1.5 text-slate-400 truncate">({tx.note})</span>}
                </div>
                <span className={`font-mono font-bold tabular-nums ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>
                  {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Grid: Active Reminders + Quick Capture */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Reminders (6 cols) */}
        <section className="lg:col-span-6 executive-card p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                <Bell className="h-4.5 w-4.5" />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Active Reminders</h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenQuickCapture('reminder')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 cursor-pointer"
            >
              + Add Reminder
            </button>
          </div>

          <div className="mt-4 space-y-2.5">
            {activeReminders.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No pending reminders. All clear!
              </div>
            ) : (
              activeReminders.map(rem => {
                const isAlarm = rem.alarmEnabled !== false;
                const timePart = rem.dueAt && rem.dueAt.includes('T') ? rem.dueAt.split('T')[1].slice(0, 5) : '';
                const datePart = rem.dueAt && rem.dueAt.includes('T') ? rem.dueAt.split('T')[0] : (rem.dueAt || '');
                return (
                  <div key={rem.id} className="flex items-center justify-between rounded-xl border border-slate-100/90 p-3 text-xs sm:text-sm dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all">
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <span className="text-base shrink-0">{isAlarm ? '⏰' : '📌'}</span>
                      <div className="truncate">
                        <span className="font-semibold text-slate-900 dark:text-white block truncate">{rem.title}</span>
                        <span className="text-[11px] text-slate-400">
                          {datePart} {timePart && `at ${timePart}`}
                        </span>
                      </div>
                    </div>
                    {isAlarm && (
                      <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                        Alarm Active
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Quick Capture Panel (6 cols) */}
        <section className="lg:col-span-6 executive-card p-5 sm:p-6">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4 dark:border-slate-800/80">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 font-bold">
              ⚡
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Instant Quick Capture Routing
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => onOpenQuickCapture('task')}
              className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-3 text-left transition-all hover:bg-indigo-50 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-800/70 dark:hover:border-indigo-500/50 cursor-pointer shadow-2xs group"
            >
              <CheckSquare className="h-4 w-4 text-emerald-500 mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">Task</div>
              <div className="text-[10px] text-slate-400">To Planner</div>
            </button>

            <button
              type="button"
              onClick={() => onOpenQuickCapture('note')}
              className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-3 text-left transition-all hover:bg-indigo-50 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-800/70 dark:hover:border-indigo-500/50 cursor-pointer shadow-2xs group"
            >
              <BookOpen className="h-4 w-4 text-amber-500 mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">Note</div>
              <div className="text-[10px] text-slate-400">To Notebooks</div>
            </button>

            <button
              type="button"
              onClick={() => onOpenQuickCapture('journal')}
              className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-3 text-left transition-all hover:bg-indigo-50 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-800/70 dark:hover:border-indigo-500/50 cursor-pointer shadow-2xs group"
            >
              <Sparkles className="h-4 w-4 text-blue-500 mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">Journal</div>
              <div className="text-[10px] text-slate-400">Reflection</div>
            </button>

            <button
              type="button"
              onClick={() => onOpenQuickCapture('expense')}
              className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-3 text-left transition-all hover:bg-indigo-50 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-800/70 dark:hover:border-indigo-500/50 cursor-pointer shadow-2xs group"
            >
              <DollarSign className="h-4 w-4 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">Expense</div>
              <div className="text-[10px] text-slate-400">To Ledger</div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
