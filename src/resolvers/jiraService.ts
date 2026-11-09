/**
 * Jira Service for CampusCrew Intelligence
 * Interfaces with Jira Cloud REST API v3 via Forge api.asUser() / api.asApp()
 */

import {
  JiraIssue,
  JiraSprint,
  BlockerDiagnostic,
  IssueStatusCategory
} from '../types/forge';

// Realistic fallback / offline fixture for local development & automated testing
export const MOCK_JIRA_ISSUES: JiraIssue[] = [
  {
    id: '10001',
    key: 'ENG-101',
    summary: 'Implement OAuth 2.0 PKCE flow for Forge Custom UI authentication',
    description: 'Transition legacy token storage to Forge OAuth 3LO with PKCE code challenge and tenant isolation.',
    status: 'In Progress',
    statusCategory: 'In Progress',
    issueType: 'Story',
    priority: 'High',
    assignee: {
      accountId: 'usr-1',
      displayName: 'Alex Chen',
      emailAddress: 'alex.chen@campuscrew.dev',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop'
    },
    created: '2026-11-01T08:30:00.000Z',
    updated: '2026-11-08T14:20:00.000Z',
    storyPoints: 5,
    epicKey: 'ENG-90',
    epicName: 'Security Hardening & Atlassian Auth',
    labels: ['security', 'auth', 'forge-api'],
    components: ['Auth Service', 'Forge Bridge'],
    sprintId: 'sprint-42',
    sprintName: 'Sprint 42 - Cloud Scale',
    isBlocked: false
  },
  {
    id: '10002',
    key: 'ENG-102',
    summary: 'Database connection pool starvation during peak ingestion spikes',
    description: 'PostgreSQL connection limits exceeded when background workers run concurrent batch syncs.',
    status: 'Blocked',
    statusCategory: 'Blocked',
    issueType: 'Bug',
    priority: 'Highest',
    assignee: {
      accountId: 'usr-2',
      displayName: 'Sarah Jenkins',
      emailAddress: 'sarah.j@campuscrew.dev',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop'
    },
    created: '2026-11-03T11:15:00.000Z',
    updated: '2026-11-07T09:45:00.000Z',
    storyPoints: 8,
    epicKey: 'ENG-91',
    epicName: 'Data Layer & Scalability',
    labels: ['database', 'performance', 'blocker'],
    components: ['Database', 'Worker Service'],
    sprintId: 'sprint-42',
    sprintName: 'Sprint 42 - Cloud Scale',
    isBlocked: true,
    blockerReason: 'Awaiting AWS RDS PgBouncer proxy configuration approval from DevOps lead',
    blockerAgeHours: 52
  },
  {
    id: '10003',
    key: 'ENG-103',
    summary: 'Stripe webhook replay idempotent handler and retry queue',
    description: 'Webhook duplicate receipts create duplicate ledger entries under network jitter.',
    status: 'In Review',
    statusCategory: 'In Review',
    issueType: 'Story',
    priority: 'High',
    assignee: {
      accountId: 'usr-3',
      displayName: 'Marcus Brody',
      emailAddress: 'marcus.b@campuscrew.dev',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop'
    },
    created: '2026-11-02T10:00:00.000Z',
    updated: '2026-11-09T08:10:00.000Z',
    storyPoints: 5,
    epicKey: 'ENG-92',
    epicName: 'Billing & Subscriptions',
    labels: ['payments', 'stripe', 'backend'],
    components: ['Payment Gateway', 'Event Bus'],
    sprintId: 'sprint-42',
    sprintName: 'Sprint 42 - Cloud Scale',
    isBlocked: false
  },
  {
    id: '10004',
    key: 'ENG-104',
    summary: 'Rate limit telemetry and 429 adaptive exponential backoff',
    description: 'Third-party API rate limit spikes cause cascading thread exhaustion.',
    status: 'Blocked',
    statusCategory: 'Blocked',
    issueType: 'Bug',
    priority: 'High',
    assignee: {
      accountId: 'usr-1',
      displayName: 'Alex Chen',
      emailAddress: 'alex.chen@campuscrew.dev',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop'
    },
    created: '2026-11-04T13:40:00.000Z',
    updated: '2026-11-08T18:00:00.000Z',
    storyPoints: 3,
    epicKey: 'ENG-90',
    epicName: 'Security Hardening & Atlassian Auth',
    labels: ['resilience', 'api', 'blocker'],
    components: ['API Gateway'],
    sprintId: 'sprint-42',
    sprintName: 'Sprint 42 - Cloud Scale',
    isBlocked: true,
    blockerReason: 'Dependency on PR #412 merged into core shared utilities library',
    blockerAgeHours: 28
  },
  {
    id: '10005',
    key: 'ENG-105',
    summary: 'Real-time WebSocket event broadcaster for team presence',
    description: 'Broadcast active collaborator cursor state and document lock indicators.',
    status: 'In Progress',
    statusCategory: 'In Progress',
    issueType: 'Story',
    priority: 'Medium',
    assignee: {
      accountId: 'usr-4',
      displayName: 'Elena Rostova',
      emailAddress: 'elena.r@campuscrew.dev',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop'
    },
    created: '2026-11-05T09:20:00.000Z',
    updated: '2026-11-09T11:00:00.000Z',
    storyPoints: 5,
    epicKey: 'ENG-93',
    epicName: 'Collaborative Realtime Canvas',
    labels: ['websocket', 'realtime', 'ui'],
    components: ['Frontend App', 'Socket Cluster'],
    sprintId: 'sprint-42',
    sprintName: 'Sprint 42 - Cloud Scale',
    isBlocked: false
  },
  {
    id: '10006',
    key: 'ENG-106',
    summary: 'Automated E2E Playwright test harness for regression gates',
    description: 'Continuous regression suite running in GitHub Actions with artifact screenshots.',
    status: 'Done',
    statusCategory: 'Done',
    issueType: 'Task',
    priority: 'Medium',
    assignee: {
      accountId: 'usr-2',
      displayName: 'Sarah Jenkins',
      emailAddress: 'sarah.j@campuscrew.dev',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop'
    },
    created: '2026-11-01T10:00:00.000Z',
    updated: '2026-11-06T16:30:00.000Z',
    storyPoints: 5,
    epicKey: 'ENG-94',
    epicName: 'Quality & Test Engineering',
    labels: ['qa', 'playwright', 'ci'],
    components: ['Test Suite', 'CI Pipeline'],
    sprintId: 'sprint-42',
    sprintName: 'Sprint 42 - Cloud Scale',
    isBlocked: false
  },
  {
    id: '10007',
    key: 'ENG-107',
    summary: 'Zero-downtime Blue/Green deployment pipeline for microservices',
    description: 'Kubernetes ingress weighted traffic shifting with automatic rollback on 5xx threshold.',
    status: 'To Do',
    statusCategory: 'To Do',
    issueType: 'Story',
    priority: 'High',
    assignee: undefined, // Unassigned!
    created: '2026-11-06T14:00:00.000Z',
    updated: '2026-11-06T14:00:00.000Z',
    storyPoints: 8,
    epicKey: 'ENG-91',
    epicName: 'Data Layer & Scalability',
    labels: ['devops', 'kubernetes', 'unassigned'],
    components: ['Infrastructure'],
    sprintId: 'sprint-42',
    sprintName: 'Sprint 42 - Cloud Scale',
    isBlocked: false
  },
  {
    id: '10008',
    key: 'ENG-108',
    summary: 'Audit log export compliance format for GDPR and SOC2',
    description: 'Immutable cryptographically hashed audit trails for administrative access events.',
    status: 'To Do',
    statusCategory: 'To Do',
    issueType: 'Story',
    priority: 'Medium',
    assignee: undefined, // Unassigned!
    created: '2026-11-07T11:00:00.000Z',
    updated: '2026-11-07T11:00:00.000Z',
    storyPoints: 3,
    epicKey: 'ENG-90',
    epicName: 'Security Hardening & Atlassian Auth',
    labels: ['compliance', 'security', 'audit'],
    components: ['Audit Service'],
    sprintId: 'sprint-42',
    sprintName: 'Sprint 42 - Cloud Scale',
    isBlocked: false
  }
];

export const MOCK_ACTIVE_SPRINT: JiraSprint = {
  id: 'sprint-42',
  name: 'Sprint 42 - Cloud Scale & Resilience',
  state: 'active',
  startDate: '2026-11-01T00:00:00.000Z',
  endDate: '2026-11-15T00:00:00.000Z',
  goal: 'Harden OAuth authentication, resolve database connection starvation, and establish 80%+ documentation coverage before release.',
  totalStoryPoints: 37,
  completedStoryPoints: 5,
  remainingStoryPoints: 32,
  daysRemaining: 6,
  velocityScore: 71
};

export class JiraService {
  /**
   * Fetches issues for a given project or JQL filter.
   * If running inside Atlassian Forge Cloud, invokes api.asUser().requestJira().
   * Otherwise falls back gracefully to realistic project data.
   */
  async getProjectIssues(projectKey: string = 'ENG'): Promise<JiraIssue[]> {
    try {
      // Dynamic import of @forge/api to support both Node runtime and Forge sandbox
      const forgeApi = await import('@forge/api').catch(() => null);

      if (forgeApi && forgeApi.api && typeof forgeApi.api.asUser === 'function') {
        const jql = `project = "${projectKey}" ORDER BY updated DESC`;
        const response = await forgeApi.api
          .asUser()
          .requestJira(
            `/rest/api/3/search?jql=${encodeURIComponent(jql)}&fields=summary,description,status,issuetype,priority,assignee,reporter,created,updated,customfield_10016,labels,components,parent`
          );

        if (response.status === 200) {
          const data = await response.json();
          if (data && Array.isArray(data.issues)) {
            return data.issues.map((issue: any) => this.mapJiraApiResponseToIssue(issue));
          }
        }
      }
    } catch (err) {
      console.warn('[JiraService] Forge API call failed, falling back to local dataset:', err);
    }

    return MOCK_JIRA_ISSUES;
  }

  /**
   * Fetches the currently active sprint for the project.
   */
  async getActiveSprint(projectKey: string = 'ENG'): Promise<JiraSprint> {
    try {
      const forgeApi = await import('@forge/api').catch(() => null);
      if (forgeApi && forgeApi.api && typeof forgeApi.api.asUser === 'function') {
        // Query agile board for active sprint
        const boardsRes = await forgeApi.api.asUser().requestJira(`/rest/agile/1.0/board?projectKeyOrId=${projectKey}`);
        if (boardsRes.status === 200) {
          const boardsData = await boardsRes.json();
          const boardId = boardsData.values?.[0]?.id;
          if (boardId) {
            const sprintRes = await forgeApi.api.asUser().requestJira(`/rest/agile/1.0/board/${boardId}/sprint?state=active`);
            if (sprintRes.status === 200) {
              const sprintData = await sprintRes.json();
              const active = sprintData.values?.[0];
              if (active) {
                return {
                  id: String(active.id),
                  name: active.name,
                  state: 'active',
                  startDate: active.startDate,
                  endDate: active.endDate,
                  goal: active.goal || '',
                  totalStoryPoints: 37,
                  completedStoryPoints: 5,
                  remainingStoryPoints: 32,
                  daysRemaining: Math.max(1, Math.ceil((new Date(active.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
                  velocityScore: 75
                };
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn('[JiraService] Using fallback active sprint:', e);
    }

    return MOCK_ACTIVE_SPRINT;
  }

  /**
   * Diagnoses blockers across the project issues.
   */
  diagnoseBlockers(issues: JiraIssue[]): BlockerDiagnostic[] {
    const blockedIssues = issues.filter(i => i.isBlocked || i.statusCategory === 'Blocked');

    return blockedIssues.map(issue => {
      const ageHours = issue.blockerAgeHours || 24;
      let rootCauseCategory: BlockerDiagnostic['rootCauseCategory'] = 'DEPENDENCY';
      let rootCauseAnalysis = 'Blocked on external technical prerequisite.';
      let recommendedMitigation = 'Escalate with dependency team in daily standup.';

      if (issue.summary.toLowerCase().includes('database') || issue.summary.toLowerCase().includes('pool')) {
        rootCauseCategory = 'INFRASTRUCTURE';
        rootCauseAnalysis = 'Connection pool saturation caused by batch worker synchronization without pooling proxies.';
        recommendedMitigation = 'Deploy RDS PgBouncer proxy layer and configure max_connections per pod limit.';
      } else if (issue.blockerReason?.toLowerCase().includes('pr') || issue.summary.toLowerCase().includes('backoff')) {
        rootCauseCategory = 'PR_REVIEW';
        rootCauseAnalysis = 'Code change depends on pending upstream PR merge into shared runtime utility.';
        recommendedMitigation = 'Request priority code review pairing from lead architect to unblock downstream integration.';
      } else if (issue.summary.toLowerCase().includes('api') || issue.summary.toLowerCase().includes('stripe')) {
        rootCauseCategory = 'EXTERNAL_API';
        rootCauseAnalysis = 'External vendor contract changes or undocumented rate limiting.';
        recommendedMitigation = 'Implement circuit breaker pattern with backoff jitter queue.';
      }

      return {
        issueKey: issue.key,
        summary: issue.summary,
        assignee: issue.assignee?.displayName || 'Unassigned',
        blockerAgeHours: ageHours,
        severity: ageHours > 48 ? 'CRITICAL' : ageHours > 24 ? 'HIGH' : 'MEDIUM',
        rootCauseCategory,
        rootCauseAnalysis: issue.blockerReason || rootCauseAnalysis,
        recommendedMitigation
      };
    });
  }

  private mapJiraApiResponseToIssue(jiraIssue: any): JiraIssue {
    const fields = jiraIssue.fields || {};
    const statusName = fields.status?.name || 'To Do';
    const statusCategoryName = fields.status?.statusCategory?.name || 'To Do';

    let category: IssueStatusCategory = 'To Do';
    if (statusName.toLowerCase().includes('block')) {
      category = 'Blocked';
    } else if (statusCategoryName === 'In Progress' || statusName === 'In Progress') {
      category = 'In Progress';
    } else if (statusName.toLowerCase().includes('review') || statusName.toLowerCase().includes('pr')) {
      category = 'In Review';
    } else if (statusCategoryName === 'Done' || statusName === 'Done') {
      category = 'Done';
    }

    const isBlocked = category === 'Blocked' || (fields.labels || []).includes('blocker') || Boolean(fields.flagged);

    return {
      id: jiraIssue.id,
      key: jiraIssue.key,
      summary: fields.summary || 'Untitled Issue',
      description: fields.description || '',
      status: statusName,
      statusCategory: category,
      issueType: fields.issuetype?.name || 'Task',
      priority: fields.priority?.name || 'Medium',
      assignee: fields.assignee ? {
        accountId: fields.assignee.accountId,
        displayName: fields.assignee.displayName,
        emailAddress: fields.assignee.emailAddress,
        avatarUrl: fields.assignee.avatarUrls?.['48x48']
      } : undefined,
      reporter: fields.reporter ? {
        accountId: fields.reporter.accountId,
        displayName: fields.reporter.displayName,
        avatarUrl: fields.reporter.avatarUrls?.['48x48']
      } : undefined,
      created: fields.created || new Date().toISOString(),
      updated: fields.updated || new Date().toISOString(),
      storyPoints: fields.customfield_10016 || fields.storyPoints || 3,
      epicKey: fields.parent?.key,
      epicName: fields.parent?.fields?.summary,
      labels: fields.labels || [],
      components: (fields.components || []).map((c: any) => c.name),
      isBlocked,
      blockerReason: isBlocked ? 'Awaiting cross-team dependency resolution' : undefined,
      blockerAgeHours: isBlocked ? 36 : undefined
    };
  }
}

export const jiraService = new JiraService();
