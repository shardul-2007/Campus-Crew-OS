/**
 * CampusCrew Intelligence — Atlassian Rovo Agent Action Handlers
 * Exposes actions to Atlassian Rovo conversational agent to query project health,
 * context intelligence, and delivery risks directly in Jira & Confluence.
 */

import { jiraService } from './jiraService';
import { confluenceService } from './confluenceService';
import { workloadService } from './workloadService';
import { aiAssistantService } from './aiAssistantService';

export async function handler(event: any) {
  const actionKey = event?.action?.key || event?.actionKey || event?.key;
  const projectKey = event?.inputs?.projectKey || 'ENG';

  console.log(`[RovoAction] Invoked action: ${actionKey} for project: ${projectKey}`);

  const [issues, sprint, pages] = await Promise.all([
    jiraService.getProjectIssues(projectKey),
    jiraService.getActiveSprint(projectKey),
    confluenceService.getPages(projectKey)
  ]);

  const blockers = jiraService.diagnoseBlockers(issues);
  const context = confluenceService.correlateContext(issues, pages);
  const workload = workloadService.computeTeamWorkload(issues);

  switch (actionKey) {
    case 'get-project-overview': {
      return {
        project: projectKey,
        sprint: {
          name: sprint.name,
          state: sprint.state,
          remainingDays: sprint.daysRemaining,
          completedStoryPoints: sprint.completedStoryPoints,
          totalStoryPoints: sprint.totalStoryPoints,
          velocityScore: `${sprint.velocityScore}%`
        },
        issueSummary: {
          total: issues.length,
          inProgress: issues.filter(i => i.statusCategory === 'In Progress').length,
          blocked: blockers.length,
          done: issues.filter(i => i.statusCategory === 'Done').length
        },
        blockers: blockers.map(b => ({
          key: b.issueKey,
          summary: b.summary,
          ageHours: b.blockerAgeHours,
          mitigation: b.recommendedMitigation
        }))
      };
    }

    case 'get-context-intelligence': {
      return {
        documentationCoverage: `${context.coveragePercentage}%`,
        totalIssues: context.totalIssuesChecked,
        documentedIssues: context.documentedIssuesCount,
        missingDocumentationAlerts: context.missingDocs.map(m => ({
          key: m.jiraIssueKey,
          summary: m.summary,
          risk: m.riskScore,
          suggestedDocType: m.suggestedDocType
        })),
        verifiedLinks: context.links.slice(0, 5).map(l => ({
          jira: l.jiraIssueKey,
          confluence: l.confluenceTitle,
          relevance: `${Math.round(l.relevanceScore * 100)}%`
        }))
      };
    }

    case 'analyze-delivery-risks': {
      const confidence = aiAssistantService.computeConfidenceScore(sprint, issues, blockers, context, workload);
      return {
        deliveryConfidenceScore: `${confidence.overallScore}%`,
        riskTier: confidence.tier,
        summary: confidence.summary,
        criticalRisks: confidence.keyRisks,
        topRecommendations: confidence.topRecommendations,
        spofDomains: workload.spofRisks.map(s => `${s.domain} (Owner: ${s.soleOwner})`)
      };
    }

    default: {
      return {
        error: `Action "${actionKey}" is not recognized by CampusCrew Rovo Agent.`,
        availableActions: ['get-project-overview', 'get-context-intelligence', 'analyze-delivery-risks']
      };
    }
  }
}
