import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface Props {
  score: number;
  showBreakdown?: boolean;
}

export function DocumentationScoreGauge({ score, showBreakdown = false }: Props) {
  const normalized = Math.min(Math.max(score || 0, 0), 100);

  const getScoreColor = () => {
    if (normalized >= 80) return 'text-emerald-400 bg-emerald-500';
    if (normalized >= 50) return 'text-amber-400 bg-amber-500';
    return 'text-rose-400 bg-rose-500';
  };

  const getScoreBorder = () => {
    if (normalized >= 80) return 'border-emerald-500/30 bg-emerald-950/20';
    if (normalized >= 50) return 'border-amber-500/30 bg-amber-950/20';
    return 'border-rose-500/30 bg-rose-950/20';
  };

  return (
    <div className={`p-3 rounded-xl border ${getScoreBorder()} transition-all`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Documentation Completeness
          </span>
        </div>
        <span className={`text-sm font-black font-mono ${getScoreColor().split(' ')[0]}`}>
          {normalized}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 rounded-full ${getScoreColor().split(' ')[1]}`}
          style={{ width: `${normalized}%` }}
        />
      </div>

      <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
        <span>Target: 80%+ for automated verification</span>
        <span className="italic flex items-center gap-1">
          <Info className="w-3 h-3 text-slate-400" />
          Internal quality metric
        </span>
      </div>

      {showBreakdown && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-1.5 text-[11px] text-slate-300">
          <div>• Event Report: <span className="font-semibold text-slate-100">20%</span></div>
          <div>• Proof Photos: <span className="font-semibold text-slate-100">15%</span></div>
          <div>• Participant Data: <span className="font-semibold text-slate-100">15%</span></div>
          <div>• Winner Details: <span className="font-semibold text-slate-100">10%</span></div>
          <div>• Certificates: <span className="font-semibold text-slate-100">10%</span></div>
          <div>• Social Outreach: <span className="font-semibold text-slate-100">10%</span></div>
          <div>• Contest Evidence: <span className="font-semibold text-slate-100">10%</span></div>
          <div>• Post Feedback: <span className="font-semibold text-slate-100">10%</span></div>
        </div>
      )}
    </div>
  );
}
