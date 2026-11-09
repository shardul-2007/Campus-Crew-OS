import React from 'react';
import {
  Layers,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FolderGit2
} from 'lucide-react';
import { ConfidenceScoreBreakdown } from '../../../src/types/forge';
import { isInsideForge } from '../lib/bridge';

interface HeaderProps {
  projectKey: string;
  onProjectChange: (key: string) => void;
  confidence?: ConfidenceScoreBreakdown;
  isLoading: boolean;
  onRefresh: () => void;
  lastSyncedAt?: string;
}

export const Header: React.FC<HeaderProps> = ({
  projectKey,
  onProjectChange,
  confidence,
  isLoading,
  onRefresh,
  lastSyncedAt
}) => {
  const isForge = isInsideForge();

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case 'HIGH':
        return 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400';
      case 'MODERATE':
        return 'border-amber-500/40 bg-amber-950/40 text-amber-400';
      case 'AT_RISK':
      case 'CRITICAL':
      default:
        return 'border-rose-500/40 bg-rose-950/40 text-rose-400';
    }
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Project Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-emerald-500/20">
            <Layers className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-tight">CampusCrew Intelligence</span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider bg-emerald-950/80 border border-emerald-600/60 text-emerald-400 px-2 py-0.5 rounded-full">
                Codegeist 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              AI-Powered Engineering Operations Hub • Jira Cloud, Confluence & Rovo Agent
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Project Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
            <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">Project:</span>
            <select
              value={projectKey}
              onChange={(e) => onProjectChange(e.target.value)}
              className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="ENG" className="bg-slate-900 text-slate-100">ENG (Engineering)</option>
              <option value="CORE" className="bg-slate-900 text-slate-100">CORE (Platform Core)</option>
              <option value="BILLING" className="bg-slate-900 text-slate-100">BILLING (Payments & Subscriptions)</option>
            </select>
          </div>

          {/* Environment Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/50 text-xs text-slate-400">
            <div className={`w-2 h-2 rounded-full ${isForge ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-400'}`} />
            <span>{isForge ? 'Forge Cloud' : 'Dev Bridge (Live API Ready)'}</span>
          </div>

          {/* Delivery Confidence Score Pill */}
          {confidence && (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold ${getTierColor(confidence.tier)}`}>
              <ShieldCheck className="w-4 h-4" />
              <span>Confidence: {confidence.overallScore}%</span>
              <span className="text-[10px] opacity-80 uppercase">({confidence.tier})</span>
            </div>
          )}

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium transition-colors disabled:opacity-50"
            title="Sync live telemetry from Jira & Confluence"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Sync</span>
          </button>
        </div>
      </div>
    </header>
  );
};
