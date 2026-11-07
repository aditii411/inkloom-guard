import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  RotateCcw, 
  Undo2, 
  Save, 
  Send, 
  Filter, 
  ExternalLink, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  ArrowRight, 
  FileText, 
  Layers, 
  Info,
  CheckCheck,
  Eye,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export default function AuditStudio() {
  const {
    document,
    setDocument,
    updateContent,
    violations,
    complianceScore,
    isAuditing,
    scanStage,
    runAiAudit,
    applyAutoFix,
    applyAllFixes,
    undoLastFix,
    ignoreIssue,
    lockClaim,
    historyStack,
    activeRole,
    permissions,
    submitDocumentForReview,
    resetDemo,
    notify
  } = useApp();

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [focusedViolationId, setFocusedViolationId] = useState(null);
  const [showMetadataPanel, setShowMetadataPanel] = useState(true);

  // Stats calculation
  const totalIssues = violations.length;
  const openViolations = violations.filter((v) => v.status === 'Open' || v.status === 'Locked');
  const fixedViolations = violations.filter((v) => v.status === 'Fixed');
  const highSeverityOpen = openViolations.filter((v) => v.severity === 'HIGH').length;
  const mediumSeverityOpen = openViolations.filter((v) => v.severity === 'MEDIUM').length;
  const lowSeverityOpen = openViolations.filter((v) => v.severity === 'LOW').length;

  const wordCount = document.content ? document.content.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = document.content ? document.content.length : 0;

  // Filtered issues for the right panel
  const filteredViolations = violations.filter((v) => {
    if (selectedCategory !== 'ALL' && v.category !== selectedCategory) return false;
    if (selectedSeverity !== 'ALL' && v.severity !== selectedSeverity) return false;
    return true;
  });

  // Handle manual title or campaign name updates
  const handleDocChange = (field, value) => {
    setDocument((prev) => ({ ...prev, [field]: value, updatedAt: 'Just now' }));
  };

  const handleSaveDraft = () => {
    notify('Draft Saved', `Document "${document.title}" saved successfully.`, 'info');
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-4 max-w-[1700px] mx-auto overflow-hidden">
      {/* Top Studio Header & Actions Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#111827] border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-glow-violet">
            <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white tracking-tight">Pre-Publish Audit Studio</h1>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40">
                Flagship Diagnostic Core
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Dual-pane automated inspection, live guideline grounding, and explainable one-click remediation.
            </p>
          </div>
        </div>

        {/* Global Studio Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Undo Last Fix */}
          <button
            onClick={undoLastFix}
            disabled={historyStack.length === 0}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              historyStack.length > 0
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 cursor-pointer'
                : 'bg-slate-900 text-slate-400 border-slate-800 cursor-not-allowed opacity-50'
            }`}
            title="Undo last auto-fix operation"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo Fix</span>
          </button>

          {/* Reset To Sample */}
          <button
            onClick={resetDemo}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white transition-all"
            title="Reset copy to intentional non-compliant sample"
          >
            <RotateCcw className="w-3.5 h-3.5 text-violet-400" />
            <span>Reset Sample</span>
          </button>

          {/* Save Draft */}
          <button
            onClick={handleSaveDraft}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white transition-all"
          >
            <Save className="w-3.5 h-3.5 text-slate-400" />
            <span>Save Draft</span>
          </button>

          {/* Apply All Fixes Button */}
          <button
            onClick={applyAllFixes}
            disabled={openViolations.length === 0 || !permissions.canApplyFix}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
              openViolations.length > 0 && permissions.canApplyFix
                ? 'bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white shadow-glow-cyan cursor-pointer'
                : 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-800'
            }`}
          >
            <CheckCheck className="w-4 h-4" />
            <span>Apply All Fixes ({openViolations.length})</span>
          </button>

          {/* Run AI Audit Primary Button */}
          <button
            onClick={runAiAudit}
            disabled={isAuditing}
            className="flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-glow-violet transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${isAuditing ? 'animate-spin text-cyan-300' : 'text-cyan-300'}`} />
            <span>{isAuditing ? 'Auditing Content...' : 'Run AI Audit'}</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Pane Studio Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-hidden">
        {/* ======================================================== */}
        {/* LEFT PANEL: INTERACTIVE CONTENT EDITOR (5.5 Columns)    */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 flex flex-col rounded-2xl bg-[#111827] border border-slate-800 shadow-2xl overflow-hidden min-h-0">
          {/* Document Metadata Form Strip */}
          <div className="p-4 border-b border-slate-800/80 bg-slate-900/40 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  value={document.title}
                  onChange={(e) => handleDocChange('title', e.target.value)}
                  disabled={!permissions.canEditDocument}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500/80 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Campaign Initiative
                </label>
                <input
                  type="text"
                  value={document.campaignName}
                  onChange={(e) => handleDocChange('campaignName', e.target.value)}
                  disabled={!permissions.canEditDocument}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500/80 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono text-slate-400">Content Type:</span>
                <select
                  value={document.contentType}
                  onChange={(e) => handleDocChange('contentType', e.target.value)}
                  disabled={!permissions.canEditDocument}
                  className="bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-cyan-300 focus:outline-none focus:border-violet-500/80"
                >
                  <option value="Advertisement">Advertisement</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Email">Email</option>
                  <option value="Website">Website</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-400">
                <span>Words: <strong className="text-slate-200">{wordCount}</strong></span>
                <span>Chars: <strong className="text-slate-200">{charCount}</strong></span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-slate-300">{document.status}</span>
              </div>
            </div>
          </div>

          {/* Editable Content Area with Highlight Overlay */}
          <div className="relative flex-1 p-4 flex flex-col min-h-0 bg-[#0B0F19]/40">
            {/* Auditing Animated Scanning Overlay */}
            {isAuditing && (
              <div className="absolute inset-0 bg-[#0B0F19]/90 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                <div className="relative w-20 h-20 mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-violet-500/20 border-t-cyan-400 animate-spin"></div>
                  <div className="absolute inset-3 rounded-full border-4 border-cyan-500/20 border-b-violet-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Scanning Pre-Publication Collateral...
                </h3>
                <p className="text-xs text-cyan-400 font-mono mt-2 max-w-md animate-pulse">
                  {scanStage}
                </p>
                <div className="mt-4 flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}

            {/* Violation Legend / Jump Bar */}
            <div className="mb-2 flex flex-wrap items-center justify-between text-[11px] px-2 py-1 bg-slate-900/60 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-mono flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5 text-violet-400" />
                <span>Detected Violations in Editor:</span>
              </span>
              <div className="flex items-center space-x-2">
                <span className="flex items-center space-x-1 text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>High ({highSeverityOpen})</span>
                </span>
                <span className="flex items-center space-x-1 text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Medium ({mediumSeverityOpen})</span>
                </span>
                <span className="flex items-center space-x-1 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  <span>Low ({lowSeverityOpen})</span>
                </span>
              </div>
            </div>

            {/* Main Interactive Textarea */}
            <div className="flex-1 relative flex flex-col min-h-0">
              <textarea
                value={document.content}
                onChange={(e) => updateContent(e.target.value)}
                disabled={!permissions.canEditDocument}
                placeholder="Paste or write marketing collateral here for AI compliance analysis..."
                className="w-full flex-1 p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-slate-100 font-sans leading-relaxed resize-none focus:outline-none focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/40 transition-all font-normal"
              />

              {!permissions.canEditDocument && (
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-amber-950/80 border border-amber-500/40 rounded-md text-[11px] font-mono text-amber-300 flex items-center space-x-1.5">
                  <Lock className="w-3 h-3" />
                  <span>Editor Read-Only ({activeRole} Persona)</span>
                </div>
              )}
            </div>

            {/* Interactive Flagged Entities Quick-Jump Badges */}
            <div className="mt-3 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Click entity to inspect diagnostic card:</span>
                <span className="text-violet-400">{violations.length} tokens checked</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {violations.map((v) => {
                  let badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
                  if (v.status === 'Fixed') {
                    badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 line-through';
                  } else if (v.status === 'Locked') {
                    badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
                  } else if (v.severity === 'MEDIUM') {
                    badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
                  } else if (v.severity === 'LOW') {
                    badgeColor = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
                  }

                  return (
                    <button
                      key={v.id}
                      onClick={() => setFocusedViolationId(v.id)}
                      className={`px-2 py-1 rounded-md text-[11px] font-mono border transition-all ${badgeColor} hover:scale-105 cursor-pointer`}
                      title={`Click to view: ${v.category} - ${v.explanation}`}
                    >
                      {v.status === 'Locked' && <Lock className="w-2.5 h-2.5 inline mr-1" />}
                      "{v.detectedText.length > 25 ? v.detectedText.substring(0, 22) + '...' : v.detectedText}"
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sample Metadata Details Box */}
            <div className="mt-3 border-t border-slate-800 pt-3 flex items-center justify-between">
              <button
                onClick={() => setShowMetadataPanel(!showMetadataPanel)}
                className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-violet-400" />
                <span>Asset & Visual Metadata Inspection</span>
              </button>
              <div className="text-[10px] text-slate-400 font-mono">
                WCAG 2.1 AA • Brand Palette Tokens
              </div>
            </div>

            {showMetadataPanel && (
              <div className="mt-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    <span>Image Alt Text:</span>
                  </span>
                  <span className="font-mono text-rose-400 text-[11px]">
                    {document.content.includes('alt: ') ? 'Verified (WCAG Compliant)' : 'Missing Alt Tag'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    <span>Logo Palette Token:</span>
                  </span>
                  <span className="font-mono text-cyan-400 text-[11px]">
                    {document.content.includes('#8B5CF6') ? '#8B5CF6 (Approved Violet)' : '#FF0055 (Unauthorized)'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                    <span>Legal Substantiation Citation:</span>
                  </span>
                  <span className="font-mono text-amber-400 text-[11px]">
                    {document.content.includes('100% guaranteed') ? 'Substantiation Citation Required' : 'Cleared'}
                  </span>
                </div>
              </div>
            )}

            {/* Bottom Workflow Action Button */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                {openViolations.length === 0 ? (
                  <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>All issues resolved! Ready for governance review.</span>
                  </span>
                ) : (
                  <span className="text-amber-400 font-medium">
                    {openViolations.length} issue(s) remain before campaign publication.
                  </span>
                )}
              </div>

              {permissions.canSubmitForReview && (
                <button
                  onClick={() => submitDocumentForReview(document.id)}
                  disabled={document.status === 'In Review' || document.status === 'Published'}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    document.status === 'In Review'
                      ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-glow-violet cursor-pointer'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{document.status === 'In Review' ? 'In Review Queue' : 'Submit for Review'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANEL: AI COMPLIANCE DIAGNOSTICS (6.5 Columns)    */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 flex flex-col rounded-2xl bg-[#111827] border border-slate-800 shadow-2xl overflow-hidden min-h-0">
          {/* Audit Results Summary Header Strip */}
          <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Compliance Score Gauge & Badges */}
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#1E293B" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke={complianceScore >= 80 ? '#10B981' : '#F43F5E'}
                      strokeWidth="10"
                      strokeDasharray={2 * Math.PI * 42}
                      strokeDashoffset={2 * Math.PI * 42 * (1 - complianceScore / 100)}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-base font-extrabold text-white font-mono">{complianceScore}%</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white">Compliance Status</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-full border ${
                        complianceScore === 100
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : complianceScore >= 80
                          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      }`}
                    >
                      {complianceScore === 100 ? 'FULLY COMPLIANT' : complianceScore >= 80 ? 'ACCEPTABLE' : 'NON-COMPLIANT'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1 font-mono">
                    <span>Total: <strong className="text-slate-200">{totalIssues}</strong></span>
                    <span>•</span>
                    <span>Resolved: <strong className="text-emerald-400">{fixedViolations.length}</strong></span>
                    <span>•</span>
                    <span>Remaining: <strong className="text-rose-400">{openViolations.length}</strong></span>
                  </div>
                </div>
              </div>

              {/* Severity Pill Counts */}
              <div className="flex items-center space-x-2">
                <div className="px-2.5 py-1.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-center">
                  <div className="text-[10px] text-rose-400 font-mono">HIGH</div>
                  <div className="text-xs font-bold text-white font-mono">{highSeverityOpen}</div>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-center">
                  <div className="text-[10px] text-amber-400 font-mono">MED</div>
                  <div className="text-xs font-bold text-white font-mono">{mediumSeverityOpen}</div>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-center">
                  <div className="text-[10px] text-cyan-400 font-mono">LOW</div>
                  <div className="text-xs font-bold text-white font-mono">{lowSeverityOpen}</div>
                </div>
              </div>
            </div>

            {/* Crucial High-Risk Warning Banner */}
            {highSeverityOpen > 0 && (
              <div className="mt-3 p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-start space-x-2 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400 mt-0.5" />
                <div className="leading-snug">
                  <strong className="font-semibold text-white">Pre-Publication Governance Lock:</strong> A document containing unresolved critical or high-risk claims cannot be approved or published until substantiated or corrected.
                </div>
              </div>
            )}
          </div>

          {/* Category Tabs & Severity Filter */}
          <div className="p-3 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1">
              {[
                { id: 'ALL', label: 'All Issues', count: totalIssues },
                { id: 'Tone & Style', label: 'Tone & Style', count: violations.filter(v => v.category === 'Tone & Style').length },
                { id: 'Terminology & Glossary', label: 'Terminology', count: violations.filter(v => v.category === 'Terminology & Glossary').length },
                { id: 'Factual Claims', label: 'Claims', count: violations.filter(v => v.category === 'Factual Claims').length },
                { id: 'Visual & Accessibility', label: 'Visual & A11y', count: violations.filter(v => v.category === 'Visual & Accessibility').length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Severity Filter Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono text-slate-400">Severity:</span>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
              >
                <option value="ALL">All Severities</option>
                <option value="HIGH">High Severity</option>
                <option value="MEDIUM">Medium Severity</option>
                <option value="LOW">Low Severity</option>
              </select>
            </div>
          </div>

          {/* Diagnostic Issue Cards Scroll List */}
          <div className="flex-1 p-4 space-y-3.5 overflow-y-auto">
            {filteredViolations.length === 0 ? (
              <div className="p-12 text-center rounded-xl bg-slate-900/40 border border-slate-800 my-auto">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">No Issues Match Filters</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  All violations in this category have been addressed or no rules were triggered.
                </p>
              </div>
            ) : (
              filteredViolations.map((viol) => {
                const isFixed = viol.status === 'Fixed';
                const isIgnored = viol.status === 'Ignored';
                const isLocked = viol.status === 'Locked';
                const isFocused = focusedViolationId === viol.id;

                let cardBorder = 'border-slate-800 hover:border-slate-700';
                if (isFocused) {
                  cardBorder = 'border-violet-500 ring-2 ring-violet-500/30';
                } else if (isLocked) {
                  cardBorder = 'border-amber-500/60 bg-amber-950/20';
                } else if (isFixed) {
                  cardBorder = 'border-emerald-500/30 bg-emerald-950/10 opacity-75';
                } else if (viol.severity === 'HIGH') {
                  cardBorder = 'border-rose-500/40 hover:border-rose-500/70';
                }

                return (
                  <div
                    key={viol.id}
                    id={`card-${viol.id}`}
                    className={`rounded-xl bg-[#0F172A] border ${cardBorder} p-4 transition-all duration-200 shadow-md relative`}
                  >
                    {/* Header Row: Category, Severity, Status */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-violet-300 font-semibold border border-slate-700">
                          {viol.category}
                        </span>

                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            viol.severity === 'HIGH'
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                              : viol.severity === 'MEDIUM'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          }`}
                        >
                          {viol.severity} SEVERITY
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-slate-400">
                          Conf: <strong className="text-cyan-400">{viol.confidenceScore}%</strong>
                        </span>

                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            isFixed
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : isLocked
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : isIgnored
                              ? 'bg-slate-800 text-slate-400'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {viol.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Detected Text vs Suggested Fix Replacement Box */}
                    <div className="mt-2.5 p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-2">
                      <div className="flex items-start justify-between text-xs">
                        <span className="text-[10px] font-mono uppercase text-slate-400 w-20 flex-shrink-0 mt-0.5">
                          Detected:
                        </span>
                        <div className="flex-1 font-mono text-rose-300 bg-rose-950/40 px-2 py-1 rounded border border-rose-900/50 line-through">
                          "{viol.detectedText}"
                        </div>
                      </div>

                      <div className="flex items-start justify-between text-xs">
                        <span className="text-[10px] font-mono uppercase text-emerald-400 w-20 flex-shrink-0 mt-0.5">
                          Correction:
                        </span>
                        <div className="flex-1 font-mono text-emerald-300 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-900/50">
                          "{viol.suggestedFix}"
                        </div>
                      </div>
                    </div>

                    {/* Explainable Diagnostic Rationale */}
                    <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                      {viol.explanation}
                    </p>

                    {/* Source Guideline Citation Strip */}
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-2">
                      <div className="flex items-center space-x-1.5 text-slate-400 font-mono text-[11px]">
                        <FileText className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                        <span className="truncate max-w-[280px]" title={viol.sourceCitation}>
                          Source: <strong className="text-slate-300">{viol.sourceCitation}</strong>
                        </span>
                      </div>

                      {/* Interactive Diagnostic Actions */}
                      <div className="flex items-center space-x-2">
                        {/* Legal Lock / Unlock (Legal Role Only) */}
                        {activeRole === 'Legal Compliance Reviewer' && viol.category === 'Factual Claims' && (
                          <button
                            onClick={() => lockClaim(viol.id)}
                            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                              isLocked
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                            }`}
                          >
                            {isLocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                            <span>{isLocked ? 'Unlock Claim' : 'Lock Claim'}</span>
                          </button>
                        )}

                        {/* Ignore Issue */}
                        {!isFixed && !isLocked && (
                          <button
                            onClick={() => ignoreIssue(viol.id)}
                            className="px-2 py-1 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                          >
                            Ignore
                          </button>
                        )}

                        {/* One-Click Apply Auto-Fix Button */}
                        {!isFixed && (
                          <button
                            onClick={() => applyAutoFix(viol.id)}
                            disabled={isLocked && activeRole !== 'Legal Compliance Reviewer'}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                              isLocked && activeRole !== 'Legal Compliance Reviewer'
                                ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                                : 'bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white shadow-glow-violet cursor-pointer'
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                            <span>Apply Auto-Fix</span>
                          </button>
                        )}

                        {isFixed && (
                          <span className="flex items-center space-x-1 text-emerald-400 text-xs font-semibold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Resolved</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
