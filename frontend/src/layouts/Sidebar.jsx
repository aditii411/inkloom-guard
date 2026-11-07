import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Sparkles, 
  BookOpenCheck, 
  GitPullRequest, 
  BarChart3, 
  History, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Users
} from 'lucide-react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { violations, pipeline } = useApp();

  const openViolationsCount = violations.filter((v) => v.status === 'Open' || v.status === 'Locked').length;
  const pendingApprovalsCount = pipeline.filter((d) => d.stage === 'In Review').length;

  const navItems = [
    {
      name: 'Overview Dashboard',
      path: '/',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: 'Pre-Publish Audit Studio',
      path: '/audit',
      icon: Sparkles,
      badge: openViolationsCount > 0 ? `${openViolationsCount} Issues` : 'Clean',
      badgeColor: openViolationsCount > 0 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
      isFlagship: true
    },
    {
      name: 'Brand Guidelines Vault',
      path: '/guidelines',
      icon: BookOpenCheck,
      badge: 'RAG Vault'
    },
    {
      name: 'Approval Center',
      path: '/approvals',
      icon: GitPullRequest,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} Review` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
    },
    {
      name: 'Analytics & Insights',
      path: '/analytics',
      icon: BarChart3,
      badge: null
    },
    {
      name: 'Audit Trail',
      path: '/audit-trail',
      icon: History,
      badge: 'Immutable'
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside
      className={`relative flex flex-col bg-[#0D1321] border-r border-slate-800/80 transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="h-18 flex items-center justify-between px-4 border-b border-slate-800/60 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-glow-violet">
            <div className="w-full h-full bg-[#0D1321] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Inkloom
                </span>
                <span className="font-bold text-lg text-violet-400 tracking-tight">
                  Guard
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-mono tracking-wider text-cyan-400/90 uppercase font-semibold">
                  AI Governance
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-emerald-400"></span>
                <span className="text-[10px] font-mono text-slate-400">v2.4</span>
              </div>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {!collapsed && (
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
            Platform Modules
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? item.isFlagship
                      ? 'bg-gradient-to-r from-violet-600/30 to-cyan-600/20 text-white border border-violet-500/50 shadow-glow-violet'
                      : 'bg-violet-600/20 text-white border border-violet-500/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 text-cyan-400" />
              
              {!collapsed && (
                <div className="flex items-center justify-between flex-1 ml-3 truncate">
                  <span className="truncate">{item.name}</span>
                  {item.badge && (
                    <span
                      className={`ml-2 px-2 py-0.5 text-[10px] font-mono rounded-full font-semibold ${
                        item.badgeColor || 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Collapsed Tooltip */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.name}
                  {item.badge && ` (${item.badge})`}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Flagship Notice & Team Attribution */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        {!collapsed ? (
          <div className="p-3 rounded-xl bg-gradient-to-br from-violet-950/40 to-slate-900/60 border border-violet-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 font-bold">
                Team Submission
              </span>
              <span className="px-1.5 py-0.5 text-[9px] bg-violet-500/20 text-violet-300 rounded font-mono">
                CTRL+ She
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-200">
              National Hackathon 2026
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Aditi Choudhary
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 text-center">
            <Users className="w-5 h-5 text-violet-400" title="Team CTRL+ She" />
            <span className="text-[9px] font-mono text-slate-400 mt-1">CTRL+</span>
          </div>
        )}
      </div>
    </aside>
  );
}