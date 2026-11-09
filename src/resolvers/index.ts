/**
 * CampusCrew Intelligence — Forge Resolvers
 * Entry point for Forge Custom UI invocations via @forge/bridge
 */

import Resolver from '@forge/resolver';
import { jiraService } from './jiraService';
import { confluenceService } from './confluenceService';
import { workloadService } from './workloadService';
import { decisionService } from './decisionService';
import { aiAssistantService, AIPromptType } from './aiAssistantService';
import {
  EngineeringOverviewPayload,
  ContextIntelligencePayload,
  WorkloadIntelligencePayload,
  ArchitectureDecision,
  ConfidenceScoreBreakdown
} from '../types/forge';

const resolver = new Resolver();

/**
 * 1. Engineering Overview Resolver
 */
resolver.define('getEngineeringOverview', async (req): Promise<EngineeringOverviewPayload> => {
  const projectKey = req.payload?.projectKey || 'ENG';

  const [issues, sprint, pages] = await Promise.all([
    jiraService.getProjectIssues(projectKey),
    jiraService.getActiveSprint(projectKey),
    confluenceService.getPages(projectKey)
  ]);

  const blockers = jiraService.diagnoseBlockers(issues);
  const context = confluenceService.correlateContext(issues, pages);
  const workload = workloadService.computeTeamWorkload(issues);
  const deliveryConfidence = aiAssistantService.computeConfidenceScore(sprint, issues, blockers, context, workload);

  const issuesCount = {
    total: issues.length,
    todo: issues.filter(i => i.statusCategory === 'To Do').length,
    inProgress: issues.filter(i => i.statusCategory === 'In Progress').length,
    inReview: issues.filter(i => i.statusCategory === 'In Review').length,
    done: issues.filter(i => i.statusCategory === 'Done').length,
    blocked: issues.filter(i => i.statusCategory === 'Blocked' || i.isBlocked).length
  };

  return {
    project: {
      key: projectKey,
      name: `${projectKey} Engineering Platform`,
      lead: 'Alex Chen (Lead Architect)'
    },
    activeSprint: sprint,
    issuesCount,
    issues,
    blockers,
    deliveryConfidence,
    lastSyncedAt: new Date().toISOString()
  };
});

/**
 * 2. Context Intelligence & Confluence Correlation Resolver
 */
resolver.define('getContextIntelligence', async (req): Promise<ContextIntelligencePayload> => {
  const projectKey = req.payload?.projectKey || 'ENG';
  const [issues, pages] = await Promise.all([
    jiraService.getProjectIssues(projectKey),
    confluenceService.getPages(projectKey)
  ]);

  return confluenceService.correlateContext(issues, pages);
});

/**
 * 3. Team Workload Intelligence Resolver
 */
resolver.define('getTeamWorkload', async (req): Promise<WorkloadIntelligencePayload> => {
  const projectKey = req.payload?.projectKey || 'ENG';
  const issues = await jiraService.getProjectIssues(projectKey);
  return workloadService.computeTeamWorkload(issues);
});

/**
 * 4. Architecture Decision Records (ADR) Resolver
 */
resolver.define('getDecisionsAndADRs', async (req): Promise<ArchitectureDecision[]> => {
  const projectKey = req.payload?.projectKey || 'ENG';
  return decisionService.getDecisions(projectKey);
});

resolver.define('recordDecision', async (req): Promise<ArchitectureDecision> => {
  const projectKey = req.payload?.projectKey || 'ENG';
  const decision = req.payload?.decision;
  if (!decision || !decision.title || !decision.context) {
    throw new Error('Invalid decision payload: title and context are required.');
  }
  return decisionService.recordDecision(projectKey, decision);
});

/**
 * 5. AI Engineering Assistant Resolver
 */
resolver.define('runAIEngineeringAssistant', async (req) => {
  const projectKey = req.payload?.projectKey || 'ENG';
  const promptType: AIPromptType = req.payload?.promptType || 'sprint_summary';
  const userQuery = req.payload?.userQuery;

  const [issues, sprint, pages] = await Promise.all([
    jiraService.getProjectIssues(projectKey),
    jiraService.getActiveSprint(projectKey),
    confluenceService.getPages(projectKey)
  ]);

  const blockers = jiraService.diagnoseBlockers(issues);
  const context = confluenceService.correlateContext(issues, pages);
  const workload = workloadService.computeTeamWorkload(issues);

  return aiAssistantService.generateAIResponse(
    promptType,
    userQuery,
    sprint,
    issues,
    blockers,
    context,
    workload
  );
});

/**
 * 6. Confidence Score Resolver
 */
resolver.define('getConfidenceScore', async (req): Promise<ConfidenceScoreBreakdown> => {
  const projectKey = req.payload?.projectKey || 'ENG';
  const [issues, sprint, pages] = await Promise.all([
    jiraService.getProjectIssues(projectKey),
    jiraService.getActiveSprint(projectKey),
    confluenceService.getPages(projectKey)
  ]);

  const blockers = jiraService.diagnoseBlockers(issues);
  const context = confluenceService.correlateContext(issues, pages);
  const workload = workloadService.computeTeamWorkload(issues);

  return aiAssistantService.computeConfidenceScore(sprint, issues, blockers, context, workload);
});

export const handler = resolver.getDefinitions();

/**
 * Direct invocation helper for local execution, tests, and mock bridge.
 * Passes the official Forge Bridge protocol: { call: { functionKey, payload }, context }
 */
export async function invokeResolverDirectly(functionKey: string, payload: any = {}) {
  const defHandler = resolver.getDefinitions();
  const event = {
    call: {
      functionKey,
      payload
    },
    context: {
      accountId: 'usr-admin',
      siteUrl: 'https://campuscrew.atlassian.net'
    } as any
  };

  return defHandler(event);
}
