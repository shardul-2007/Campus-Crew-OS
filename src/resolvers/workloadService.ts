/**
 * Team Workload Intelligence Service
 * Analyzes developer workload, detects WIP limit breaches, identifies unassigned tickets,
 * and surfaces Single Point of Failure (SPOF) risks across software teams.
 */

import {
  JiraIssue,
  TeamMemberWorkload,
  WorkloadIntelligencePayload
} from '../types/forge';

export class WorkloadService {
  computeTeamWorkload(issues: JiraIssue[]): WorkloadIntelligencePayload {
    const memberMap = new Map<string, {
      displayName: string;
      email?: string;
      avatarUrl?: string;
      activeIssues: JiraIssue[];
      inProgressIssues: JiraIssue[];
      reviewIssues: JiraIssue[];
      blockedIssues: JiraIssue[];
      totalPoints: number;
      domains: Set<string>;
    }>();

    const unassignedIssues: WorkloadIntelligencePayload['unassignedIssues'] = [];
    const domainOwners = new Map<string, Set<string>>();

    for (const issue of issues) {
      // Track domain ownership by component
      for (const comp of issue.components) {
        if (!domainOwners.has(comp)) domainOwners.set(comp, new Set());
        if (issue.assignee) {
          domainOwners.get(comp)!.add(issue.assignee.displayName);
        }
      }

      if (!issue.assignee) {
        if (issue.statusCategory !== 'Done') {
          unassignedIssues.push({
            key: issue.key,
            summary: issue.summary,
            priority: issue.priority,
            storyPoints: issue.storyPoints
          });
        }
        continue;
      }

      const id = issue.assignee.accountId;
      if (!memberMap.has(id)) {
        memberMap.set(id, {
          displayName: issue.assignee.displayName,
          email: issue.assignee.emailAddress,
          avatarUrl: issue.assignee.avatarUrl,
          activeIssues: [],
          inProgressIssues: [],
          reviewIssues: [],
          blockedIssues: [],
          totalPoints: 0,
          domains: new Set()
        });
      }

      const record = memberMap.get(id)!;
      if (issue.statusCategory !== 'Done') {
        record.activeIssues.push(issue);
        record.totalPoints += issue.storyPoints || 0;

        if (issue.statusCategory === 'In Progress') {
          record.inProgressIssues.push(issue);
        } else if (issue.statusCategory === 'In Review') {
          record.reviewIssues.push(issue);
        } else if (issue.isBlocked || issue.statusCategory === 'Blocked') {
          record.blockedIssues.push(issue);
        }

        issue.components.forEach(c => record.domains.add(c));
      }
    }

    const teamMembers: TeamMemberWorkload[] = [];
    let totalTeamStoryPoints = 0;

    memberMap.forEach((val, accountId) => {
      totalTeamStoryPoints += val.totalPoints;

      let wipStatus: TeamMemberWorkload['wipStatus'] = 'OPTIMAL';
      let wipRiskDescription: string | undefined;

      const activeCount = val.activeIssues.length;
      const inProgressCount = val.inProgressIssues.length;
      const blockedCount = val.blockedIssues.length;

      // WIP Overload Criteria:
      // 1. Multiple parallel in-progress streams (>= 2)
      // 2. High story point concentration with blockers (>= 8 pts & blocked)
      // 3. Excessive parallel tickets (>= 3)
      if (inProgressCount >= 2 || (val.totalPoints >= 8 && blockedCount > 0) || activeCount >= 3) {
        wipStatus = 'OVERLOADED';
        wipRiskDescription = `High WIP saturation (${activeCount} active tasks, ${val.totalPoints} story points, ${blockedCount} blocked). Severe critical-path bottleneck risk.`;
      } else if (blockedCount > 0 || val.totalPoints >= 6 || activeCount >= 2) {
        wipStatus = 'NEAR_CAPACITY';
        wipRiskDescription = `Engineer is managing ${activeCount} active task streams with ${val.totalPoints} points.`;
      }

      teamMembers.push({
        accountId,
        displayName: val.displayName,
        avatarUrl: val.avatarUrl,
        role: this.inferRole(Array.from(val.domains)),
        activeIssuesCount: activeCount,
        inProgressIssuesCount: inProgressCount,
        reviewIssuesCount: val.reviewIssues.length,
        blockedIssuesCount: blockedCount,
        totalStoryPoints: val.totalPoints,
        wipStatus,
        wipRiskDescription,
        assignedDomains: Array.from(val.domains)
      });
    });

    // Detect Single Point of Failure (SPOF) domains
    const spofRisks: WorkloadIntelligencePayload['spofRisks'] = [];
    domainOwners.forEach((owners, domain) => {
      if (owners.size === 1) {
        const [soleOwner] = Array.from(owners);
        spofRisks.push({
          domain,
          soleOwner,
          riskLevel: domain.includes('Database') || domain.includes('Auth') ? 'HIGH' : 'MEDIUM',
          detail: `All current ${domain} tasks are assigned exclusively to ${soleOwner}. Absence or blocker creates a critical path bottleneck.`
        });
      }
    });

    return {
      teamMembers,
      totalTeamStoryPoints,
      unassignedIssuesCount: unassignedIssues.length,
      unassignedIssues,
      spofRisks
    };
  }

  private inferRole(domains: string[]): string {
    const d = domains.join(' ').toLowerCase();
    if (d.includes('database') || d.includes('infrastructure')) return 'Platform / Backend Engineer';
    if (d.includes('frontend') || d.includes('ui') || d.includes('socket')) return 'Frontend / Full-Stack Engineer';
    if (d.includes('auth') || d.includes('security')) return 'Security & Platform Architect';
    if (d.includes('qa') || d.includes('test')) return 'Quality Assurance Engineer';
    return 'Software Engineer';
  }
}

export const workloadService = new WorkloadService();
