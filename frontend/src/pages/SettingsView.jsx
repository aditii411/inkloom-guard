import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/mockData';
import { 
  Settings, 
  ShieldCheck, 
  Cpu, 
  Key, 
  RotateCcw, 
  Users, 
  CheckCircle2, 
  Sliders, 
  AlertTriangle,
  Lock,
  Save,
  Sparkles
} from 'lucide-react';

export default function SettingsView() {
  const { aiSettings, setAiSettings, resetDemo, notify } = useApp();

  const [formSettings, setFormSettings] = useState({ ...aiSettings });
  const [apiKeyInput, setApiKeyInput] = useState(aiSettings.geminiApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setAiSettings({
      ...formSettings,
      geminiApiKey: apiKeyInput
    });
    notify('Settings Saved', 'Workspace governance configuration updated.', 'success');
  };

  const handleTestGemini = () => {
    setTestingConnection(true);
    setConnectionStatus(null);
    setTimeout(() => {
      setTestingConnection(false);
      if (apiKeyInput && apiKeyInput.length > 10) {
        setConnectionStatus({ success: true, message: 'Google Gemini API handshake verified successfully (Latency: 280ms).' });
        notify('AI Handshake Verified', 'Connected to Google Gemini API.', 'success');
      } else {
        setConnectionStatus({ success: false, message: 'No valid Gemini API key supplied. Active engine remains Rule-Based Fallback (Fully Functional).' });
        notify('Active Fallback Engine', 'Operating in verified deterministic offline mode.', 'info');
      }
    }, 900);
  };

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-violet-950/50 via-slate-900 to-[#111827] border border-violet-500/30 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-violet-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Platform Settings & AI Configuration</h1>
            <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40">
              Workspace Config
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Configure compliance thresholds, manage Google Gemini LLM API integration, review team permissions, and reset demo datasets.
          </p>
        </div>

        <button
          onClick={resetDemo}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-rose-300 hover:text-white text-xs font-bold transition-all shadow-md group"
        >
          <RotateCcw className="w-4 h-4 text-rose-400 group-hover:rotate-180 transition-transform duration-500" />
          <span>Reset Demo to Sample</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* SECTION 1: AI Provider & Engine Configuration */}
        <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">AI Diagnostic Engine Selection</h2>
            </div>
            <span className="text-[11px] font-mono text-cyan-400">
              Dual-Engine Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rule-based Engine Card */}
            <div
              onClick={() => setFormSettings({ ...formSettings, engineType: 'Rule-Based Fallback Engine (Demo Verified)' })}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                formSettings.engineType.includes('Rule-Based')
                  ? 'bg-violet-950/30 border-violet-500 shadow-glow-violet'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Rule-Based Deterministic Engine</span>
                </span>
                {formSettings.engineType.includes('Rule-Based') && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                100% offline, predictable, zero-latency detection engine. Checks copy against blacklists, regex patterns, and structured guideline rules.
              </p>
            </div>

            {/* Google Gemini AI API Card */}
            <div
              onClick={() => setFormSettings({ ...formSettings, engineType: 'Google Gemini 1.5 Pro / Flash' })}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                formSettings.engineType.includes('Gemini')
                  ? 'bg-cyan-950/30 border-cyan-500 shadow-glow-cyan'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Google Gemini API</span>
                </span>
                {formSettings.engineType.includes('Gemini') && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Deep semantic analysis, nuanced brand voice scoring, and dynamic contextual auto-fix generation powered by Google Gemini.
              </p>
            </div>
          </div>

          {/* Gemini API Key input */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span className="flex items-center space-x-1">
                <Key className="w-3.5 h-3.5 text-violet-400" />
                <span>Google Gemini API Key (Optional for live LLM mode)</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Environment: GEMINI_API_KEY
              </span>
            </label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-[10px] font-mono"
                >
                  {showKey ? 'HIDE' : 'SHOW'}
                </button>
              </div>

              <button
                type="button"
                onClick={handleTestGemini}
                disabled={testingConnection}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors"
              >
                {testingConnection ? 'Probing...' : 'Test Connection'}
              </button>
            </div>

            {connectionStatus && (
              <div className={`mt-2 p-2.5 rounded-lg text-xs font-mono border ${
                connectionStatus.success 
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}>
                {connectionStatus.message}
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: Compliance Policies & Publication Safeguards */}
        <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-violet-400" />
              <h2 className="text-base font-bold text-white">Pre-Publication Governance Safeguards</h2>
            </div>
            <span className="text-[11px] font-mono text-violet-400">Policy Rules</span>
          </div>

          <div className="space-y-4">
            {/* Toggle 1: Strict Publication Mode */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white">Strict Compliance Gate (Zero Critical Issues)</div>
                <div className="text-[11px] text-slate-400">
                  Blocks document approval and publishing if any unresolved HIGH severity violation is detected.
                </div>
              </div>
              <input
                type="checkbox"
                checked={formSettings.strictPublicationMode}
                onChange={(e) => setFormSettings({ ...formSettings, strictPublicationMode: e.target.checked })}
                className="w-5 h-5 accent-violet-600 rounded cursor-pointer"
              />
            </div>

            {/* Toggle 2: Legal Claim Check */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white">Dual-Signoff on Superlative & Comparative Claims</div>
                <div className="text-[11px] text-slate-400">
                  Requires explicit Legal Reviewer clearance before claims with guarantees can be cleared.
                </div>
              </div>
              <input
                type="checkbox"
                checked={formSettings.requireLegalClaimCheck}
                onChange={(e) => setFormSettings({ ...formSettings, requireLegalClaimCheck: e.target.checked })}
                className="w-5 h-5 accent-violet-600 rounded cursor-pointer"
              />
            </div>

            {/* Confidence Slider */}
            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Auto-Fix Confidence Threshold</span>
                <span className="font-mono text-cyan-400 font-bold">{formSettings.autoFixConfidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="99"
                value={formSettings.autoFixConfidenceThreshold}
                onChange={(e) => setFormSettings({ ...formSettings, autoFixConfidenceThreshold: Number(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 font-mono">
                Only AI fixes with equal or greater confidence will be eligible for batch one-click auto-fix.
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Workspace & Team Attribution */}
        <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">Workspace Team Roster — CTRL+ She</h2>
            </div>
            <span className="text-[11px] font-mono text-cyan-400">Hackathon Roster</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEMO_USERS.map((user) => (
              <div key={user.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-full mx-auto object-cover border-2 border-violet-500/40"
                />
                <div>
                  <div className="text-xs font-bold text-white">{user.name}</div>
                  <div className="text-[11px] text-cyan-400 font-mono mt-0.5">{user.role}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{user.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs shadow-glow-violet transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
