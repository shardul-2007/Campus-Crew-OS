import React from 'react';
import {
  WorkloadIntelligencePayload,
  TeamMemberWorkload
} from '../../../../src/types/forge';
import {
  Users,
  AlertTriangle,
  UserCheck,
  UserX,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Clock,
  Briefcase
} from 'lucide-react';

interface WorkloadTabProps {
  workload: WorkloadIntelligencePayload;
  onAssignIssue?: (issueKey: string, accountId: string) => void;
}

export const WorkloadTab: React.FC<WorkloadTabProps> = ({
  workload,
  onAssignIssue
}) => {
  const members = workload.teamMembers || [];

  const getWipBadge = (status: TeamMemberWorkload['wipStatus']) => {
    switch (status) {
      case 'OVERLOADED':
        return 'bg-rose-950/80 border-rose-800 text-rose-400';
      case 'NEAR_CAPACITY':
        return 'bg-amber-950/80 border-amber-800 text-amber-400';
      case 'OPTIMAL':
      default:
        return 'bg-emerald-950/80 border-emerald-800 text-emerald-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Metric Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Active Engineers</div>
          <div className="text-2xl font-black text-white mt-1 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            {members.length}
          </div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Team Story Points</div>
          <div className="text-2xl font-black text-white mt-1">{workload.totalTeamStoryPoints} pts</div>
        </div>
        <div className="bg-slate-900/60 border border-amber-900/40 rounded-xl p-4">
          <div className="text-[11px] font-mono text-amber-400 uppercase flex items-center gap-1">
            <UserX className="w-3.5 h-3.5" />
            Unassigned Tickets
          </div>
          <div className="text-2xl font-black text-amber-300 mt-1">{workload.unassignedIssuesCount}</div>
        </div>
        <div className="bg-slate-900/60 border border-rose-900/40 rounded-xl p-4">
          <div className="text-[11px] font-mono text-rose-400 uppercase flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            SPOF Domain Risks
          </div>
          <div className="text-2xl font-black text-rose-400 mt-1">{workload.spofRisks.length}</div>
        </div>
      </div>

      {/* 2. Team Workload Distribution Grid */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
        <div className="mb-4">
          <h3 className="text-base font-bold text-white tracking-tight">Engineer Workload & WIP Limits</h3>
          <p className="text-xs text-slate-400">
            Real-time story points allocation and parallel stream saturation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((member) => (
            <div
              key={member.accountId}
              className={`rounded-xl p-4 border bg-slate-900/80 transition-all ${
                member.wipStatus === 'OVERLOADED'
                  ? 'border-rose-900/80 hover:border-rose-700'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={member.displayName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-slate-300">
                      {member.displayName.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-bold text-white">{member.displayName}</h4>
                    <span className="text-xs text-slate-400">{member.role}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getWipBadge(member.wipStatus)}`}>
                  {member.wipStatus.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Workload Stats */}
              <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center font-mono">
                <div className="bg-slate-950/60 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-400">Points</div>
                  <div className="text-sm font-bold text-emerald-400">{member.totalStoryPoints}</div>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-400">Active</div>
                  <div className="text-sm font-bold text-slate-200">{member.activeIssuesCount}</div>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-400">In Progress</div>
                  <div className="text-sm font-bold text-amber-300">{member.inProgressIssuesCount}</div>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-lg">
                  <div className="text-[10px] text-slate-400">Blocked</div>
                  <div className="text-sm font-bold text-rose-400">{member.blockedIssuesCount}</div>
                </div>
              </div>

              {/* Warning description if overloaded */}
              {member.wipRiskDescription && (
                <div className="mt-3 p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/60 text-xs text-rose-300 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{member.wipRiskDescription}</span>
                </div>
              )}

              {/* Assigned Domains */}
              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                <span className="text-[10px] font-mono text-slate-500">Domains:</span>
                {member.assignedDomains.map(d => (
                  <span key={d} className="text-[10px] font-mono text-slate-300 bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Unassigned Work Queue */}
      {workload.unassignedIssues && workload.unassignedIssues.length > 0 && (
        <div className="bg-slate-900/50 border border-amber-900/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <UserX className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Unassigned Work Queue ({workload.unassignedIssues.length})
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 border border-amber-800 px-2 py-0.5 rounded">
              Needs Ownership
            </span>
          </div>

          <div className="space-y-2.5">
            {workload.unassignedIssues.map((issue) => (
              <div
                key={issue.key}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded">
                    {issue.key}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-slate-200">{issue.summary}</span>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>Priority: <strong className="text-slate-200">{issue.priority}</strong></span>
                      {issue.storyPoints && <span>• {issue.storyPoints} Story Points</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <select
                    onChange={(e) => onAssignIssue?.(issue.key, e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-emerald-500"
                    defaultValue=""
                  >
                    <option value="" disabled>Assign to Engineer...</option>
                    {members.map(m => (
                      <option key={m.accountId} value={m.accountId}>
                        {m.displayName} ({m.totalStoryPoints} pts)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Single Point of Failure (SPOF) Risk Matrix */}
      {workload.spofRisks && workload.spofRisks.length > 0 && (
        <div className="bg-rose-950/20 border border-rose-900/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Single Point of Failure (SPOF) Knowledge Gaps
            </h3>
          </div>
          <p className="text-xs text-slate-300 mb-4">
            Component areas where entire delivery throughput depends exclusively on a single engineer:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {workload.spofRisks.map((spof) => (
              <div
                key={spof.domain}
                className="bg-slate-900/90 border border-rose-900/60 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-white bg-slate-950 border border-slate-700 px-2 py-0.5 rounded">
                      Domain: {spof.domain}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950 border border-rose-800 px-2 py-0.5 rounded">
                      {spof.riskLevel} SPOF RISK
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">{spof.detail}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Sole Owner: <strong className="text-emerald-400">{spof.soleOwner}</strong></span>
                  <span className="text-slate-500 font-mono text-[11px]">Action: Pair Review Recommended</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
