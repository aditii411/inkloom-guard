import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ANALYTICS_DATA } from '../data/mockData';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  Filter, 
  FileSpreadsheet, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const { complianceScore, notify } = useApp();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedPillar, setSelectedPillar] = useState('ALL');

  // Colors for Donut chart
  const PIE_COLORS = ['#8B5CF6', '#06B6D4', '#F43F5E', '#F59E0B', '#10B981'];

  // Export Analytics as CSV
  const handleExportCSV = () => {
    const csvRows = [
      ['Metric', 'Value', 'Benchmark'],
      ['Brand Health Score', `${complianceScore}%`, 'Target: >85%'],
      ['Total Audited Documents', '248', '+18.4% MoM'],
      ['Auto-Fix Acceptance Rate', '78%', '+6.1% MoM'],
      ['Average Resolution Time', '14.2 min', '-3.1 min MoM'],
      [],
      ['Category', 'Violation Share (%)'],
      ...ANALYTICS_DATA.categoryDistribution.map(c => [c.name, `${c.value}%`]),
      [],
      ['Guideline Rule', 'Violation Frequency', 'Clarity Score'],
      ...ANALYTICS_DATA.guidelineClarityIndex.map(g => [g.rule, g.violations, `${g.clarityScore}%`])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inkloom_guard_governance_analytics_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    notify('Analytics Exported', 'CSV analytics dataset downloaded to your device.', 'success');
  };

  // Download Executive Compliance Report
  const handleDownloadReport = () => {
    const reportText = `INKLOOM GUARD — EXECUTIVE BRAND COMPLIANCE REPORT
Team Submission: CTRL+ She (Aditi Choudhary, Khushi Chouhan, Sanskrati Yadav, Shruti Jadon)
Generated: ${new Date().toLocaleString()}
Reporting Range: Last ${timeRange}
Workspace: CTRL+ She Global Brand Governance

============================================================
1. EXECUTIVE SUMMARY & KPIS
- Brand Health Score: ${complianceScore}% (Enterprise Healthy)
- Audited Collateral Count: 248 Assets
- Auto-Fix Acceptance: 78% (AI Remediation Efficiency)
- Average Resolution Latency: 14.2 Minutes
- Active Violations Blocking Publication: 0 Critical / 3 Advisory

2. GOVERNANCE PILLAR PERFORMANCE
- Tone & Style: 38% of total flagged instances (Informal tone, superlatives)
- Terminology & Glossary: 24% (Unapproved product naming, forbidden slang)
- Factual & Promotional Claims: 20% (Substantiation required)
- Visual Identity: 10% (Color token deviations)
- WCAG Accessibility: 8% (Missing alt text tags)

3. GUIDELINE CLARITY BENCHMARK
The lowest clarity index was observed in "RULE 03: Verified Claims" (61% clarity),
prompting an automated recommendation to update team style guides with pre-approved proof statements.

============================================================
Report certified by Inkloom Guard AI Engine • Immutable Snapshot
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Inkloom_Guard_Executive_Report_${timeRange}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    notify('Executive Report Downloaded', 'Formatted compliance summary generated.', 'success');
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-violet-950/50 via-slate-900 to-[#111827] border border-violet-500/30 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Governance & Analytics Dashboard</h1>
            <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Live Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Longitudinal trend telemetry, automated remediation performance, and brand guideline clarity indices across all marketing channels.
          </p>
          <div className="mt-2 text-[11px] font-mono text-slate-400">
            * Note: Telemetry includes live workspace session actions combined with historical benchmark demo data.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Date range filter */}
          <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            {['7d', '30d', '90d', 'YTD'].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  timeRange === r ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          {/* Download Report */}
          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-glow-violet transition-all"
          >
            <Download className="w-4 h-4 text-cyan-300" />
            <span>Executive Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Brand Health', val: `${complianceScore}%`, sub: '+4.2% MoM', color: 'text-violet-400' },
          { label: 'Documents Audited', val: '248', sub: '+18.4% MoM', color: 'text-cyan-400' },
          { label: 'Violation Rate', val: '14.5%', sub: '-3.2% drop', color: 'text-rose-400' },
          { label: 'Auto-Fix Acceptance', val: '78%', sub: '+6.1% MoM', color: 'text-emerald-400' },
          { label: 'Pending Reviews', val: '12', sub: '3 High Priority', color: 'text-amber-400' },
          { label: 'Avg Resolution Time', val: '14.2 min', sub: '-4.8 min speedup', color: 'text-indigo-400' }
        ].map((k, i) => (
          <div key={i} className="p-4 rounded-xl bg-[#111827] border border-slate-800 shadow-md">
            <div className="text-[11px] font-mono text-slate-400 uppercase truncate">{k.label}</div>
            <div className={`text-xl font-extrabold font-mono mt-1 ${k.color}`}>{k.val}</div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid: 2x2 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: VIOLATION DISTRIBUTION (Donut Chart) */}
        <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Violation Distribution by Category</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Total: 100% Share</span>
            </div>
            <p className="text-xs text-slate-400">
              Breakdown of detected brand compliance non-conformances across content types.
            </p>
          </div>

          <div className="h-64 my-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ANALYTICS_DATA.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ANALYTICS_DATA.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0D1321',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#F8FAFC'
                  }}
                  formatter={(value, name) => [`${value}% Share`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs">
            {ANALYTICS_DATA.categoryDistribution.map((c, i) => (
              <div key={c.name} className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }}></span>
                <span className="text-slate-300 truncate">{c.name}:</span>
                <span className="font-mono font-bold text-white">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 2: RECURRING VIOLATIONS (30-Day Line/Area Chart) */}
        <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-white">
                30-Day Recurring Violation Trends
              </h3>
              <span className="text-[10px] font-mono text-cyan-400">Downward Trend (-50%)</span>
            </div>
            <p className="text-xs text-slate-400">
              Total detected violations vs automatically resolved cases over time.
            </p>
          </div>

          <div className="h-64 my-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_DATA.trends30Days}>
                <defs>
                  <linearGradient id="colorViol" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorFixed" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0D1321',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="violations" name="Flagged Violations" stroke="#F43F5E" strokeWidth={2} fillOpacity={1} fill="url(#colorViol)" />
                <Area type="monotone" dataKey="autoFixed" name="Auto-Fixed by AI" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#colorFixed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Overall resolution rate has climbed to 92% in current cycle.</span>
            <span className="text-emerald-400 font-mono font-semibold">Healthy</span>
          </div>
        </div>

        {/* CHART 3: GUIDELINE CLARITY INDEX (Horizontal Bar Chart) */}
        <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-white">
                Guideline Clarity Index & Confusion Rate
              </h3>
              <span className="text-[10px] font-mono text-amber-400">Identifies Policy Gaps</span>
            </div>
            <p className="text-xs text-slate-400">
              Frequency with which brand rules cause repeated violations or creator edits.
            </p>
          </div>

          <div className="h-64 my-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={ANALYTICS_DATA.guidelineClarityIndex}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis type="number" stroke="#64748B" fontSize={11} />
                <YAxis dataKey="rule" type="category" stroke="#94A3B8" fontSize={10} width={130} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0D1321',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(val, name) => [val, name === 'violations' ? 'Violations Triggered' : 'Clarity Score %']}
                />
                <Bar dataKey="violations" name="Violations Count" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Lowest clarity: RULE 03 (Claims). Recommend standardizing benchmark templates.</span>
          </div>
        </div>

        {/* CHART 4: AUTO-FIX PERFORMANCE (Composed / Multi-Bar Chart) */}
        <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-white">
                Auto-Fix AI Performance & Acceptance
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">78% Auto-Accepted</span>
            </div>
            <p className="text-xs text-slate-400">
              Suggested AI replacements vs accepted, rejected, or manually adjusted copy.
            </p>
          </div>

          <div className="h-64 my-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_DATA.autoFixPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="category" stroke="#64748B" fontSize={10} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0D1321',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="suggested" name="Suggested" fill="#A855F7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="accepted" name="Accepted" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rejected" name="Rejected" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Tone and Terminology show the highest automatic acceptance fidelity (86%+).</span>
          </div>
        </div>
      </div>
    </div>
  );
}
