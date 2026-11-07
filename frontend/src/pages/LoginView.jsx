import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/mockData';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Briefcase, 
  UserCheck, 
  ArrowRight,
  CheckCircle2,
  Building
} from 'lucide-react';

export default function LoginView() {
  const navigate = useNavigate();
  const { switchUser, notify } = useApp();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Registration state
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [workspaceName, setWorkspaceName] = useState('CTRL+ She Workspace');

  const handleStandardLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      notify('Missing Credentials', 'Please enter both email and password.', 'error');
      return;
    }
    // Match against demo users or default to Creator
    const matched = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || DEMO_USERS[0];
    switchUser(matched.id);
    notify('Welcome Back', `Logged in as ${matched.name} (${matched.role})`, 'success');
    navigate('/');
  };

  const handleQuickDemoLogin = (userId) => {
    switchUser(userId);
    const selected = DEMO_USERS.find(u => u.id === userId);
    notify('Demo Session Initialized', `Authenticated as ${selected.name} (${selected.role})`, 'success');
    navigate('/');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      notify('Missing Fields', 'Please fill in all required registration fields.', 'error');
      return;
    }
    if (password !== confirmPassword) {
      notify('Password Mismatch', 'Passwords do not match.', 'error');
      return;
    }
    notify('Account Registered', `Created profile for ${fullName} in ${workspaceName}.`, 'success');
    switchUser('user-1');
    navigate('/');
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-6 bg-[#0B0F19] text-[#F8FAFC] relative overflow-hidden select-none">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[2px] shadow-glow-violet mb-2">
            <div className="w-full h-full bg-[#0D1321] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Inkloom <span className="text-violet-400">Guard</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            AI-Powered Brand Governance & Pre-Publication Compliance
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl bg-[#111827]/90 backdrop-blur-xl border border-slate-800 shadow-2xl p-6 space-y-5">
          {/* Tabs */}
          <div className="flex border-b border-slate-800 pb-2 text-xs">
            <button
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-1.5 text-center font-bold transition-colors ${
                !isRegister ? 'text-white border-b-2 border-violet-500' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-1.5 text-center font-bold transition-colors ${
                isRegister ? 'text-white border-b-2 border-violet-500' : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {!isRegister ? (
            /* Sign In Form */
            <form onSubmit={handleStandardLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aditi@ctrlshe.org"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-9 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <label className="flex items-center space-x-1.5 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 accent-violet-600 rounded"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); notify('Password Reset', 'Demo mode: Please use 1-click login below.', 'info'); }} className="text-violet-400 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold shadow-glow-violet transition-all"
              >
                Sign In to Workspace
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Khushi Chouhan"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="khushi@ctrlshe.org"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Workspace Organization</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Confirm</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-glow-cyan transition-all"
              >
                Create Workspace Account
              </button>
            </form>
          )}

          {/* 1-CLICK DEMO LOGIN BUTTONS (HACKATHON JUDGING REQUIREMENT) */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider text-center">
              1-Click Demo Personas (Instant Access)
            </div>

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('user-1')}
                className="w-full p-2 rounded-xl bg-violet-950/30 hover:bg-violet-900/40 border border-violet-500/30 text-left flex items-center justify-between text-xs transition-colors group"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-violet-500/20 text-violet-400">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:text-violet-300">Creator Persona</div>
                    <div className="text-[10px] text-slate-400">Aditi Choudhary (Author & Fix)</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-violet-400 transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('user-2')}
                className="w-full p-2 rounded-xl bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-500/30 text-left flex items-center justify-between text-xs transition-colors group"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:text-cyan-300">Brand Manager Persona</div>
                    <div className="text-[10px] text-slate-400">Khushi Chouhan (Governance Approval)</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('user-3')}
                className="w-full p-2 rounded-xl bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/30 text-left flex items-center justify-between text-xs transition-colors group"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:text-rose-300">Legal Reviewer Persona</div>
                    <div className="text-[10px] text-slate-400">Sanskrati Yadav / Shruti Jadon (Claims Lock)</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-rose-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer / Attribution */}
        <div className="text-center text-[11px] text-slate-400">
          Demo sandbox authentication • Team CTRL+ She (National Hackathon 2026)
        </div>
      </div>
    </div>
  );
}
