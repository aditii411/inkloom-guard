import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/mockData';
import { 
  ShieldCheck, 
  Search, 
  Bell, 
  RotateCcw, 
  ChevronDown, 
  UserCheck, 
  Sparkles, 
  Lock, 
  Briefcase, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function TopNavbar() {
  const { 
    currentUser, 
    activeRole, 
    switchRoleDirectly, 
    switchUser, 
    document, 
    resetDemo,
    violations,
    complianceScore 
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const openIssuesCount = violations.filter(v => v.status === 'Open' || v.status === 'Locked').length;

  const mockNotifications = [
    {
      id: 1,
      title: "Audit Alert: High Severity Claim Flagged",
      desc: "Absolute guarantee '100% guaranteed' requires substantiation.",
      time: "2m ago",
      type: "alert"
    },
    {
      id: 2,
      title: "Guideline Vault Updated",
      desc: "RULE 03: Verified Claims revised by Legal Reviewer.",
      time: "15m ago",
      type: "info"
    },
    {
      id: 3,
      title: "Collaboration Comment",
      desc: "Khushi Chouhan commented on Q4 Launch Campaign.",
      time: "1h ago",
      type: "message"
    }
  ];

  return (
    <header className="h-16 bg-[#0D1321]/90 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between z-20 select-none">
      {/* Left: Workspace & Active Document Pill */}
      <div className="flex items-center space-x-4">
        {/* Workspace Pill */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-400 font-mono text-[11px]">Workspace:</span>
          <span className="font-semibold text-slate-200 tracking-wide">CTRL+ She Workspace</span>
        </div>

        {/* Active Document Indicator */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-violet-950/30 border border-violet-500/20 text-xs">
          <span className="text-violet-400 font-medium">Active Doc:</span>
          <span className="text-slate-200 font-medium max-w-[200px] truncate" title={document.title}>
            {document.title}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
            document.status === 'Published' 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : document.status === 'Approved'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : document.status === 'In Review'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-slate-800 text-slate-300 border border-slate-700'
          }`}>
            {document.status}
          </span>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="hidden md:flex items-center max-w-xs w-full mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search guidelines, rules, claims..."
            className="w-full bg-slate-900/60 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all"
          />
        </div>
      </div>

      {/* Right Controls: Role Switcher, Reset Demo, Notifications, Profile */}
      <div className="flex items-center space-x-3">
        {/* Quick Reset Demo Button for Hackathon Judges */}
        <button
          onClick={resetDemo}
          title="Reset to sample state with 8 violations"
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all group"
        >
          <RotateCcw className="w-3.5 h-3.5 text-violet-400 group-hover:rotate-180 transition-transform duration-500" />
          <span className="hidden sm:inline font-medium">Reset Demo</span>
        </button>

        {/* ROLE SWITCHER DROPDOWN (FLAGSHIP WORKFLOW REQUIREMENT) */}
        <div className="relative">
          <button
            onClick={() => {
              setRoleDropdownOpen(!roleDropdownOpen);
              setNotificationsOpen(false);
              setUserMenuOpen(false);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-cyan-600/20 hover:from-violet-600/30 hover:to-cyan-600/30 border border-violet-500/40 text-xs text-white shadow-sm transition-all"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-slate-400 font-mono text-[11px]">Role:</span>
            <span className="font-bold text-cyan-300">{activeRole}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl bg-[#0D1321] border border-violet-500/30 shadow-2xl p-2 z-50 animate-slide-down">
              <div className="px-3 py-2 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                Switch Interactive Persona
              </div>
              
              {/* Creator */}
              <button
                onClick={() => {
                  switchUser('user-1');
                  setRoleDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-start space-x-3 transition-colors ${
                  activeRole === 'Creator' ? 'bg-violet-600/20 border border-violet-500/30' : 'hover:bg-slate-800/60'
                }`}
              >
                <div className="p-1.5 rounded-lg bg-violet-500/20 text-violet-400 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white flex items-center space-x-1.5">
                    <span>Creator</span>
                    <span className="text-[10px] text-slate-400 font-normal">(Aditi)</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Edit content, run AI audits, apply auto-fixes, submit for approval.
                  </div>
                </div>
              </button>

              {/* Brand Manager */}
              <button
                onClick={() => {
                  switchUser('user-2');
                  setRoleDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-start space-x-3 transition-colors mt-1 ${
                  activeRole === 'Brand Manager' ? 'bg-cyan-600/20 border border-cyan-500/30' : 'hover:bg-slate-800/60'
                }`}
              >
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 mt-0.5">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white flex items-center space-x-1.5">
                    <span>Brand Manager</span>
                    <span className="text-[10px] text-slate-400 font-normal">(Khushi)</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Approve/reject campaigns, enforce brand guidelines, manage pipeline.
                  </div>
                </div>
              </button>

              {/* Legal Reviewer */}
              <button
                onClick={() => {
                  switchUser('user-3');
                  setRoleDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-start space-x-3 transition-colors mt-1 ${
                  activeRole === 'Legal Compliance Reviewer' ? 'bg-rose-600/20 border border-rose-500/30' : 'hover:bg-slate-800/60'
                }`}
              >
                <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white flex items-center space-x-1.5">
                    <span>Legal Reviewer</span>
                    <span className="text-[10px] text-slate-400 font-normal">(Sanskrati / Shruti)</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Review factual claims, lock unsubstantiated claims, grant legal clearance.
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setRoleDropdownOpen(false);
              setUserMenuOpen(false);
            }}
            className="relative p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#0D1321] border border-slate-700/80 shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Governance Alerts
                </span>
                <span className="text-[10px] text-cyan-400 font-medium">3 unread</span>
              </div>
              <div className="mt-2 space-y-2 max-h-72 overflow-y-auto">
                {mockNotifications.map((notif) => (
                  <div key={notif.id} className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">{notif.title}</span>
                      <span className="text-[10px] text-slate-500">{notif.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{notif.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setUserMenuOpen(!userMenuOpen);
              setRoleDropdownOpen(false);
              setNotificationsOpen(false);
            }}
            className="flex items-center space-x-2 p-1 pl-2 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-lg object-cover border border-violet-500/40"
            />
            <div className="hidden xl:block text-left pr-1">
              <div className="text-xs font-semibold text-slate-200 leading-tight">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400 font-mono leading-tight">{currentUser.title}</div>
            </div>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0D1321] border border-slate-700/80 shadow-2xl p-3 z-50">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-xl object-cover border border-cyan-500/40"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                  <div className="text-[11px] text-cyan-400 truncate">{currentUser.email}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{currentUser.role}</div>
                </div>
              </div>
              <div className="py-2 text-xs space-y-1">
                <div className="px-2 py-1 text-slate-400 font-mono text-[10px] uppercase">
                  Current Document Stats
                </div>
                <div className="flex justify-between px-2 py-1 text-slate-300">
                  <span>Compliance Health:</span>
                  <span className="font-bold text-violet-400">{complianceScore}%</span>
                </div>
                <div className="flex justify-between px-2 py-1 text-slate-300">
                  <span>Unresolved Violations:</span>
                  <span className="font-bold text-rose-400">{openIssuesCount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
