import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useAuth();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto px-4 py-3 border shadow-2xl flex items-center gap-3 font-mono text-xs animate-in slide-in-from-bottom-2 fade-in duration-200 ${
            t.type === 'error'
              ? 'bg-[#1e0a0a] border-red-700 text-red-100'
              : t.type === 'info'
              ? 'bg-[#0a1622] border-[#86c6fe] text-blue-100'
              : 'bg-[#111] border-[#f91f0e] text-white'
          }`}
        >
          {t.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
          {t.type === 'info' && <Info className="w-4 h-4 text-[#86c6fe] shrink-0" />}
          {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#f91f0e] shrink-0" />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};
