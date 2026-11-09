import React, { useState } from 'react';
import {
  EngineeringOverviewPayload,
  JiraIssue,
  IssueStatusCategory
} from '../../../../src/types/forge';
import {
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Users,
  Flame,
  ArrowUpRight,
  Filter,
  Layers,
  ChevronRight,
  ShieldAlert,
  Zap
} from 'lucide-react';

interface CommandCenterTabProps {
  overview: EngineeringOverviewPayload;
  onSelectIssue?: (issue: JiraIssue) => void;
}

export const CommandCenterTab: React.FC<CommandCenterTabProps> = ({
  overview,
  onSelectIssue
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const sprint = overview.activeSprint;
  const issues = overview.issues || [];
  const blockers = overview.blockers || [];

  const filteredIssues = issues.filter(issue => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'BLOCKED') return issue.isBlocked || issue.statusCategory === 'Blocked';
    return issue.statusCategory === statusFilter;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Highest':
        return 'bg-rose-950/80 border-rose-700/80 text-rose-400';
      case 'High':
        return 'bg-amber-950/80 border-amber-700/80 text-amber-400';
      case 'Medium':
        return 'bg-blue-950/80 border-blue-700/80 text-blue-400';
      default:
        return 'bg-slate-900 border-slate-700 text-slate-400';
    }
  };

  const getStatusBadge = (category: IssueStatusCategory, isBlocked: boolean) => {
    if (isBlocked || category === 'Blocked') {
      return 'bg-rose-500/20 border-rose-500/40 text-rose-300';
    }
    switch (category) {
      case 'In Progress':
        return 'bg-amber-500/20 border-amber-500/40 text-amber-300';
      case 'In Review':
        return 'bg-purple-500/20 border-purple-500/40 text-purple-300';
      case 'Done':
        return 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Active Sprint Telemetry Card */}
      {sprint && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Active Sprint
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {sprint.daysRemaining} days remaining
                </span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">{sprint.name}</h2>
              {sprint.goal && (
                <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                  <span className="text-slate-300 font-medium">Sprint Goal:</span> {sprint.goal}
                </p>
              )}
            </div>

            {/* Velocity & Story Points Gauges */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Velocity Pacing</div>
                <div className="text-2xl font-black font-mono text-emerald-400 flex items-center justify-end gap-1">
                  <Flame className="w-5 h-5 text-emerald-400" />
                  {sprint.velocityScore}%
                </div>
              </div>
              <div className="h-10 w-px bg-slate-800 hidden sm:block" />
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Story Points</div>
                <div className="text-2xl font-black font-mono text-white">
                  {sprint.completedStoryPoints} <span className="text-slate-500 text-sm font-normal">/ {sprint.totalStoryPoints} pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Points Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
              <span className="text-emerald-400 font-semibold">{sprint.completedStoryPoints} pts completed ({Math.round((sprint.completedStoryPoints / Math.max(1, sprint.totalStoryPoints)) * 100)}%)</span>
              <span className="text-slate-400">{sprint.remainingStoryPoints} pts remaining</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full transition-all duration-700"
                style={{ width: `${(sprint.completedStoryPoints / Math.max(1, sprint.totalStoryPoints)) * 100}%` }}
              />
              <div
                className="bg-amber-500/40 h-full transition-all duration-700"
                style={{ width: `${(overview.issuesCount.inProgress / Math.max(1, overview.issuesCount.total)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. Issue Distribution Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Total Tickets</div>
          <div className="text-2xl font-black text-white mt-1">{overview.issuesCount.total}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-slate-400 uppercase">To Do</div>
          <div className="text-2xl font-black text-slate-300 mt-1">{overview.issuesCount.todo}</div>
        </div>
        <div className="bg-slate-900/60 border border-amber-900/30 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-amber-400 uppercase">In Progress</div>
          <div className="text-2xl font-black text-amber-300 mt-1">{overview.issuesCount.inProgress}</div>
        </div>
        <div className="bg-slate-900/60 border border-purple-900/30 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-purple-400 uppercase">In Review</div>
          <div className="text-2xl font-black text-purple-300 mt-1">{overview.issuesCount.inReview}</div>
        </div>
        <div className="bg-slate-900/60 border border-emerald-900/30 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-emerald-400 uppercase">Completed</div>
          <div className="text-2xl font-black text-emerald-300 mt-1">{overview.issuesCount.done}</div>
        </div>
        <div className="bg-slate-900/60 border border-rose-900/40 bg-rose-950/20 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-rose-400 uppercase flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            Blocked
          </div>
          <div className="text-2xl font-black text-rose-400 mt-1">{overview.issuesCount.blocked}</div>
        </div>
      </div>

      {/* 3. Blocker Severity Matrix */}
      {blockers.length > 0 && (
        <div className="bg-rose-950/20 border border-rose-900/50 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <h3 className="text-base font-bold text-white tracking-tight">Active Blocker Root-Cause Matrix</h3>
            </div>
            <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950 border border-rose-800/80 px-2 py-0.5 rounded">
              {blockers.length} Critical Bottleneck{blockers.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {blockers.map((blocker) => (
              <div
                key={blocker.issueKey}
                className="bg-slate-900/90 border border-rose-900/60 rounded-xl p-4 flex flex-col justify-between hover:border-rose-500/80 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono font-bold text-xs text-rose-400 bg-rose-950/60 border border-rose-800 px-2 py-0.5 rounded">
                      {blocker.issueKey}
                    </span>
                    <span className="text-[11px] font-mono text-rose-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Blocked for {blocker.blockerAgeHours}h
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-100 line-clamp-1">{blocker.summary}</h4>

                  <div className="mt-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="text-[11px] text-slate-400 uppercase font-mono">
                      Root Cause ({blocker.rootCauseCategory}):
                    </div>
                    <p className="text-slate-200">{blocker.rootCauseAnalysis}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Owner: <strong className="text-slate-200">{blocker.assignee}</strong></span>
                  <div className="flex items-center gap-1 text-emerald-400 text-[11px] font-medium">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{blocker.recommendedMitigation.slice(0, 32)}...</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Active Issues List with Filters */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Active Sprint Tickets</h3>
            <p className="text-xs text-slate-400">Issues synchronized directly from Jira REST API v3</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {['ALL', 'In Progress', 'BLOCKED', 'In Review', 'To Do', 'Done'].map((cat) => (
              <button
                key={cat}
                onClick={() => setStatusFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === cat
                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-semibold'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'BLOCKED' ? 'Blocked' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Issue Cards */}
        <div className="divide-y divide-slate-800/60">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => onSelectIssue?.(issue)}
              className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-800/30 px-3 rounded-xl transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border mt-0.5 ${getPriorityBadge(issue.priority)}`}>
                  {issue.priority}
                </span>

                <div>
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-300 group-hover:text-emerald-400 transition-colors">
                      {issue.key}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${getStatusBadge(issue.statusCategory, issue.isBlocked)}`}>
                      {issue.isBlocked ? 'Blocked' : issue.status}
                    </span>
                    {issue.epicName && (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                        {issue.epicName}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-slate-100 group-hover:text-white transition-colors">
                    {issue.summary}
                  </h4>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    {issue.components.map(c => (
                      <span key={c} className="text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                    {issue.labels.slice(0, 3).map(l => (
                      <span key={l} className="text-[10px] text-slate-500">
                        #{l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assignee & Points */}
              <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                {issue.storyPoints !== undefined && (
                  <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2 py-1 rounded">
                    {issue.storyPoints} pts
                  </span>
                )}
                {issue.assignee ? (
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    {issue.assignee.avatarUrl && (
                      <img src={issue.assignee.avatarUrl} alt={issue.assignee.displayName} className="w-6 h-6 rounded-full object-cover" />
                    )}
                    <span className="hidden sm:inline font-medium">{issue.assignee.displayName}</span>
                  </div>
                ) : (
                  <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded">
                    Unassigned
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
