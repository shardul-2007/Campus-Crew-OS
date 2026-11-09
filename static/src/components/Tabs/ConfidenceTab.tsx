import React, { useState } from 'react';
import { ConfidenceScoreBreakdown } from '../../../../src/types/forge';
import {
  ShieldCheck,
  ShieldAlert,
  Flame,
  AlertTriangle,
  BookOpen,
  Users,
  Download,
  CheckCircle2,
  Share2,
  TrendingUp,
  FileCheck2
} from 'lucide-react';

interface ConfidenceTabProps {
  confidence: ConfidenceScoreBreakdown;
  projectKey: string;
}

export const ConfidenceTab: React.FC<ConfidenceTabProps> = ({
  confidence,
  projectKey
}) => {
  const [copied, setCopied] = useState(false);
  const score = confidence.overallScore;
  const factors = confidence.factors;

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'HIGH':
        return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20';
      case 'MODERATE':
        return 'text-amber-400 border-amber-500/40 bg-amber-950/20';
      case 'AT_RISK':
      case 'CRITICAL':
      default:
        return 'text-rose-400 border-rose-500/40 bg-rose-950/20';
    }
  };

  const handleCopyReport = () => {
    const text = `
=== CampusCrew Intelligence — Delivery Confidence Report ===
Project: ${projectKey}
Date: ${new Date().toLocaleDateString()}
Delivery Confidence Index: ${confidence.overallScore}% (${confidence.tier})

Summary:
${confidence.summary}

Core Pillars:
• Sprint Velocity: ${factors.sprintVelocity.score}% (${factors.sprintVelocity.impact})
• Blocker Health: ${factors.blockerHealth.score}% (${factors.blockerHealth.impact})
• Documentation Coverage: ${factors.docCoverage.score}% (${factors.docCoverage.impact})
• Workload Balance: ${factors.workloadBalance.score}% (${factors.workloadBalance.impact})

Key Risks:
${confidence.keyRisks.map(r => `- ${r}`).join('\n')}

Top Recommendations:
${confidence.topRecommendations.map(rec => `- ${rec}`).join('\n')}
    `.trim();

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Main Confidence Gauge & Summary */}
      <div className={`border rounded-2xl p-6 relative overflow-hidden ${getTierColor(confidence.tier)}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-300">
                Release Delivery Health Index
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getTierColor(confidence.tier)}`}>
                {confidence.tier}
              </span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              {score}% Delivery Confidence
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {confidence.summary}
            </p>
          </div>

          {/* Large Gauge Number & Export */}
          <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-mono text-emerald-400">{score}</span>
              <span className="text-slate-400 font-mono text-sm">/ 100</span>
            </div>

            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Report Copied!' : 'Export Summary'}</span>
            </button>
          </div>
        </div>

        {/* Confidence Progress Bar */}
        <div className="w-full bg-slate-900/80 h-3 rounded-full overflow-hidden mt-6 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-full transition-all duration-700"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* 2. Four Delivery Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar 1: Sprint Velocity */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
            <span>Sprint Velocity (30%)</span>
            <Flame className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {factors.sprintVelocity.score}%
          </div>
          <div className="mt-2 text-xs text-slate-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{factors.sprintVelocity.impact}</span>
          </div>
        </div>

        {/* Pillar 2: Blocker Health */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
            <span>Blocker Health (30%)</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black font-mono text-rose-300">
            {factors.blockerHealth.score}%
          </div>
          <div className="mt-2 text-xs text-rose-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            <span>{factors.blockerHealth.impact}</span>
          </div>
        </div>

        {/* Pillar 3: Doc Coverage */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
            <span>Doc Coverage (20%)</span>
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-mono text-cyan-300">
            {factors.docCoverage.score}%
          </div>
          <div className="mt-2 text-xs text-slate-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{factors.docCoverage.impact}</span>
          </div>
        </div>

        {/* Pillar 4: Workload Balance */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
            <span>Workload Balance (20%)</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black font-mono text-purple-300">
            {factors.workloadBalance.score}%
          </div>
          <div className="mt-2 text-xs text-slate-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>{factors.workloadBalance.impact}</span>
          </div>
        </div>
      </div>

      {/* 3. Risks & Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Key Delivery Risks */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Identified Delivery Hazards ({confidence.keyRisks.length})
            </h3>
          </div>

          <div className="space-y-2.5">
            {confidence.keyRisks.map((risk, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2.5">
                <span className="text-amber-400 font-mono font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{risk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tactical Recommendations */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileCheck2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Prioritized Mitigations ({confidence.topRecommendations.length})
            </h3>
          </div>

          <div className="space-y-2.5">
            {confidence.topRecommendations.map((rec, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
