import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Copy, 
  Check, 
  ShieldCheck, 
  ExternalLink, 
  FileText, 
  Layers, 
  User, 
  Calendar,
  Eye,
  X
} from 'lucide-react';

export default function AuditTrailView() {
  const { auditLogs, notify } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [copiedHashId, setCopiedHashId] = useState(null);
  const [selectedLogDetail, setSelectedLogDetail] = useState(null);

  // Distinct actions for dropdown filter
  const actionTypes = [
    'ALL',
    'Document Created',
    'Audit Run',
    'Auto-Fix',
    'Batch Auto-Fix',
    'Claim Legally Modified',
    'Approval Requested',
    'Document Approved',
    'Document Published',
    'Guideline Added'
  ];

  // Distinct roles
  const roles = ['ALL', 'Creator', 'Brand Manager', 'Legal Compliance Reviewer', 'System'];

  // Filtered audit logs
  const filteredLogs = auditLogs.filter((log) => {
    if (actionFilter !== 'ALL' && !log.action.includes(actionFilter)) return false;
    if (roleFilter !== 'ALL' && log.role !== roleFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchDoc = log.documentName.toLowerCase().includes(q);
      const matchUser = log.user.toLowerCase().includes(q);
      const matchAction = log.action.toLowerCase().includes(q);
      const matchHash = log.auditHash.toLowerCase().includes(q);
      if (!matchDoc && !matchUser && !matchAction && !matchHash) return false;
    }
    return true;
  });

  // Copy hash helper
  const handleCopyHash = (hash, id) => {
    navigator.clipboard.writeText(hash);
    setCopiedHashId(id);
    notify('Hash Copied', 'SHA-256 audit hash copied to clipboard.', 'info');
    setTimeout(() => setCopiedHashId(null), 2500);
  };

  // Export Audit Trail as CSV
  const handleExportCSV = () => {
    const csvRows = [
      ['Event ID', 'Document Name', 'User', 'Role', 'Action', 'Previous State', 'Updated State', 'Compliance Score', 'Timestamp', 'SHA-256 Hash'],
      ...filteredLogs.map(l => [
        l.id,
        `"${l.documentName}"`,
        `"${l.user}"`,
        l.role,
        `"${l.action}"`,
        `"${l.previousState}"`,
        `"${l.updatedState}"`,
        `${l.complianceScore}%`,
        l.timestamp,
        l.auditHash
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inkloom_guard_immutable_audit_trail_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    notify('Audit Trail Exported', 'Downloaded complete verifiable audit log as CSV.', 'success');
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-violet-950/50 via-slate-900 to-[#111827] border border-violet-500/30 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Verifiable Audit Trail</h1>
            <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              SHA-256 State Anchored
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Immutable, append-only record of every document modification, automated auto-fix, guideline rule edit, and role-based sign-off event.
          </p>
          <div className="mt-2 text-[11px] font-mono text-slate-400">
            * Note: Application records cryptographic snapshots for internal enterprise auditability.
          </div>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-glow-violet transition-all"
        >
          <Download className="w-4 h-4 text-cyan-300" />
          <span>Export Audit History (CSV)</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action, user, hash, document..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Action Type Dropdown */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-mono text-[11px]">Action:</span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
          >
            {actionTypes.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Role Filter Dropdown */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-mono text-[11px]">Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
          >
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Count summary */}
        <div className="text-xs font-mono text-slate-400">
          Showing <strong className="text-white">{filteredLogs.length}</strong> of {auditLogs.length} records
        </div>
      </div>

      {/* Main Audit Trail Table */}
      <div className="rounded-2xl bg-[#111827] border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Document</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">State Transition</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">SHA-256 Audit Hash</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No matching audit logs found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  let badgeBg = 'bg-violet-500/20 text-violet-300 border-violet-500/30';
                  if (log.action.includes('Approved') || log.action.includes('Published')) {
                    badgeBg = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
                  } else if (log.action.includes('Locked')) {
                    badgeBg = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                  } else if (log.action.includes('Violations') || log.action.includes('Rejected')) {
                    badgeBg = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
                  }

                  return (
                    <tr key={log.id} className="hover:bg-slate-900/40 transition-colors group">
                      <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                        {log.timestamp}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${badgeBg}`}>
                          {log.action}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-white max-w-[200px] truncate" title={log.documentName}>
                        {log.documentName}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-slate-200 font-medium">{log.user}</span>
                          <span className="text-[10px] text-cyan-400 font-mono">({log.role})</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400 max-w-[200px] truncate" title={`${log.previousState} ➔ ${log.updatedState}`}>
                        <span className="text-slate-400">{log.previousState}</span>
                        <span className="mx-1 text-slate-600">➔</span>
                        <span className="text-slate-200">{log.updatedState}</span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-violet-400 whitespace-nowrap">
                        {log.complianceScore}%
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {log.auditHash.substring(0, 14)}...
                          </span>
                          <button
                            onClick={() => handleCopyHash(log.auditHash, log.id)}
                            className="text-slate-400 hover:text-cyan-400 p-1 rounded transition-colors"
                            title="Copy Full SHA-256 Hash"
                          >
                            {copiedHashId === log.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedLogDetail(log)}
                          className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
                        >
                          View Snapshot
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Snapshot Detail Modal */}
      {selectedLogDetail && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#0D1321] border border-violet-500/40 shadow-2xl p-6 relative animate-scale-up">
            <button
              onClick={() => setSelectedLogDetail(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Cryptographic Event Snapshot</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4 font-mono">
              Event ID: {selectedLogDetail.id} • {selectedLogDetail.timestamp}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Document:</span>
                <span className="font-semibold text-white">{selectedLogDetail.documentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Operator:</span>
                <span className="text-slate-200">{selectedLogDetail.user} ({selectedLogDetail.role})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Action:</span>
                <span className="font-mono text-cyan-300 font-bold">{selectedLogDetail.action}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Previous State:</span>
                <span className="text-slate-400">{selectedLogDetail.previousState}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Updated State:</span>
                <span className="text-emerald-400 font-semibold">{selectedLogDetail.updatedState}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Compliance Health:</span>
                <span className="font-mono text-violet-400 font-bold">{selectedLogDetail.complianceScore}%</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">SHA-256 Integrity Hash:</div>
              <div className="font-mono text-[10px] text-cyan-300 break-all bg-black/50 p-2 rounded border border-slate-800 select-all">
                {selectedLogDetail.auditHash}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedLogDetail(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close Snapshot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
