import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DEMO_USERS, 
  INITIAL_GUIDELINES, 
  INITIAL_DOCUMENT, 
  INITIAL_VIOLATIONS, 
  INITIAL_AUDIT_TRAIL, 
  INITIAL_COMMENTS, 
  ANALYTICS_DATA, 
  PIPELINE_DOCUMENTS 
} from '../data/mockData';
import { generateSHA256Hash } from '../utils/crypto';

const AppContext = createContext();

export function AppProvider({ children }) {
  // --- User & Role State ---
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('inkloom_user');
    return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Default: Aditi (Creator)
  });

  const [activeRole, setActiveRole] = useState(() => currentUser.role);

  // --- Document & Audit State ---
  const [document, setDocument] = useState(() => {
    const saved = localStorage.getItem('inkloom_doc');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENT;
  });

  const [violations, setViolations] = useState(() => {
    const saved = localStorage.getItem('inkloom_violations');
    return saved ? JSON.parse(saved) : INITIAL_VIOLATIONS;
  });

  const [historyStack, setHistoryStack] = useState([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [scanStage, setScanStage] = useState('');
  const [activeTabViolationFilter, setActiveTabViolationFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [highlightedViolationId, setHighlightedViolationId] = useState(null);

  // --- Guidelines State ---
  const [guidelines, setGuidelines] = useState(() => {
    const saved = localStorage.getItem('inkloom_guidelines');
    return saved ? JSON.parse(saved) : INITIAL_GUIDELINES;
  });

  // --- Approval Center & Pipeline State ---
  const [pipeline, setPipeline] = useState(() => {
    const saved = localStorage.getItem('inkloom_pipeline');
    return saved ? JSON.parse(saved) : PIPELINE_DOCUMENTS;
  });

  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('inkloom_comments');
    return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
  });

  // --- Audit Trail State ---
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('inkloom_audit_trail');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_TRAIL;
  });

  // --- Toast Notifications ---
  const [toasts, setToasts] = useState([]);

  // --- Settings & AI Config ---
  const [aiSettings, setAiSettings] = useState({
    engineType: 'Rule-Based Fallback Engine (Demo Verified)',
    geminiApiKey: '',
    strictPublicationMode: true,
    requireLegalClaimCheck: true,
    autoFixConfidenceThreshold: 85
  });

  // Persist State
  useEffect(() => {
    localStorage.setItem('inkloom_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('inkloom_doc', JSON.stringify(document));
  }, [document]);

  useEffect(() => {
    localStorage.setItem('inkloom_violations', JSON.stringify(violations));
  }, [violations]);

  useEffect(() => {
    localStorage.setItem('inkloom_guidelines', JSON.stringify(guidelines));
  }, [guidelines]);

  useEffect(() => {
    localStorage.setItem('inkloom_pipeline', JSON.stringify(pipeline));
  }, [pipeline]);

  useEffect(() => {
    localStorage.setItem('inkloom_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('inkloom_audit_trail', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Toast Dispatcher
  const notify = (title, message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    const newToast = { id, title, message, type, time: new Date().toLocaleTimeString() };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Switch User & Role
  const switchUser = (userId) => {
    const selected = DEMO_USERS.find((u) => u.id === userId) || DEMO_USERS[0];
    setCurrentUser(selected);
    setActiveRole(selected.role);
    notify('Role Switched', `Active persona: ${selected.name} (${selected.role})`, 'info');
  };

  const switchRoleDirectly = (roleName) => {
    const match = DEMO_USERS.find((u) => u.role === roleName) || {
      id: `custom-${Date.now()}`,
      name: `${roleName} User`,
      email: `${roleName.toLowerCase().replace(/\s+/g, '')}@ctrlshe.org`,
      role: roleName,
      avatar: DEMO_USERS[0].avatar,
      title: `${roleName} Specialist`
    };
    setCurrentUser(match);
    setActiveRole(roleName);
    notify('Role Permission Updated', `Permissions adapted for ${roleName}`, 'info');
  };

  // Role Permissions
  const permissions = {
    role: activeRole,
    canEditDocument: activeRole === 'Creator',
    canRunAudit: true, // Everyone can inspect
    canApplyFix: activeRole === 'Creator',
    canSubmitForReview: activeRole === 'Creator',
    canBrandApprove: activeRole === 'Brand Manager',
    canBrandReject: activeRole === 'Brand Manager',
    canLegalLock: activeRole === 'Legal Compliance Reviewer',
    canLegalClear: activeRole === 'Legal Compliance Reviewer',
    canPublish: activeRole === 'Brand Manager' || activeRole === 'Legal Compliance Reviewer',
    canManageGuidelines: activeRole === 'Brand Manager' || activeRole === 'Legal Compliance Reviewer'
  };

  // Compute Dynamic Compliance Score
  // Calculation: Start with 100%, deduct based on open issues (High = 15%, Medium = 8%, Low = 4%)
  const calculateComplianceScore = (currentViolations) => {
    let deduction = 0;
    const openViolations = currentViolations.filter((v) => v.status === 'Open' || v.status === 'Locked');
    openViolations.forEach((v) => {
      if (v.severity === 'HIGH') deduction += 15;
      else if (v.severity === 'MEDIUM') deduction += 8;
      else deduction += 4;
    });
    const calculated = Math.max(10, 100 - deduction);
    return calculated;
  };

  const complianceScore = calculateComplianceScore(violations);

  // Append to Audit Trail helper
  const addAuditLog = async (action, previousState, updatedState, docName = document.title) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const rawData = `${docName}-${currentUser.name}-${action}-${timestamp}-${complianceScore}`;
    const hash = await generateSHA256Hash(rawData);

    const logEntry = {
      id: `audit-${Date.now()}`,
      documentId: document.id,
      documentName: docName,
      user: currentUser.name,
      role: activeRole,
      action,
      previousState,
      updatedState,
      complianceScore,
      timestamp,
      auditHash: hash
    };

    setAuditLogs((prev) => [logEntry, ...prev]);
  };

  // Run AI Audit with animation sequence
  const runAiAudit = async () => {
    setIsAuditing(true);
    setScanStage('Tokenizing document copy and extracting brand entities...');
    
    await new Promise((r) => setTimeout(r, 700));
    setScanStage('Retrieving authoritative policies from Brand Guidelines Vault (RAG)...');
    
    await new Promise((r) => setTimeout(r, 800));
    setScanStage('Evaluating factual claims against substantiation requirements...');
    
    await new Promise((r) => setTimeout(r, 700));
    setScanStage('Scanning visual metadata tokens and WCAG 2.1 AA accessibility...');
    
    await new Promise((r) => setTimeout(r, 600));

    // Analyze current document content
    const content = document.content;
    const updated = violations.map((v) => {
      // Check if text is still present in content
      const isPresent = content.includes(v.detectedText);
      return {
        ...v,
        status: isPresent ? (v.status === 'Fixed' ? 'Open' : v.status) : 'Fixed'
      };
    });

    setViolations(updated);
    setIsAuditing(false);
    setScanStage('');

    const newScore = calculateComplianceScore(updated);
    notify('AI Audit Completed', `Audit finished. Calculated Compliance Score: ${newScore}%`, 'success');
    addAuditLog('Audit Run', 'Pre-Scan State', `Score: ${newScore}% (${updated.filter(v => v.status === 'Open').length} Issues)`);
  };

  // Apply Single Auto-Fix
  const applyAutoFix = async (violationId) => {
    const violation = violations.find((v) => v.id === violationId);
    if (!violation) return;

    if (violation.status === 'Locked' && activeRole !== 'Legal Compliance Reviewer') {
      notify('Action Blocked', 'This claim has been legally locked. Only Legal Reviewers can modify it.', 'error');
      return;
    }

    // Save history for undo
    setHistoryStack((prev) => [
      {
        content: document.content,
        violations: JSON.parse(JSON.stringify(violations)),
        fixedId: violationId
      },
      ...prev
    ]);

    const oldText = violation.detectedText;
    const newText = violation.suggestedFix;

    // Replace in document content
    const updatedContent = document.content.replace(oldText, newText);

    // Update violation status
    const updatedViolations = violations.map((v) =>
      v.id === violationId ? { ...v, status: 'Fixed' } : v
    );

    setDocument((prev) => ({ ...prev, content: updatedContent, updatedAt: 'Just now' }));
    setViolations(updatedViolations);

    const newScore = calculateComplianceScore(updatedViolations);
    notify('Auto-Fix Applied', `Replaced "${oldText}" with "${newText}". Score: ${newScore}%`, 'success');
    addAuditLog(`Auto-Fix: ${violation.category}`, `Detected: "${oldText}"`, `Fixed: "${newText}"`);
  };

  // Apply All Suggested Fixes
  const applyAllFixes = async () => {
    // Save history
    setHistoryStack((prev) => [
      {
        content: document.content,
        violations: JSON.parse(JSON.stringify(violations)),
        fixedId: 'ALL'
      },
      ...prev
    ]);

    let currentContent = document.content;
    const updatedViolations = violations.map((v) => {
      if (v.status === 'Open') {
        currentContent = currentContent.replace(v.detectedText, v.suggestedFix);
        return { ...v, status: 'Fixed' };
      }
      return v;
    });

    setDocument((prev) => ({ ...prev, content: currentContent, updatedAt: 'Just now' }));
    setViolations(updatedViolations);

    notify('Batch Auto-Fix Executed', 'All open brand guideline violations have been automatically corrected!', 'success');
    addAuditLog('Batch Auto-Fix', 'Multiple Open Violations', 'All Open Violations Fixed (100% Compliance)');
  };

  // Undo Last Fix
  const undoLastFix = () => {
    if (historyStack.length === 0) {
      notify('Nothing to Undo', 'No previous fix operations in history stack.', 'info');
      return;
    }

    const lastState = historyStack[0];
    setHistoryStack((prev) => prev.slice(1));
    setDocument((prev) => ({ ...prev, content: lastState.content, updatedAt: 'Just now' }));
    setViolations(lastState.violations);

    notify('Fix Undone', 'Reverted document content to previous state.', 'info');
    addAuditLog('Undo Auto-Fix', 'Fixed State', 'Previous Content Restored');
  };

  // Ignore Issue
  const ignoreIssue = (violationId) => {
    setViolations((prev) =>
      prev.map((v) => (v.id === violationId ? { ...v, status: 'Ignored' } : v))
    );
    notify('Issue Ignored', 'Violation marked as reviewed and ignored.', 'info');
    addAuditLog('Issue Ignored', 'Open', 'Ignored');
  };

  // Lock Claim (Legal Role Only)
  const lockClaim = (violationId) => {
    if (activeRole !== 'Legal Compliance Reviewer') {
      notify('Permission Denied', 'Only Legal Compliance Reviewers can lock or unlock claims.', 'error');
      return;
    }

    setViolations((prev) =>
      prev.map((v) => {
        if (v.id === violationId) {
          const isCurrentlyLocked = v.status === 'Locked';
          const nextStatus = isCurrentlyLocked ? 'Open' : 'Locked';
          notify(
            isCurrentlyLocked ? 'Claim Unlocked' : 'Claim Legally Locked',
            isCurrentlyLocked
              ? 'Legal hold removed. Claim can now be modified.'
              : 'Claim locked. Requires verified third-party empirical evidence before clearing.',
            isCurrentlyLocked ? 'info' : 'warning'
          );
          return { ...v, status: nextStatus };
        }
        return v;
      })
    );
    addAuditLog('Claim Legally Modified', 'Open', 'Legally Locked');
  };

  // Update Manual Text in Editor
  const updateContent = (newText) => {
    setDocument((prev) => ({ ...prev, content: newText, updatedAt: 'Just now' }));
  };

  // Reset to initial intentional demo state
  const resetDemo = () => {
    setDocument(INITIAL_DOCUMENT);
    setViolations(INITIAL_VIOLATIONS);
    setGuidelines(INITIAL_GUIDELINES);
    setPipeline(PIPELINE_DOCUMENTS);
    setComments(INITIAL_COMMENTS);
    setAuditLogs(INITIAL_AUDIT_TRAIL);
    setHistoryStack([]);
    setCurrentUser(DEMO_USERS[0]);
    setActiveRole('Creator');
    localStorage.clear();
    notify('Demo Data Reset', 'Platform restored to initial hackathon sample state with 8 active violations.', 'success');
  };

  // Approval Pipeline Actions
  const submitDocumentForReview = (docId) => {
    // Check if unresolved high severity issues exist
    const unresolvedHigh = violations.filter(
      (v) => (v.status === 'Open' || v.status === 'Locked') && v.severity === 'HIGH'
    );

    setDocument((prev) => ({ ...prev, status: 'In Review' }));
    setPipeline((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, stage: 'In Review', lastUpdated: 'Just now' } : d))
    );

    if (unresolvedHigh.length > 0) {
      notify('Submitted with Compliance Warnings', `Document submitted for review with ${unresolvedHigh.length} unresolved high-risk violations.`, 'warning');
    } else {
      notify('Submitted for Review', 'Document passed pre-flight checks and submitted to Brand Manager & Legal.', 'success');
    }
    addAuditLog('Approval Requested', 'Draft', 'In Review');
  };

  const approveDocument = (docId) => {
    if (!permissions.canBrandApprove) {
      notify('Access Denied', 'Only Brand Managers have authorization to grant brand approval.', 'error');
      return;
    }

    setDocument((prev) => ({ ...prev, status: 'Approved' }));
    setPipeline((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, stage: 'Approved', lastUpdated: 'Just now' } : d))
    );

    notify('Brand Approval Granted', 'Document approved by Brand Governance. Ready for publication.', 'success');
    addAuditLog('Document Approved', 'In Review', 'Approved');
  };

  const requestChanges = (docId, feedback) => {
    setDocument((prev) => ({ ...prev, status: 'Changes Requested' }));
    setPipeline((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, stage: 'Draft', lastUpdated: 'Just now' } : d))
    );

    if (feedback) {
      const newComment = {
        id: `comm-${Date.now()}`,
        documentId: docId,
        user: currentUser.name,
        role: activeRole,
        avatar: currentUser.avatar,
        timestamp: 'Just now',
        content: `Changes Requested: ${feedback}`,
        replies: []
      };
      setComments((prev) => [newComment, ...prev]);
    }

    notify('Changes Requested', 'Document returned to Creator with requested revisions.', 'info');
    addAuditLog('Revisions Requested', 'In Review', 'Changes Requested');
  };

  const publishDocument = async (docId, approverNotes = '') => {
    // Cryptographic audit snapshot
    const timestamp = new Date().toISOString();
    const rawAuditPayload = JSON.stringify({
      documentId: docId,
      title: document.title,
      content: document.content,
      complianceScore,
      publishedBy: currentUser.name,
      role: activeRole,
      timestamp,
      notes: approverNotes
    });

    const publishedHash = await generateSHA256Hash(rawAuditPayload);

    setDocument((prev) => ({ ...prev, status: 'Published' }));
    setPipeline((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, stage: 'Published', lastUpdated: 'Just now' } : d))
    );

    addAuditLog('Document Published', 'Approved', 'Published', document.title);
    notify('Document Published!', `Integrity snapshot generated: ${publishedHash.substring(0, 16)}...`, 'success');

    return publishedHash;
  };

  // Add Comment to thread
  const addComment = (content, parentCommentId = null) => {
    if (!content.trim()) return;

    if (parentCommentId) {
      setComments((prev) =>
        prev.map((c) => {
          if (c.id === parentCommentId) {
            return {
              ...c,
              replies: [
                ...c.replies,
                {
                  id: `reply-${Date.now()}`,
                  user: currentUser.name,
                  role: activeRole,
                  avatar: currentUser.avatar,
                  timestamp: 'Just now',
                  content
                }
              ]
            };
          }
          return c;
        })
      );
    } else {
      const newComment = {
        id: `comm-${Date.now()}`,
        documentId: document.id,
        user: currentUser.name,
        role: activeRole,
        avatar: currentUser.avatar,
        timestamp: 'Just now',
        content,
        replies: []
      };
      setComments((prev) => [newComment, ...prev]);
    }

    notify('Comment Posted', 'Your message was added to the collaboration thread.', 'info');
  };

  // Guidelines Management
  const addGuideline = (newRule) => {
    const id = `rule-${String(guidelines.length + 1).padStart(2, '0')}`;
    const entry = {
      ...newRule,
      id,
      lastUpdated: new Date().toISOString().substring(0, 10),
      status: 'Active'
    };
    setGuidelines((prev) => [entry, ...prev]);
    notify('Guideline Created', `Added ${entry.title} to Brand Guidelines Vault.`, 'success');
    addAuditLog('Guideline Added', 'None', entry.title);
  };

  const updateGuideline = (updated) => {
    setGuidelines((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
    notify('Guideline Updated', `Saved modifications for ${updated.title}.`, 'info');
    addAuditLog('Guideline Updated', 'Active', updated.title);
  };

  const deleteGuideline = (id) => {
    const target = guidelines.find((g) => g.id === id);
    setGuidelines((prev) => prev.filter((g) => g.id !== id));
    notify('Guideline Removed', `Deleted ${target?.title || id}.`, 'info');
    addAuditLog('Guideline Deleted', target?.title || id, 'Removed');
  };

  const toggleGuidelineStatus = (id) => {
    setGuidelines((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const next = g.status === 'Active' ? 'Inactive' : 'Active';
          notify('Guideline Status Changed', `${g.title} is now ${next}.`, 'info');
          return { ...g, status: next };
        }
        return g;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        activeRole,
        switchUser,
        switchRoleDirectly,
        permissions,
        document,
        setDocument,
        updateContent,
        violations,
        setViolations,
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
        activeTabViolationFilter,
        setActiveTabViolationFilter,
        severityFilter,
        setSeverityFilter,
        highlightedViolationId,
        setHighlightedViolationId,
        guidelines,
        addGuideline,
        updateGuideline,
        deleteGuideline,
        toggleGuidelineStatus,
        pipeline,
        submitDocumentForReview,
        approveDocument,
        requestChanges,
        publishDocument,
        comments,
        addComment,
        auditLogs,
        addAuditLog,
        toasts,
        notify,
        removeToast,
        aiSettings,
        setAiSettings,
        resetDemo
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
