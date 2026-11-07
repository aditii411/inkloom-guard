import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  GitPullRequest, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Clock, 
  FileCheck, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  UserCheck,
  Hash,
  AlertCircle
} from 'lucide-react';

export default function ApprovalCenter() {
  const { 
    pipeline, 
    document, 
    complianceScore, 
    violations, 
    activeRole, 
    currentUser, 
    permissions,
    comments,
    addComment,
    approveDocument,
    requestChanges,
    publishDocument,
    notify
  } = useApp();

  const [selectedDocId, setSelectedDocId] = useState(document.id);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyToId, setReplyToId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Approve & Publish Modal
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [approverNotes, setApproverNotes] = useState('Full compliance clearance granted. Brand tokens, substantiated claims, and WCAG accessibility standards verified.');
  const [publishedHashResult, setPublishedHashResult] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);

  // Rejection modal
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const activeDoc = pipeline.find((d) => d.id === selectedDocId) || pipeline[0];
  const openViolations = violations.filter((v) => v.status === 'Open' || v.status === 'Locked');
  const highSeverityOpen = openViolations.filter((v) => v.severity === 'HIGH').length;

  // Stages definition
  const stages = [
    { name: 'Draft', desc: 'Authoring & Revisions' },
    { name: 'Scanning', desc: 'AI Pre-Flight Audit' },
    { name: 'In Review', desc: 'Brand & Legal Review' },
    { name: 'Approved', desc: 'Governance Clearance' },
    { name: 'Published', desc: 'Immutable Live Release' }
  ];

  const currentStageIndex = stages.findIndex((s) => s.name === activeDoc.stage);

  // Handle Publish Action
  const handleConfirmPublish = async () => {
    setIsPublishing(true);
    try {
      const hash = await publishDocument(activeDoc.id, approverNotes);
      setPublishedHashResult(hash);
      
      // Fire confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#06B6D4', '#10B981']
      });
    } catch (err) {
      notify('Publishing Failed', 'An error occurred during cryptographic signing.', 'error');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      notify('Reason Required', 'Please explain why changes are requested.', 'error');
      return;
    }
    requestChanges(activeDoc.id, rejectReason);
    setRejectModalOpen(false);
    setRejectReason('');
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <GitPullRequest className="w-6 h-6 text-violet-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Approval Center & Workflow</h1>
            <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40">
              Role Governance
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Multi-stage pre-publication lifecycle. Rigorous checks by Brand Managers and Legal Counsel ensure no non-compliant collateral is published.
          </p>
        </div>

        {/* Current User Role Badge */}
        <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
          <div>
            <div className="text-slate-400 font-mono text-[10px] uppercase">Active Reviewer Persona</div>
            <div className="font-bold text-white flex items-center space-x-1.5">
              <span>{currentUser.name}</span>
              <span className="text-cyan-400">({activeRole})</span>
            </div>
          </div>
        </div>
      </div>

      {/* WORKFLOW PIPELINE PROGRESS BAR */}
      <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2 font-mono uppercase tracking-wider">
            <span>Lifecycle Pipeline:</span>
            <span className="text-violet-400">{activeDoc.title}</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Compliance Score: <strong className="text-emerald-400">{complianceScore}%</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isUpcoming = idx > currentStageIndex;

            return (
              <div
                key={stage.name}
                className={`p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-violet-950/40 border-violet-500 text-white shadow-glow-violet'
                    : isCompleted
                    ? 'bg-slate-900/80 border-emerald-500/40 text-slate-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-[10px] text-slate-400">0{idx + 1}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </div>
                <div className="text-sm font-bold truncate">{stage.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 truncate">{stage.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Pipeline Document Selector & Review Action Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Submissions in Pipeline (4 Columns) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#111827] border border-slate-800 p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white font-mono uppercase">
              Campaign Queue ({pipeline.length})
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Select to review</span>
          </div>

          <div className="space-y-2.5">
            {pipeline.map((doc) => {
              const isSelected = doc.id === selectedDocId;

              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-violet-950/30 border-violet-500/80 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {doc.type}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        doc.stage === 'Published'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : doc.stage === 'Approved'
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : doc.stage === 'In Review'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {doc.stage}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mt-2 truncate">
                    {doc.title}
                  </h4>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {doc.campaign}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>By: {doc.author}</span>
                    <span className="text-violet-400 font-semibold">{doc.score}% Compliant</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Review Deck, Role Actions, and Comment Threads (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          {/* Document Governance Evaluation Card */}
          <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{activeDoc.title}</h3>
                <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
                  <span>Author: <strong className="text-slate-200">{activeDoc.author}</strong></span>
                  <span>•</span>
                  <span>Campaign: <strong className="text-slate-200">{activeDoc.campaign}</strong></span>
                  <span>•</span>
                  <span>Stage: <strong className="text-amber-400">{activeDoc.stage}</strong></span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-slate-400">Compliance:</span>
                <span className="text-sm font-extrabold font-mono text-emerald-400 px-3 py-1 bg-emerald-950/40 border border-emerald-500/30 rounded-xl">
                  {complianceScore}%
                </span>
              </div>
            </div>

            {/* Content Snapshot Preview */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
              {document.content}
            </div>

            {/* Role Governance Decision Matrix */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-violet-400" />
                  <span>Role Authorization Deck</span>
                </span>
                <span className="text-[11px] font-mono text-cyan-400">
                  Current: {currentUser.name} ({activeRole})
                </span>
              </div>

              {/* Warnings / Blocker notification */}
              {highSeverityOpen > 0 && (
                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-rose-300 text-xs flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Publication Blocked:</strong> {highSeverityOpen} unresolved critical violation(s) remain in this document. Governance rules prevent final sign-off until all critical issues are fixed.
                  </div>
                </div>
              )}

              {/* Actions per Role */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Brand Manager Actions */}
                {permissions.canBrandApprove && (
                  <>
                    <button
                      onClick={() => approveDocument(activeDoc.id)}
                      disabled={highSeverityOpen > 0 || activeDoc.stage === 'Approved' || activeDoc.stage === 'Published'}
                      className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        highSeverityOpen === 0 && activeDoc.stage !== 'Approved' && activeDoc.stage !== 'Published'
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer'
                          : 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Grant Brand Approval</span>
                    </button>

                    <button
                      onClick={() => setRejectModalOpen(true)}
                      disabled={activeDoc.stage === 'Published'}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 transition-all cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Request Modifications</span>
                    </button>
                  </>
                )}

                {/* Legal Reviewer Actions */}
                {permissions.canLegalClear && (
                  <button
                    onClick={() => {
                      notify('Legal Clearance Granted', 'Factual claims and legal disclaimers passed compliance scrutiny.', 'success');
                    }}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-glow-violet transition-all cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Grant Legal Clearance</span>
                  </button>
                )}

                {/* Final Publish Button (Brand Manager or Legal) */}
                {permissions.canPublish && (
                  <button
                    onClick={() => setPublishModalOpen(true)}
                    disabled={highSeverityOpen > 0 || activeDoc.stage === 'Published'}
                    className={`flex items-center space-x-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                      highSeverityOpen === 0 && activeDoc.stage !== 'Published'
                        ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-glow-cyan cursor-pointer'
                        : 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>Approve & Publish (SHA-256 Sign)</span>
                  </button>
                )}

                {/* Creator Notification when viewing */}
                {activeRole === 'Creator' && (
                  <div className="text-xs text-slate-400 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-violet-400" />
                    <span>Waiting for Brand Manager & Legal Review sign-off. Switch roles in top navbar to simulate reviewer actions.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* COLLABORATIVE COMMENT THREAD SECTION */}
          <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Governance Review Thread</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {comments.length} Discussion Notes
              </span>
            </div>

            {/* Comments List */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {comments.map((comm) => (
                <div key={comm.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={comm.avatar}
                        alt={comm.user}
                        className="w-6 h-6 rounded-lg object-cover border border-violet-500/40"
                      />
                      <span className="text-xs font-bold text-white">{comm.user}</span>
                      <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.2 rounded bg-cyan-950/60 border border-cyan-800/40">
                        {comm.role}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{comm.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pl-8">
                    {comm.content}
                  </p>

                  {/* Replies List */}
                  {comm.replies && comm.replies.length > 0 && (
                    <div className="ml-8 mt-2 space-y-2 border-l-2 border-violet-500/30 pl-3">
                      {comm.replies.map((rep) => (
                        <div key={rep.id} className="text-xs space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-200">{rep.user}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({rep.role})</span>
                            <span className="text-[10px] text-slate-500">{rep.timestamp}</span>
                          </div>
                          <p className="text-slate-300">{rep.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Button / Box */}
                  <div className="pl-8 pt-1 flex items-center justify-between">
                    {replyToId === comm.id ? (
                      <div className="w-full flex items-center space-x-2 mt-2">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type reply..."
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-violet-500"
                        />
                        <button
                          onClick={() => {
                            if (replyText.trim()) {
                              addComment(replyText, comm.id);
                              setReplyText('');
                              setReplyToId(null);
                            }
                          }}
                          className="px-3 py-1 rounded-lg bg-violet-600 text-white text-xs font-bold"
                        >
                          Send
                        </button>
                        <button
                          onClick={() => setReplyToId(null)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setReplyToId(comm.id)}
                        className="text-[11px] text-violet-400 hover:text-violet-300 font-semibold"
                      >
                        Reply to thread
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Post New Comment Input */}
            <div className="pt-2 border-t border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newCommentText.trim()) {
                    addComment(newCommentText);
                    setNewCommentText('');
                  }
                }}
                placeholder="Add compliance notes or mention @Aditi, @Khushi, @Sanskrati..."
                className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
              <button
                onClick={() => {
                  if (newCommentText.trim()) {
                    addComment(newCommentText);
                    setNewCommentText('');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-glow-violet cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* APPROVE & PUBLISH MODAL (SECTION 6 REQUIREMENT) */}
      {publishModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#0D1321] border border-cyan-500/40 shadow-2xl p-6 relative animate-scale-up">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Confirm Publication & Generate Audit Hash</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Generates an immutable SHA-256 cryptographic state record of the content, compliance score, and reviewer credentials.
            </p>

            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Document:</span>
                <span className="font-semibold text-white truncate max-w-[240px]">{activeDoc.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Compliance Score:</span>
                <span className="font-mono font-bold text-emerald-400">{complianceScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Resolved Violations:</span>
                <span className="font-mono text-cyan-300">{violations.filter(v => v.status === 'Fixed').length} Resolved</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Approving Officer:</span>
                <span className="font-semibold text-slate-200">{currentUser.name} ({activeRole})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Timestamp:</span>
                <span className="font-mono text-slate-400">{new Date().toLocaleString()}</span>
              </div>
            </div>

            {/* Generated Hash Display when complete */}
            {publishedHashResult && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-1">
                <div className="text-[11px] font-mono font-bold text-emerald-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SHA-256 Audit Hash Generated</span>
                </div>
                <div className="font-mono text-[10px] text-slate-300 break-all bg-black/40 p-2 rounded border border-emerald-900/60">
                  {publishedHashResult}
                </div>
                <div className="text-[10px] text-slate-400">
                  * Stored in enterprise audit trail for tamper detection. Not an external statutory legal certification.
                </div>
              </div>
            )}

            <div className="mt-5 flex justify-end space-x-2 text-xs">
              <button
                onClick={() => {
                  setPublishModalOpen(false);
                  setPublishedHashResult(null);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              >
                Close
              </button>
              {!publishedHashResult && (
                <button
                  onClick={handleConfirmPublish}
                  disabled={isPublishing}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold shadow-glow-cyan"
                >
                  {isPublishing ? 'Hashing Snapshot...' : 'Sign & Publish Campaign'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Request Modifications Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0D1321] border border-rose-500/40 shadow-2xl p-6 relative">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-rose-400" />
              <span>Request Revisions from Creator</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-3">
              Describe the specific brand or legal adjustments required before this campaign can be approved.
            </p>

            <textarea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Please verify third-party benchmark citations for performance claims and check logo contrast..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500 resize-none"
            />

            <div className="mt-4 flex justify-end space-x-2 text-xs">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold"
              >
                Return to Creator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
