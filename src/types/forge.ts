/**
 * CampusCrew Intelligence — Atlassian Forge Types
 * Defines data structures for Jira, Confluence, Rovo, and Engineering Intelligence
 */

export type IssueStatusCategory = 'To Do' | 'In Progress' | 'In Review' | 'Done' | 'Blocked';

export interface JiraIssue {
  id: string;
  key: string;
  summary: string;
  description?: string;
  status: string;
  statusCategory: IssueStatusCategory;
  issueType: 'Bug' | 'Story' | 'Task' | 'Epic' | 'Sub-task';
  priority: 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
  assignee?: {
    accountId: string;
    displayName: string;
    emailAddress?: string;
    avatarUrl?: string;
  };
  reporter?: {
    accountId: string;
    displayName: string;
    avatarUrl?: string;
  };
  created: string;
  updated: string;
  storyPoints?: number;
  epicKey?: string;
  epicName?: string;
  labels: string[];
  components: string[];
  sprintId?: string;
  sprintName?: string;
  isBlocked: boolean;
  blockerReason?: string;
  blockerAgeHours?: number;
}

export interface JiraSprint {
  id: string;
  name: string;
  state: 'active' | 'future' | 'closed';
  startDate?: string;
  endDate?: string;
  completeDate?: string;
  goal?: string;
  totalStoryPoints: number;
  completedStoryPoints: number;
  remainingStoryPoints: number;
  daysRemaining: number;
  velocityScore: number; // 0-100%
}

export interface ConfluencePage {
  id: string;
  title: string;
  spaceKey: string;
  spaceName?: string;
  url: string;
  type: 'spec' | 'adr' | 'runbook' | 'meeting' | 'general';
  lastModified: string;
  author: string;
  excerpt: string;
  labels: string[];
  version: number;
}

export interface ContextLink {
  jiraIssueKey: string;
  jiraSummary: string;
  confluencePageId: string;
  confluenceTitle: string;
  confluenceUrl: string;
  relevanceScore: number; // 0 - 1.0
  matchReason: string;
  isVerified: boolean;
}

export interface MissingDocumentationAlert {
  jiraIssueKey: string;
  summary: string;
  priority: 'Highest' | 'High' | 'Medium';
  assignee?: string;
  suggestedDocType: 'Architecture Spec' | 'PRD / Requirements' | 'Runbook / SOP' | 'API Contract';
  riskScore: 'CRITICAL' | 'WARNING' | 'MODERATE';
  reason: string;
}

export interface TeamMemberWorkload {
  accountId: string;
  displayName: string;
  avatarUrl?: string;
  role: string;
  activeIssuesCount: number;
  inProgressIssuesCount: number;
  reviewIssuesCount: number;
  blockedIssuesCount: number;
  totalStoryPoints: number;
  wipStatus: 'OPTIMAL' | 'NEAR_CAPACITY' | 'OVERLOADED';
  wipRiskDescription?: string;
  assignedDomains: string[];
}

export interface ArchitectureDecision {
  id: string;
  title: string;
  status: 'PROPOSED' | 'ACCEPTED' | 'SUPERSEDED' | 'DEPRECATED';
  deciders: string[];
  date: string;
  context: string;
  decision: string;
  consequences: string;
  linkedJiraKeys: string[];
  linkedConfluencePageIds: string[];
  tags: string[];
}

export interface BlockerDiagnostic {
  issueKey: string;
  summary: string;
  assignee: string;
  blockerAgeHours: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  rootCauseCategory: 'DEPENDENCY' | 'PR_REVIEW' | 'EXTERNAL_API' | 'UNSPECIFIED_REQUIREMENTS' | 'INFRASTRUCTURE';
  rootCauseAnalysis: string;
  recommendedMitigation: string;
}

export interface ConfidenceScoreBreakdown {
  overallScore: number; // 0-100
  tier: 'HIGH' | 'MODERATE' | 'AT_RISK' | 'CRITICAL';
  factors: {
    sprintVelocity: { score: number; weight: number; impact: string };
    blockerHealth: { score: number; weight: number; impact: string };
    docCoverage: { score: number; weight: number; impact: string };
    workloadBalance: { score: number; weight: number; impact: string };
  };
  summary: string;
  keyRisks: string[];
  topRecommendations: string[];
}

export interface EngineeringOverviewPayload {
  project: {
    key: string;
    name: string;
    lead: string;
    avatarUrl?: string;
  };
  activeSprint?: JiraSprint;
  issuesCount: {
    total: number;
    todo: number;
    inProgress: number;
    inReview: number;
    done: number;
    blocked: number;
  };
  issues: JiraIssue[];
  blockers: BlockerDiagnostic[];
  deliveryConfidence: ConfidenceScoreBreakdown;
  lastSyncedAt: string;
}

export interface ContextIntelligencePayload {
  totalIssuesChecked: number;
  documentedIssuesCount: number;
  coveragePercentage: number;
  links: ContextLink[];
  missingDocs: MissingDocumentationAlert[];
  staleDocs: {
    pageId: string;
    title: string;
    lastUpdated: string;
    reason: string;
  }[];
}

export interface WorkloadIntelligencePayload {
  teamMembers: TeamMemberWorkload[];
  totalTeamStoryPoints: number;
  unassignedIssuesCount: number;
  unassignedIssues: {
    key: string;
    summary: string;
    priority: string;
    storyPoints?: number;
  }[];
  spofRisks: {
    domain: string;
    soleOwner: string;
    riskLevel: 'HIGH' | 'MEDIUM';
    detail: string;
  }[];
}
