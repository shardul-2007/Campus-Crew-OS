/**
 * CampusCrew Intelligence — Forge Bridge Adapter
 * Provides transparent communication between Custom UI and Forge Resolvers,
 * with intelligent fallback for local development preview and testing.
 */

import {
  EngineeringOverviewPayload,
  ContextIntelligencePayload,
  WorkloadIntelligencePayload,
  ArchitectureDecision,
  ConfidenceScoreBreakdown
} from '../../../src/types/forge';
import { MOCK_JIRA_ISSUES, MOCK_ACTIVE_SPRINT } from '../../../src/resolvers/jiraService';
import { MOCK_CONFLUENCE_PAGES } from '../../../src/resolvers/confluenceService';
import { INITIAL_ADRS } from '../../../src/resolvers/decisionService';

// Check if running in Forge iframe
export const isInsideForge = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top || window.location.ancestorOrigins?.length > 0;
  } catch {
    return true;
  }
};

/**
 * Universal backend invocation function
 */
export async function invokeBackend<T>(functionKey: string, payload: any = {}): Promise<T> {
  if (isInsideForge()) {
    try {
      const forgeBridge = await import('@forge/bridge');
      if (forgeBridge && typeof forgeBridge.invoke === 'function') {
        const result = await forgeBridge.invoke(functionKey, payload);
        return result as T;
      }
    } catch (err) {
      console.warn(`[ForgeBridge] invoke("${functionKey}") inside iframe failed, falling back to local simulation:`, err);
    }
  }

  // Local fallback simulation
  return simulateLocalResolver<T>(functionKey, payload);
}

/**
 * Get Forge Context (e.g. Jira Project Key)
 */
export async function getForgeContext(): Promise<{ projectKey?: string; siteUrl?: string }> {
  if (isInsideForge()) {
    try {
      const forgeBridge = await import('@forge/bridge');
      if (forgeBridge && forgeBridge.view && typeof forgeBridge.view.getContext === 'function') {
        const ctx: any = await forgeBridge.view.getContext();
        return {
          projectKey: ctx?.extension?.project?.key || ctx?.project?.key || 'ENG',
          siteUrl: ctx?.siteUrl
        };
      }
    } catch (e) {
      console.warn('[ForgeBridge] view.getContext failed:', e);
    }
  }

  return { projectKey: 'ENG', siteUrl: 'https://campuscrew.atlassian.net' };
}

/**
 * Local simulation resolver for offline preview and development
 */
function simulateLocalResolver<T>(functionKey: string, payload: any): Promise<T> {
  const projectKey = payload?.projectKey || 'ENG';

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (functionKey) {
        case 'getEngineeringOverview': {
          const issues = MOCK_JIRA_ISSUES;
          const sprint = MOCK_ACTIVE_SPRINT;
          const blockers = [
            {
              issueKey: 'ENG-102',
              summary: 'Database connection pool starvation during peak ingestion spikes',
              assignee: 'Sarah Jenkins',
              blockerAgeHours: 52,
              severity: 'CRITICAL' as const,
              rootCauseCategory: 'INFRASTRUCTURE' as const,
              rootCauseAnalysis: 'Connection pool saturation caused by batch worker synchronization without pooling proxies.',
              recommendedMitigation: 'Deploy RDS PgBouncer proxy layer and configure max_connections per pod limit.'
            },
            {
              issueKey: 'ENG-104',
              summary: 'Rate limit telemetry and 429 adaptive exponential backoff',
              assignee: 'Alex Chen',
              blockerAgeHours: 28,
              severity: 'HIGH' as const,
              rootCauseCategory: 'PR_REVIEW' as const,
              rootCauseAnalysis: 'Dependency on PR #412 merged into core shared utilities library.',
              recommendedMitigation: 'Request priority code review pairing from lead architect to unblock downstream integration.'
            }
          ];

          const overview: EngineeringOverviewPayload = {
            project: {
              key: projectKey,
              name: `${projectKey} Engineering Platform`,
              lead: 'Alex Chen (Lead Architect)'
            },
            activeSprint: sprint,
            issuesCount: {
              total: issues.length,
              todo: issues.filter(i => i.statusCategory === 'To Do').length,
              inProgress: issues.filter(i => i.statusCategory === 'In Progress').length,
              inReview: issues.filter(i => i.statusCategory === 'In Review').length,
              done: issues.filter(i => i.statusCategory === 'Done').length,
              blocked: blockers.length
            },
            issues,
            blockers,
            deliveryConfidence: {
              overallScore: 68,
              tier: 'MODERATE',
              factors: {
                sprintVelocity: { score: 71, weight: 30, impact: 'Pacing Behind Target' },
                blockerHealth: { score: 50, weight: 30, impact: '2 Critical Blockers' },
                docCoverage: { score: 62, weight: 20, impact: '62% Issues Documented' },
                workloadBalance: { score: 75, weight: 20, impact: 'SPOF Bottlenecks Present' }
              },
              summary: 'Current sprint delivery confidence is evaluated at 68% (MODERATE RISK). Primary hazards stem from 2 unresolved blockers and an unassigned 8-point deployment story.',
              keyRisks: [
                '2 active blockers impeding critical path (ENG-102, ENG-104).',
                'ENG-107 (Blue/Green deployment) is unassigned with no Confluence spec.',
                'Database domain has a single point of failure (Sarah Jenkins).'
              ],
              topRecommendations: [
                'Authorize AWS RDS PgBouncer proxy deployment to unblock database starvation on ENG-102.',
                'Assign ENG-108 (Audit compliance) to Elena Rostova during morning standup.',
                'Draft Confluence architecture spec for ENG-107.'
              ]
            },
            lastSyncedAt: new Date().toISOString()
          };
          return resolve(overview as unknown as T);
        }

        case 'getContextIntelligence': {
          const res: ContextIntelligencePayload = {
            totalIssuesChecked: 8,
            documentedIssuesCount: 5,
            coveragePercentage: 62,
            links: [
              {
                jiraIssueKey: 'ENG-101',
                jiraSummary: 'Implement OAuth 2.0 PKCE flow for Forge Custom UI authentication',
                confluencePageId: 'conf-201',
                confluenceTitle: 'OAuth 2.0 PKCE & Forge Custom UI Architecture',
                confluenceUrl: 'https://campuscrew.atlassian.net/wiki/spaces/ARCH/pages/201',
                relevanceScore: 0.94,
                matchReason: 'Matched key concepts: "oauth, pkce, auth, forge"',
                isVerified: true
              },
              {
                jiraIssueKey: 'ENG-102',
                jiraSummary: 'Database connection pool starvation during peak ingestion spikes',
                confluencePageId: 'conf-202',
                confluenceTitle: 'Database Connection Pool Tuning & PgBouncer Guide',
                confluenceUrl: 'https://campuscrew.atlassian.net/wiki/spaces/OPS/pages/202',
                relevanceScore: 0.88,
                matchReason: 'Matched key concepts: "database, pool, pgbouncer, performance"',
                isVerified: true
              },
              {
                jiraIssueKey: 'ENG-103',
                jiraSummary: 'Stripe webhook replay idempotent handler and retry queue',
                confluencePageId: 'conf-203',
                confluenceTitle: 'Stripe Webhook Idempotency & Dead Letter Queue RFC',
                confluenceUrl: 'https://campuscrew.atlassian.net/wiki/spaces/ARCH/pages/203',
                relevanceScore: 0.91,
                matchReason: 'Matched key concepts: "stripe, webhook, idempotency, queues"',
                isVerified: true
              },
              {
                jiraIssueKey: 'ENG-105',
                jiraSummary: 'Real-time WebSocket event broadcaster for team presence',
                confluencePageId: 'conf-204',
                confluenceTitle: 'ADR-004: Realtime Collaborative Protocol Selection',
                confluenceUrl: 'https://campuscrew.atlassian.net/wiki/spaces/ADR/pages/204',
                relevanceScore: 0.82,
                matchReason: 'Matched key concepts: "websocket, realtime, broadcast"',
                isVerified: true
              },
              {
                jiraIssueKey: 'ENG-106',
                jiraSummary: 'Automated E2E Playwright test harness for regression gates',
                confluencePageId: 'conf-205',
                confluenceTitle: 'Quality Engineering: Playwright Regression Testing Standard',
                confluenceUrl: 'https://campuscrew.atlassian.net/wiki/spaces/QA/pages/205',
                relevanceScore: 0.89,
                matchReason: 'Matched key concepts: "qa, playwright, test, regression"',
                isVerified: true
              }
            ],
            missingDocs: [
              {
                jiraIssueKey: 'ENG-107',
                summary: 'Zero-downtime Blue/Green deployment pipeline for microservices',
                priority: 'High',
                assignee: undefined,
                suggestedDocType: 'Architecture Spec',
                riskScore: 'CRITICAL',
                reason: 'No Confluence architectural specification found for High priority Story.'
              },
              {
                jiraIssueKey: 'ENG-108',
                summary: 'Audit log export compliance format for GDPR and SOC2',
                priority: 'Medium',
                assignee: undefined,
                suggestedDocType: 'PRD / Requirements',
                riskScore: 'CRITICAL',
                reason: 'No Confluence requirements document found for compliance-tagged Story.'
              }
            ],
            staleDocs: [
              {
                pageId: 'conf-202',
                title: 'Database Connection Pool Tuning & PgBouncer Guide',
                lastUpdated: '2026-10-15T09:30:00.000Z',
                reason: 'Runbook has not been reviewed within the 30-day compliance cadence.'
              }
            ]
          };
          return resolve(res as unknown as T);
        }

        case 'getTeamWorkload': {
          const workload: WorkloadIntelligencePayload = {
            teamMembers: [
              {
                accountId: 'usr-1',
                displayName: 'Alex Chen',
                avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop',
                role: 'Security & Platform Architect',
                activeIssuesCount: 2,
                inProgressIssuesCount: 1,
                reviewIssuesCount: 0,
                blockedIssuesCount: 1,
                totalStoryPoints: 8,
                wipStatus: 'NEAR_CAPACITY',
                wipRiskDescription: 'Engineer is blocked on 1 issue while progressing other streams.',
                assignedDomains: ['Auth Service', 'Forge Bridge', 'API Gateway']
              },
              {
                accountId: 'usr-2',
                displayName: 'Sarah Jenkins',
                avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop',
                role: 'Platform / Backend Engineer',
                activeIssuesCount: 2,
                inProgressIssuesCount: 0,
                reviewIssuesCount: 0,
                blockedIssuesCount: 1,
                totalStoryPoints: 13,
                wipStatus: 'OVERLOADED',
                wipRiskDescription: 'High WIP saturation (13 story points across critical path). Blocked on RDS PgBouncer approval.',
                assignedDomains: ['Database', 'Worker Service', 'Test Suite']
              },
              {
                accountId: 'usr-3',
                displayName: 'Marcus Brody',
                avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop',
                role: 'Platform / Backend Engineer',
                activeIssuesCount: 1,
                inProgressIssuesCount: 0,
                reviewIssuesCount: 1,
                blockedIssuesCount: 0,
                totalStoryPoints: 5,
                wipStatus: 'OPTIMAL',
                assignedDomains: ['Payment Gateway', 'Event Bus']
              },
              {
                accountId: 'usr-4',
                displayName: 'Elena Rostova',
                avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop',
                role: 'Frontend / Full-Stack Engineer',
                activeIssuesCount: 1,
                inProgressIssuesCount: 1,
                reviewIssuesCount: 0,
                blockedIssuesCount: 0,
                totalStoryPoints: 5,
                wipStatus: 'OPTIMAL',
                assignedDomains: ['Frontend App', 'Socket Cluster']
              }
            ],
            totalTeamStoryPoints: 31,
            unassignedIssuesCount: 2,
            unassignedIssues: [
              {
                key: 'ENG-107',
                summary: 'Zero-downtime Blue/Green deployment pipeline for microservices',
                priority: 'High',
                storyPoints: 8
              },
              {
                key: 'ENG-108',
                summary: 'Audit log export compliance format for GDPR and SOC2',
                priority: 'Medium',
                storyPoints: 3
              }
            ],
            spofRisks: [
              {
                domain: 'Database',
                soleOwner: 'Sarah Jenkins',
                riskLevel: 'HIGH',
                detail: 'All current Database tasks are assigned exclusively to Sarah Jenkins. Absence or blocker creates a critical path bottleneck.'
              },
              {
                domain: 'Auth Service',
                soleOwner: 'Alex Chen',
                riskLevel: 'HIGH',
                detail: 'All current Auth Service tasks are assigned exclusively to Alex Chen.'
              }
            ]
          };
          return resolve(workload as unknown as T);
        }

        case 'getDecisionsAndADRs': {
          return resolve(INITIAL_ADRS as unknown as T);
        }

        case 'recordDecision': {
          const decision = payload?.decision;
          return resolve({
            ...decision,
            id: decision.id || `ADR-00${INITIAL_ADRS.length + 1}`,
            date: new Date().toISOString().split('T')[0]
          } as unknown as T);
        }

        case 'runAIEngineeringAssistant': {
          const promptType = payload?.promptType || 'sprint_summary';
          if (promptType === 'blocker_root_cause') {
            return resolve({
              promptType,
              title: 'Deep Blocker Root-Cause & Dependency Diagnostics',
              summary: 'Identified 2 active blockers threatening release delivery. Primary delay vector is database infrastructure contention followed by cross-service code review lag.',
              keyInsights: [
                '[ENG-102] (Sarah Jenkins, age 52h): Awaiting AWS RDS PgBouncer proxy configuration approval from DevOps lead.',
                '[ENG-104] (Alex Chen, age 28h): Dependency on PR #412 merged into core shared utilities library.'
              ],
              groundedReferences: {
                jiraKeys: ['ENG-102', 'ENG-104'],
                confluencePages: ['Database Connection Pool Tuning & PgBouncer Guide', 'OAuth 2.0 PKCE & Forge Custom UI Architecture']
              },
              recommendedActions: [
                {
                  priority: 'URGENT',
                  action: 'DevOps Lead to approve PgBouncer configuration for ENG-102 immediately.',
                  rationale: 'ENG-102 has been stalled for 52 hours, blocking 8 story points on the critical path.',
                  targetOwner: 'Sarah Jenkins'
                },
                {
                  priority: 'HIGH',
                  action: 'Merge shared utility PR #412 to unlock rate-limit retry logic on ENG-104.',
                  rationale: 'Alex Chen is double-blocked on both OAuth and rate-limiting streams.',
                  targetOwner: 'Alex Chen'
                }
              ],
              generatedAt: new Date().toISOString()
            } as unknown as T);
          }

          if (promptType === 'delivery_risks') {
            return resolve({
              promptType,
              title: 'Predictive Release Delivery & Fragility Analysis',
              summary: 'Release forecast indicates high delivery vulnerability with 6 days remaining. 32 story points remain unfinished with 2 major architectural blockers.',
              keyInsights: [
                'Burn rate deficit: 32 story points remaining across 6 days requires a team velocity of 5.3 pts/day vs current observed 1.2 pts/day.',
                'Documentation blindspot: 2 critical issues (including ENG-107 Blue/Green pipeline) lack Confluence specifications.',
                'Workload skew: Alex Chen and Sarah Jenkins carry 70% of sprint story points, exposing the team to SPOF burnout.'
              ],
              groundedReferences: {
                jiraKeys: ['ENG-102', 'ENG-104', 'ENG-107'],
                confluencePages: ['OAuth 2.0 PKCE & Forge Custom UI Architecture']
              },
              recommendedActions: [
                {
                  priority: 'URGENT',
                  action: 'Descope or postpone ENG-107 (Blue/Green deployment) to Sprint 43.',
                  rationale: 'ENG-107 is an unassigned 8-point story with no Confluence spec. Postponing frees 25% capacity.',
                  targetOwner: 'Engineering Manager'
                },
                {
                  priority: 'HIGH',
                  action: 'Pair Marcus Brody with Alex Chen on API Gateway rate-limit testing.',
                  rationale: 'Marcus Brody has spare capacity after completing Stripe webhook review.',
                  targetOwner: 'Marcus Brody'
                }
              ],
              generatedAt: new Date().toISOString()
            } as unknown as T);
          }

          return resolve({
            promptType: 'sprint_summary',
            title: 'Sprint Intelligence Summary: Sprint 42 - Cloud Scale',
            summary: 'Sprint is currently 71% healthy with 5 of 37 points completed (6 days left). Overall delivery confidence index is evaluated at 68% (MODERATE RISK).',
            keyInsights: [
              'Completed work: Automated E2E Playwright test harness (ENG-106) successfully delivered and verified.',
              'In review: Stripe idempotent webhook retry logic (ENG-103) is undergoing security review.',
              'Active bottlenecks: ENG-102 (Database pool starvation) and ENG-104 (API rate limits) require intervention.',
              'Unassigned backlog: 2 high-priority tickets totaling 11 points (ENG-107, ENG-108) need owner designation.'
            ],
            groundedReferences: {
              jiraKeys: ['ENG-101', 'ENG-102', 'ENG-103', 'ENG-104', 'ENG-106'],
              confluencePages: ['OAuth 2.0 PKCE & Forge Custom UI Architecture', 'Database Connection Pool Tuning & PgBouncer Guide']
            },
            recommendedActions: [
              {
                priority: 'URGENT',
                action: 'Convene immediate 15-minute Blocker Swarm on ENG-102.',
                rationale: 'Resolving database pool blockage unlocks 8 story points for downstream validation.',
                targetOwner: 'Sarah Jenkins'
              },
              {
                priority: 'HIGH',
                action: 'Assign ENG-108 (Audit compliance) to Elena Rostova.',
                rationale: 'Elena Rostova has available capacity and domain expertise in compliance event logging.',
                targetOwner: 'Elena Rostova'
              }
            ],
            generatedAt: new Date().toISOString()
          } as unknown as T);
        }

        default:
          return reject(new Error(`Unknown resolver function: ${functionKey}`));
      }
    }, 150);
  });
}
