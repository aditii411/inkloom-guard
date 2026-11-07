import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Clock, 
  BookOpen, 
  GitPullRequest, 
  BarChart2, 
  Layers, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function OverviewDashboard() {
  const navigate = useNavigate();
  const { 
    complianceScore, 
    violations, 
    pipeline, 
    auditLogs, 
    document, 
    currentUser, 
    activeRole 
  } = useApp();

  const openViolations = violations.filter((v) => v.status === 'Open' || v.status === 'Locked');
  const highSeverityViolations = openViolations.filter((v) => v.severity === 'HIGH');
  const pendingApprovals = pipeline.filter((d) => d.stage === 'In Review');

  // KPI Metrics (dynamic with seeded baselines)
  const kpis = [
    {
      id: 'kpi-1',
      title: 'Brand Health Score',
      value: `${complianceScore}%`,
      change: complianceScore >= 80 ? '+4.2%' : '-6.8%',
      isPositive: complianceScore >= 80,
      period: 'vs previous audit cycle',
      icon: ShieldCheck,
      color: complianceScore >= 80 ? 'text-emerald-400' : 'text-amber-400',
      bgGlow: complianceScore >= 80 ? 'from-emerald-950/40' : 'from-amber-950/40',
      borderColor: complianceScore >= 80 ? 'border-emerald-500/30' : 'border-amber-500/30'
    },
    {
      id: 'kpi-2',
      title: 'Total Audited Documents',
      value: '248',
      change: '+18.4%',
      isPositive: true,
      period: 'vs last 30 days',
      icon: FileText,
      color: 'text-violet-400',
      bgGlow: 'from-violet-950/40',
      borderColor: 'border-violet-500/30'
    },
    {
      id: 'kpi-3',
      title: 'Active Violations',
      value: openViolations.length,
      change: openViolations.length <= 4 ? '-42%' : '+12%',
      isPositive: openViolations.length <= 4,
      period: 'across active campaigns',
      icon: AlertTriangle,
      color: openViolations.length > 0 ? 'text-rose-400' : 'text-emerald-400',
      bgGlow: 'from-rose-950/40',
      borderColor: 'border-rose-500/30'
    },
    {
      id: 'kpi-4',
      title: 'Auto-Fix Acceptance',
      value: '78%',
      change: '+6.1%',
      isPositive: true,
      period: 'efficiency benchmark',
      icon: Sparkles,
      color: 'text-cyan-400',
      bgGlow: 'from-cyan-950/40',
      borderColor: 'border-cyan-500/30'
    },
    {
      id: 'kpi-5',
      title: 'Pending Approvals',
      value: pendingApprovals.length,
      change: '3 high priority',
      isPositive: pendingApprovals.length <= 2,
      period: 'requiring governance signoff',
      icon: GitPullRequest,
      color: 'text-amber-400',
      bgGlow: 'from-amber-950/40',
      borderColor: 'border-amber-500/30'
    }
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-950/60 via-slate-900/90 to-cyan-950/50 border border-violet-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-40 -bottom-20 w-52 h-52 bg-cyan-600/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Enterprise AI Brand Protection Engine</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Inkloom Guard Compliance Overview
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Welcome back, <span className="text-cyan-300 font-semibold">{currentUser.name}</span> (<span className="text-violet-300">{activeRole}</span>). 
              The pre-publication engine is actively monitoring collateral across the CTRL+ She Workspace.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/audit')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-glow-violet transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Open Audit Studio</span>
            </button>
            <button
              onClick={() => navigate('/guidelines')}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-sm font-medium transition-all"
            >
              <BookOpen className="w-4 h-4 text-violet-400" />
              <span>Browse Vault</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className={`relative rounded-xl bg-gradient-to-b ${kpi.bgGlow} to-[#111827] border ${kpi.borderColor} p-5 shadow-lg transition-all hover:border-violet-500/50 hover:shadow-glow-violet group`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{kpi.title}</span>
                <div className={`p-2 rounded-lg bg-slate-900/80 ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline space-x-2">
                <span className="text-2xl font-extrabold text-white tracking-tight font-mono">
                  {kpi.value}
                </span>
                <span
                  className={`text-xs font-semibold flex items-center ${
                    kpi.isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {kpi.isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                  {kpi.change}
                </span>
              </div>

              <div className="mt-2 text-[11px] text-slate-400 truncate">
                {kpi.period}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Compliance Health Ring & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SECTION A: Circular Compliance Health Card */}
        <div className="lg:col-span-2 rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>Active Campaign Compliance Radar</span>
                <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 bg-cyan-950/40 rounded-full border border-cyan-800/40">
                  Live State
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Real-time evaluation across 5 governance pillars for "{document.title}"
              </p>
            </div>
            <button
              onClick={() => navigate('/audit')}
              className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center space-x-1"
            >
              <span>Inspect in Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Circular Progress Gauge */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#1E293B"
                    strokeWidth="9"
                  />
                  {/* Foreground Animated Gradient Stroke */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="url(#complianceScoreGrad)"
                    strokeWidth="9"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - complianceScore / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="complianceScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                    {complianceScore}%
                  </span>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    complianceScore >= 80 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {complianceScore >= 80 ? 'Ready for Review' : 'Critical Issues'}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <div className="text-xs text-slate-300 font-medium">
                  {openViolations.length === 0 ? 'Fully Verified' : `${openViolations.length} Unresolved Issues`}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Threshold: 80% minimum for approval
                </div>
              </div>
            </div>

            {/* Pillar Breakdown Bars */}
            <div className="md:col-span-2 space-y-3.5 pr-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                    <span>Tone & Brand Voice</span>
                  </span>
                  <span className="font-mono text-slate-300">
                    {violations.filter(v => v.category === 'Tone & Style' && v.status === 'Open').length === 0 ? '100%' : '65%'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                    style={{ width: violations.filter(v => v.category === 'Tone & Style' && v.status === 'Open').length === 0 ? '100%' : '65%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span>Terminology & Approved Lexicon</span>
                  </span>
                  <span className="font-mono text-slate-300">
                    {violations.filter(v => v.category === 'Terminology & Glossary' && v.status === 'Open').length === 0 ? '100%' : '70%'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                    style={{ width: violations.filter(v => v.category === 'Terminology & Glossary' && v.status === 'Open').length === 0 ? '100%' : '70%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    <span>Factual Claims & Empirical Guarantees</span>
                  </span>
                  <span className="font-mono text-slate-300">
                    {violations.filter(v => v.category === 'Factual Claims' && v.status === 'Open').length === 0 ? '100%' : '50%'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-500"
                    style={{ width: violations.filter(v => v.category === 'Factual Claims' && v.status === 'Open').length === 0 ? '100%' : '50%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Visual Identity & Palette Tokens</span>
                  </span>
                  <span className="font-mono text-slate-300">
                    {violations.filter(v => v.category === 'Visual & Accessibility' && v.detectedText.includes('Logo') && v.status === 'Open').length === 0 ? '100%' : '60%'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                    style={{ width: violations.filter(v => v.category === 'Visual & Accessibility' && v.detectedText.includes('Logo') && v.status === 'Open').length === 0 ? '100%' : '60%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>WCAG 2.1 AA Accessibility & Alt Text</span>
                  </span>
                  <span className="font-mono text-slate-300">
                    {violations.filter(v => v.category === 'Visual & Accessibility' && v.detectedText.includes('alt text') && v.status === 'Open').length === 0 ? '100%' : '55%'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                    style={{ width: violations.filter(v => v.category === 'Visual & Accessibility' && v.detectedText.includes('alt text') && v.status === 'Open').length === 0 ? '100%' : '55%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION D: Quick Actions Card */}
        <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-violet-400" />
              <span>Governance Quick Actions</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Direct pathways into core compliance workflows
            </p>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => navigate('/audit')}
                className="w-full text-left p-3.5 rounded-xl bg-gradient-to-r from-violet-950/30 to-slate-900 border border-violet-500/20 hover:border-violet-500/50 hover:bg-violet-900/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-violet-500/20 text-violet-400 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Start New Audit</div>
                    <div className="text-[11px] text-slate-400">Launch dual-pane pre-publish studio</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-violet-400 transition-colors" />
              </button>

              <button
                onClick={() => navigate('/guidelines')}
                className="w-full text-left p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/30 to-slate-900 border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-900/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Open Guidelines Vault</div>
                    <div className="text-[11px] text-slate-400">Manage rules & RAG document chunks</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </button>

              <button
                onClick={() => navigate('/approvals')}
                className="w-full text-left p-3.5 rounded-xl bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-500/20 hover:border-amber-500/50 hover:bg-amber-900/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                    <GitPullRequest className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Review Pending Approvals</div>
                    <div className="text-[11px] text-slate-400">
                      {pendingApprovals.length} submissions awaiting sign-off
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
              </button>

              <button
                onClick={() => navigate('/analytics')}
                className="w-full text-left p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/30 to-slate-900 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-900/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">View Analytics & Trends</div>
                    <div className="text-[11px] text-slate-400">Violation distribution & clarity index</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION B & C: Recent Violations & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION C: Recent High-Priority Violations */}
        <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span>High-Priority Violations Flagged</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Critical statements blocking public campaign sign-off
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {highSeverityViolations.length} Critical
            </span>
          </div>

          <div className="space-y-3 mt-4">
            {highSeverityViolations.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-slate-900/50 border border-slate-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-slate-200">No Critical Violations Detected</h3>
                <p className="text-xs text-slate-400 mt-1">All high-risk claims and assets have been verified or corrected.</p>
              </div>
            ) : (
              highSeverityViolations.map((viol) => (
                <div
                  key={viol.id}
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-rose-500/30 hover:border-rose-500/60 transition-all flex flex-col space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">
                      {viol.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Conf: {viol.confidenceScore}%
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-200">
                    Flagged: <span className="text-rose-300 line-through">"{viol.detectedText}"</span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-snug">
                    {viol.explanation}
                  </p>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">{viol.sourceCitation}</span>
                    <button
                      onClick={() => navigate('/audit')}
                      className="text-violet-400 hover:text-violet-300 font-medium flex items-center space-x-1"
                    >
                      <span>Auto-Fix in Studio</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SECTION B: Recent Activity Stream */}
        <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span>Recent Governance Activity</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Immutable trail of audits, auto-fixes, and clearance events
              </p>
            </div>
            <button
              onClick={() => navigate('/audit-trail')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
            >
              <span>View All Logs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 mt-4">
            {auditLogs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-start space-x-3"
              >
                <div className="p-1.5 rounded-lg bg-violet-950/50 text-violet-400 border border-violet-800/30 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200 truncate">
                      {log.action}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp.substring(11, 16)}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                    Doc: <span className="text-slate-300">{log.documentName}</span> • By: <span className="text-cyan-300">{log.user}</span> ({log.role})
                  </div>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-violet-400">
                      Score: {log.complianceScore}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 truncate">
                      Hash: {log.auditHash.substring(0, 12)}...
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
