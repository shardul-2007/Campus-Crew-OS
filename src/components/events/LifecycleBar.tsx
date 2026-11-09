'use client';

import React from 'react';
import { LifecycleStage } from '@/types/database';
import { Check, Dot } from 'lucide-react';

interface Props {
  currentStage: LifecycleStage;
  onSelectStage?: (stage: LifecycleStage) => void;
  interactive?: boolean;
}

const ORDERED_STAGES: { stage: LifecycleStage; label: string; desc: string }[] = [
  { stage: 'IDEA', label: 'IDEA', desc: 'Concept, format, problem definition' },
  { stage: 'PLAN', label: 'PLAN', desc: 'Proposal submission, dates, approval' },
  { stage: 'BUILD', label: 'BUILD', desc: 'Platform configuration on HRW/HRC' },
  { stage: 'TEST', label: 'TEST', desc: 'Question validation & test case verification' },
  { stage: 'PROMOTE', label: 'PROMOTE', desc: 'T-14 to T-1 promotion schedule' },
  { stage: 'EXECUTE', label: 'EXECUTE', desc: 'Live event monitoring & problem support' },
  { stage: 'EVALUATE', label: 'EVALUATE', desc: 'Leaderboard checks, participants' },
  { stage: 'REWARD', label: 'REWARD', desc: 'Verify winners, submit rewards' },
  { stage: 'DOCUMENT', label: 'DOCUMENT', desc: 'Upload proof, certificates, event report' },
  { stage: 'IMPROVE', label: 'IMPROVE', desc: 'Post-event retrospective & learnings' },
];

export function LifecycleBar({ currentStage, onSelectStage, interactive = false }: Props) {
  const currentIndex = ORDERED_STAGES.findIndex((s) => s.stage === currentStage);

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 md:p-4 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Handbook Operational Lifecycle
        </span>
        <span className="text-xs font-mono font-medium text-emerald-400">
          Stage {currentIndex + 1} of 10 : <strong className="text-white">{currentStage}</strong>
        </span>
      </div>

      {/* Responsive Lifecycle Sequence */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5 md:gap-2">
        {ORDERED_STAGES.map((st, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isUpcoming = idx > currentIndex;

          return (
            <button
              key={st.stage}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onSelectStage?.(st.stage)}
              title={`${st.stage}: ${st.desc}`}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all ${
                isDone
                  ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300 hover:border-emerald-700'
                  : isCurrent
                  ? 'bg-emerald-500 text-black border-emerald-400 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/50 scale-[1.03] z-10'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
              } ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="flex items-center justify-center w-5 h-5 mb-1 rounded-full text-[10px] font-bold">
                {isDone ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : isCurrent ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
                ) : (
                  <span className="text-[10px] opacity-60">{idx + 1}</span>
                )}
              </div>
              <span
                className={`text-[11px] font-bold tracking-tight uppercase ${
                  isCurrent ? 'text-black' : isDone ? 'text-emerald-300' : 'text-slate-400'
                }`}
              >
                {st.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
