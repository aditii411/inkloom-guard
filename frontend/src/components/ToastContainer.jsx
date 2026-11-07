import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderClass = 'border-violet-500/40';
        let bgGlow = 'rgba(139, 92, 246, 0.15)';
        let Icon = Info;
        let iconColor = 'text-violet-400';

        if (toast.type === 'success') {
          borderClass = 'border-emerald-500/50';
          bgGlow = 'rgba(16, 185, 129, 0.15)';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-400';
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-500/50';
          bgGlow = 'rgba(245, 158, 11, 0.15)';
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
        } else if (toast.type === 'error') {
          borderClass = 'border-rose-500/60';
          bgGlow = 'rgba(244, 63, 94, 0.15)';
          Icon = AlertCircle;
          iconColor = 'text-rose-400';
        }

        return (
          <div
            key={toast.id}
            style={{ background: `linear-gradient(135deg, rgba(17, 24, 39, 0.95), ${bgGlow})` }}
            className={`pointer-events-auto backdrop-blur-md rounded-xl p-4 shadow-xl border ${borderClass} flex items-start space-x-3 transition-all duration-300 transform translate-y-0 opacity-100 animate-slide-in`}
          >
            <div className={`p-1.5 rounded-lg bg-black/30 ${iconColor} mt-0.5`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white tracking-wide">{toast.title}</h4>
                <span className="text-[10px] text-slate-400">{toast.time}</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
