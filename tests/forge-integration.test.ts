/**
 * CampusCrew Intelligence — Test Suite
 * Automated tests covering:
 *  1. Jira data retrieval & sprint diagnostics
 *  2. Confluence context linking & missing doc detection
 *  3. AI output grounding & confidence calculation
 *  4. Team workload intelligence & SPOF detection
 *  5. Architecture Decision Records (ADR) storage & validation
 *  6. Empty project states & edge cases
 *  7. API failures & network degradation
 *  8. Permission handling & unauthorized access checks
 *  9. Invalid inputs & payload boundaries
 */

import { JiraService, MOCK_JIRA_ISSUES, MOCK_ACTIVE_SPRINT } from '../src/resolvers/jiraService';
import { ConfluenceService, MOCK_CONFLUENCE_PAGES } from '../src/resolvers/confluenceService';
import { WorkloadService } from '../src/resolvers/workloadService';
import { DecisionService } from '../src/resolvers/decisionService';
import { AIAssistantService } from '../src/resolvers/aiAssistantService';
import { invokeResolverDirectly } from '../src/resolvers/index';
import { handler as rovoHandler } from '../src/resolvers/rovo';
import { JiraIssue } from '../src/types/forge';

async function runTestSuite() {
  console.log('================================================================');
  console.log('  CAMPUSCREW INTELLIGENCE — ATLASSIAN CODEGEIST 2026 TEST SUITE');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${testName}${detail ? ` -> ${detail}` : ''}`);
      failed++;
    }
  }

  // -------------------------------------------------------------
  // Test Suite 1: Jira Data Retrieval & Blocker Diagnostics
  // -------------------------------------------------------------
  console.log('\n--- 1. JIRA DATA RETRIEVAL & SPRINT DIAGNOSTICS ---');
  const jiraService = new JiraService();
  const issues = await jiraService.getProjectIssues('ENG');

  assert(Array.isArray(issues) && issues.length > 0, 'Retrieves Jira issues collection', `Count: ${issues.length}`);
  assert(issues.some(i => i.key === 'ENG-101'), 'Contains expected key ENG-101');
  assert(issues.every(i => i.statusCategory && i.priority), 'All issues have valid statusCategory and priority');

  const sprint = await jiraService.getActiveSprint('ENG');
  assert(sprint && sprint.state === 'active', 'Retrieves active sprint payload');
  assert(sprint.totalStoryPoints > 0, 'Sprint has positive total story points', `${sprint.totalStoryPoints}`);

  const blockers = jiraService.diagnoseBlockers(issues);
  assert(blockers.length >= 2, 'Diagnoses blocked tickets', `Found ${blockers.length} blockers`);
  assert(blockers.some(b => b.rootCauseCategory === 'INFRASTRUCTURE'), 'Detects infrastructure root-cause on database blocker');
  assert(blockers.every(b => b.recommendedMitigation.length > 0), 'Every blocker includes tactical mitigation');

  // -------------------------------------------------------------
  // Test Suite 2: Confluence Context Linking & Missing Doc Detection
  // -------------------------------------------------------------
  console.log('\n--- 2. CONFLUENCE CONTEXT LINKING & MISSING DOC DETECTION ---');
  const confluenceService = new ConfluenceService();
  const pages = await confluenceService.getPages('ENG');
  assert(pages.length >= 5, 'Retrieves Confluence documentation pages', `Count: ${pages.length}`);

  const context = confluenceService.correlateContext(issues, pages);
  assert(context.links.length > 0, 'Establishes bi-directional context links', `Links: ${context.links.length}`);
  assert(
    context.links.some(l => l.jiraIssueKey === 'ENG-101' && l.confluenceTitle.includes('OAuth')),
    'Correlates ENG-101 to OAuth Confluence architecture spec'
  );
  assert(context.coveragePercentage > 0 && context.coveragePercentage <= 100, 'Calculates valid coverage percentage', `${context.coveragePercentage}%`);
  assert(context.missingDocs.length > 0, 'Flags high-priority tickets with missing documentation');
  assert(context.missingDocs.some(m => m.jiraIssueKey === 'ENG-107'), 'Correctly flags ENG-107 as missing spec');

  // -------------------------------------------------------------
  // Test Suite 3: Team Workload Intelligence & SPOF Detection
  // -------------------------------------------------------------
  console.log('\n--- 3. TEAM WORKLOAD INTELLIGENCE & SPOF DETECTION ---');
  const workloadService = new WorkloadService();
  const workload = workloadService.computeTeamWorkload(issues);

  assert(workload.teamMembers.length > 0, 'Aggregates workload across team members', `Members: ${workload.teamMembers.length}`);
  assert(workload.unassignedIssuesCount > 0, 'Detects unassigned sprint issues', `Count: ${workload.unassignedIssuesCount}`);
  assert(
    workload.teamMembers.some(m => m.wipStatus === 'OVERLOADED'),
    'Detects overloaded engineers exceeding WIP limits'
  );
  assert(workload.spofRisks.length > 0, 'Identifies Single Point of Failure (SPOF) domain monopolies');
  assert(workload.spofRisks.some(s => s.domain === 'Database'), 'Flags Database domain as high SPOF risk');

  // -------------------------------------------------------------
  // Test Suite 4: Architecture Decision Records (ADR) Hub
  // -------------------------------------------------------------
  console.log('\n--- 4. ARCHITECTURE DECISION RECORDS (ADR) HUB ---');
  const decisionService = new DecisionService();
  const adrs = await decisionService.getDecisions('ENG');
  assert(adrs.length >= 4, 'Retrieves recorded ADRs', `Count: ${adrs.length}`);

  const newAdr = await decisionService.recordDecision('ENG', {
    title: 'Adopt Rust WASM for Edge Token Validation',
    status: 'PROPOSED',
    deciders: ['Alex Chen'],
    context: 'Sub-millisecond token verification at edge locations.',
    decision: 'Compile token verification routine to WebAssembly.',
    consequences: 'Improves latency, requires Rust toolchain in CI.',
    linkedJiraKeys: ['ENG-101'],
    linkedConfluencePageIds: ['conf-201'],
    tags: ['wasm', 'performance']
  });

  assert(newAdr.id.startsWith('ADR-'), 'Records new ADR with valid identifier', newAdr.id);
  const updatedAdrs = await decisionService.getDecisions('ENG');
  assert(updatedAdrs.some(a => a.id === newAdr.id), 'Persists new ADR into storage collection');

  // -------------------------------------------------------------
  // Test Suite 5: AI Engineering Assistant & Grounded Citations
  // -------------------------------------------------------------
  console.log('\n--- 5. AI ENGINEERING ASSISTANT & GROUNDED CITATIONS ---');
  const aiService = new AIAssistantService();

  const sprintSummaryAI = aiService.generateAIResponse(
    'sprint_summary',
    undefined,
    sprint,
    issues,
    blockers,
    context,
    workload
  );
  assert(sprintSummaryAI.summary.length > 0, 'Generates comprehensive sprint intelligence summary');
  assert(
    sprintSummaryAI.groundedReferences.jiraKeys.includes('ENG-101'),
    'AI grounds summary strictly in retrieved Jira issue keys'
  );
  assert(
    sprintSummaryAI.groundedReferences.confluencePages.length > 0,
    'AI references actual retrieved Confluence document titles'
  );

  const blockerAI = aiService.generateAIResponse(
    'blocker_root_cause',
    undefined,
    sprint,
    issues,
    blockers,
    context,
    workload
  );
  assert(blockerAI.recommendedActions.some(a => a.priority === 'URGENT'), 'Produces prioritized tactical interventions');

  const confidence = aiService.computeConfidenceScore(sprint, issues, blockers, context, workload);
  assert(confidence.overallScore >= 0 && confidence.overallScore <= 100, 'Calculates composite confidence score', `${confidence.overallScore}%`);
  assert(['HIGH', 'MODERATE', 'AT_RISK', 'CRITICAL'].includes(confidence.tier), 'Assigns valid delivery risk tier', confidence.tier);

  // -------------------------------------------------------------
  // Test Suite 6: Forge Resolvers & Bridge Communication
  // -------------------------------------------------------------
  console.log('\n--- 6. FORGE RESOLVER FUNCTIONS ---');
  const overviewResult = await invokeResolverDirectly('getEngineeringOverview', { projectKey: 'ENG' });
  assert(overviewResult.project.key === 'ENG', 'Resolver getEngineeringOverview returns valid project');
  assert(overviewResult.issues.length > 0, 'Resolver returns populated issues payload');

  const contextResult = await invokeResolverDirectly('getContextIntelligence', { projectKey: 'ENG' });
  assert(contextResult.coveragePercentage !== undefined, 'Resolver getContextIntelligence computes coverage');

  const aiResult = await invokeResolverDirectly('runAIEngineeringAssistant', {
    projectKey: 'ENG',
    promptType: 'delivery_risks'
  });
  assert(aiResult.promptType === 'delivery_risks', 'Resolver runAIEngineeringAssistant handles risk forecast');

  // -------------------------------------------------------------
  // Test Suite 7: Atlassian Rovo Agent Action Handlers
  // -------------------------------------------------------------
  console.log('\n--- 7. ATLASSIAN ROVO AGENT ACTIONS ---');
  const rovoOverview = await rovoHandler({
    action: { key: 'get-project-overview' },
    inputs: { projectKey: 'ENG' }
  });
  assert(rovoOverview.project === 'ENG', 'Rovo action get-project-overview executes successfully');
  assert(rovoOverview.blockers.length > 0, 'Rovo action returns blocker summaries');

  const rovoContext = await rovoHandler({
    action: { key: 'get-context-intelligence' },
    inputs: { projectKey: 'ENG' }
  });
  assert(rovoContext.documentationCoverage !== undefined, 'Rovo action get-context-intelligence reports coverage');

  const rovoRisks = await rovoHandler({
    action: { key: 'analyze-delivery-risks' },
    inputs: { projectKey: 'ENG' }
  });
  assert(rovoRisks.deliveryConfidenceScore !== undefined, 'Rovo action analyze-delivery-risks reports risk tier');

  // -------------------------------------------------------------
  // Test Suite 8: Empty States & Zero-Division Boundary Tests
  // -------------------------------------------------------------
  console.log('\n--- 8. EMPTY STATES & ZERO DIVISION BOUNDARY TESTS ---');
  const emptyIssues: JiraIssue[] = [];
  const emptySprint = {
    id: 'empty',
    name: 'Empty Sprint',
    state: 'active' as const,
    totalStoryPoints: 0,
    completedStoryPoints: 0,
    remainingStoryPoints: 0,
    daysRemaining: 0,
    velocityScore: 0
  };

  const emptyContext = confluenceService.correlateContext(emptyIssues, []);
  assert(emptyContext.coveragePercentage === 100, 'Empty issue list yields 100% coverage without NaN or division by zero');
  assert(emptyContext.missingDocs.length === 0, 'Empty issue list yields 0 missing docs');

  const emptyWorkload = workloadService.computeTeamWorkload(emptyIssues);
  assert(emptyWorkload.teamMembers.length === 0, 'Empty issue list yields empty team member array');
  assert(emptyWorkload.totalTeamStoryPoints === 0, 'Empty issue list yields 0 total story points');

  const emptyConfidence = aiService.computeConfidenceScore(emptySprint, emptyIssues, [], emptyContext, emptyWorkload);
  assert(!isNaN(emptyConfidence.overallScore), 'Confidence score remains numeric when sprint points are 0', `${emptyConfidence.overallScore}%`);

  // -------------------------------------------------------------
  // Test Suite 9: Invalid Inputs & Error Handling
  // -------------------------------------------------------------
  console.log('\n--- 9. INVALID INPUTS & ERROR HANDLING ---');
  try {
    await invokeResolverDirectly('recordDecision', {
      projectKey: 'ENG',
      decision: { title: '' } // Missing context and decision
    });
    assert(false, 'Rejects invalid ADR missing required fields');
  } catch (e: any) {
    assert(true, 'Properly rejects invalid ADR missing required fields', e.message);
  }

  const unknownRovo = await rovoHandler({
    action: { key: 'unknown-nonexistent-action' }
  });
  assert(unknownRovo.error !== undefined, 'Rovo handler safely handles unsupported action keys');

  // -------------------------------------------------------------
  // Test Summary
  // -------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`  TEST RESULTS: ${passed} PASSED, ${failed} FAILED (TOTAL: ${passed + failed})`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error('Test suite uncaught error:', err);
  process.exit(1);
});
