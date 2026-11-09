/**
 * Confluence Service for CampusCrew Intelligence
 * Interfaces with Confluence Cloud REST API v2 & CQL search via Forge api.asUser()
 * Provides automated Context Linking, Missing Doc Detection, and Documentation Coverage Scoring.
 */

import {
  ConfluencePage,
  ContextLink,
  MissingDocumentationAlert,
  ContextIntelligencePayload,
  JiraIssue
} from '../types/forge';

export const MOCK_CONFLUENCE_PAGES: ConfluencePage[] = [
  {
    id: 'conf-201',
    title: 'OAuth 2.0 PKCE & Forge Custom UI Architecture',
    spaceKey: 'ARCH',
    spaceName: 'Engineering Architecture',
    url: 'https://campuscrew.atlassian.net/wiki/spaces/ARCH/pages/201',
    type: 'spec',
    lastModified: '2026-11-04T12:00:00.000Z',
    author: 'Alex Chen',
    excerpt: 'Detailed specification of OAuth 2.0 PKCE authorization code exchange within Atlassian Forge Custom UI iframe sandboxes.',
    labels: ['security', 'auth', 'oauth', 'forge'],
    version: 3
  },
  {
    id: 'conf-202',
    title: 'Database Connection Pool Tuning & PgBouncer Guide',
    spaceKey: 'OPS',
    spaceName: 'Site Reliability Engineering',
    url: 'https://campuscrew.atlassian.net/wiki/spaces/OPS/pages/202',
    type: 'runbook',
    lastModified: '2026-10-15T09:30:00.000Z', // Potentially stale!
    author: 'Sarah Jenkins',
    excerpt: 'Configuration parameters for RDS PostgreSQL connection limits, client transaction pooling, and PgBouncer proxy sidecars.',
    labels: ['database', 'postgres', 'pgbouncer', 'performance'],
    version: 1
  },
  {
    id: 'conf-203',
    title: 'Stripe Webhook Idempotency & Dead Letter Queue RFC',
    spaceKey: 'ARCH',
    spaceName: 'Engineering Architecture',
    url: 'https://campuscrew.atlassian.net/wiki/spaces/ARCH/pages/203',
    type: 'spec',
    lastModified: '2026-11-03T16:20:00.000Z',
    author: 'Marcus Brody',
    excerpt: 'Architectural design for deduplicating Stripe event payloads using Redis SETNX with 24-hour TTL and Amazon SQS DLQ fallback.',
    labels: ['payments', 'stripe', 'idempotency', 'queues'],
    version: 4
  },
  {
    id: 'conf-204',
    title: 'ADR-004: Realtime Collaborative Protocol Selection',
    spaceKey: 'ADR',
    spaceName: 'Architecture Decisions',
    url: 'https://campuscrew.atlassian.net/wiki/spaces/ADR/pages/204',
    type: 'adr',
    lastModified: '2026-11-02T11:00:00.000Z',
    author: 'Elena Rostova',
    excerpt: 'Decision record evaluating WebSockets vs Server-Sent Events vs WebRTC data channels for low-latency cursor synchronization.',
    labels: ['adr', 'websocket', 'realtime'],
    version: 2
  },
  {
    id: 'conf-205',
    title: 'Quality Engineering: Playwright Regression Testing Standard',
    spaceKey: 'QA',
    spaceName: 'Quality Assurance',
    url: 'https://campuscrew.atlassian.net/wiki/spaces/QA/pages/205',
    type: 'runbook',
    lastModified: '2026-11-05T14:45:00.000Z',
    author: 'Sarah Jenkins',
    excerpt: 'Standard operating procedure for authoring resilient end-to-end user journey tests with Playwright and visual snapshot diffing.',
    labels: ['qa', 'playwright', 'testing'],
    version: 2
  }
];

export class ConfluenceService {
  /**
   * Fetches Confluence pages for a space or via search.
   */
  async getPages(spaceKey: string = 'ENG'): Promise<ConfluencePage[]> {
    try {
      const forgeApi = await import('@forge/api').catch(() => null);
      if (forgeApi && forgeApi.api && typeof forgeApi.api.asUser === 'function') {
        const response = await forgeApi.api
          .asUser()
          .requestConfluence('/wiki/api/v2/pages?limit=50&status=current');

        if (response.status === 200) {
          const data = await response.json();
          if (data && Array.isArray(data.results)) {
            return data.results.map((p: any) => ({
              id: String(p.id),
              title: p.title,
              spaceKey: p.spaceId || spaceKey,
              url: `/wiki${p._links?.webui || ''}`,
              type: p.title.toLowerCase().startsWith('adr') ? 'adr' : p.title.toLowerCase().includes('runbook') ? 'runbook' : 'spec',
              lastModified: p.createdAt || new Date().toISOString(),
              author: p.authorId || 'Team',
              excerpt: p.title,
              labels: [],
              version: p.version?.number || 1
            }));
          }
        }
      }
    } catch (err) {
      console.warn('[ConfluenceService] Falling back to default Confluence pages:', err);
    }

    return MOCK_CONFLUENCE_PAGES;
  }

  /**
   * Correlates Jira issues to Confluence documentation.
   * Produces automated links, missing documentation alerts, and coverage metrics.
   */
  correlateContext(issues: JiraIssue[], pages: ConfluencePage[]): ContextIntelligencePayload {
    const links: ContextLink[] = [];
    const missingDocs: MissingDocumentationAlert[] = [];
    const documentedIssueKeys = new Set<string>();

    for (const issue of issues) {
      let bestMatch: { page: ConfluencePage; score: number; reason: string } | null = null;

      const issueTokens = this.tokenize(`${issue.summary} ${issue.components.join(' ')} ${issue.labels.join(' ')}`);

      for (const page of pages) {
        const pageTokens = this.tokenize(`${page.title} ${page.excerpt} ${page.labels.join(' ')}`);
        const overlap = issueTokens.filter(t => pageTokens.includes(t));
        const score = overlap.length / Math.max(1, Math.min(issueTokens.length, 6));

        if (score >= 0.35) {
          if (!bestMatch || score > bestMatch.score) {
            bestMatch = {
              page,
              score: Math.min(1.0, score),
              reason: `Matched key concepts: "${overlap.slice(0, 3).join(', ')}"`
            };
          }
        }
      }

      if (bestMatch && bestMatch.score >= 0.4) {
        documentedIssueKeys.add(issue.key);
        links.push({
          jiraIssueKey: issue.key,
          jiraSummary: issue.summary,
          confluencePageId: bestMatch.page.id,
          confluenceTitle: bestMatch.page.title,
          confluenceUrl: bestMatch.page.url,
          relevanceScore: Math.round(bestMatch.score * 100) / 100,
          matchReason: bestMatch.reason,
          isVerified: bestMatch.score >= 0.7
        });
      } else {
        // Issue is missing documentation!
        if (issue.priority === 'Highest' || issue.priority === 'High' || issue.storyPoints && issue.storyPoints >= 5) {
          let suggestedDocType: MissingDocumentationAlert['suggestedDocType'] = 'Architecture Spec';
          let riskScore: MissingDocumentationAlert['riskScore'] = 'WARNING';

          if (issue.issueType === 'Bug' && issue.priority === 'Highest') {
            suggestedDocType = 'Runbook / SOP';
            riskScore = 'CRITICAL';
          } else if (issue.components.includes('Infrastructure') || issue.labels.includes('devops')) {
            suggestedDocType = 'Architecture Spec';
            riskScore = 'CRITICAL';
          } else if (issue.labels.includes('compliance') || issue.labels.includes('security')) {
            suggestedDocType = 'PRD / Requirements';
            riskScore = 'CRITICAL';
          }

          missingDocs.push({
            jiraIssueKey: issue.key,
            summary: issue.summary,
            priority: issue.priority as any,
            assignee: issue.assignee?.displayName,
            suggestedDocType,
            riskScore,
            reason: `No Confluence architectural specification found for ${issue.priority} priority ${issue.issueType}.`
          });
        }
      }
    }

    const coveragePercentage = issues.length > 0
      ? Math.round((documentedIssueKeys.size / issues.length) * 100)
      : 100;

    // Detect stale documentation
    const staleDocs = pages
      .filter(p => {
        const ageDays = (Date.now() - new Date(p.lastModified).getTime()) / (1000 * 60 * 60 * 24);
        return ageDays > 20 && p.type === 'runbook';
      })
      .map(p => ({
        pageId: p.id,
        title: p.title,
        lastUpdated: p.lastModified,
        reason: 'Runbook has not been reviewed within the 30-day compliance cadence.'
      }));

    return {
      totalIssuesChecked: issues.length,
      documentedIssuesCount: documentedIssueKeys.size,
      coveragePercentage,
      links,
      missingDocs,
      staleDocs
    };
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !STOP_WORDS.has(w));
  }
}

const STOP_WORDS = new Set([
  'and', 'the', 'for', 'with', 'from', 'this', 'that', 'with', 'from', 'into',
  'during', 'over', 'under', 'flow', 'task', 'story', 'issue', 'test'
]);

export const confluenceService = new ConfluenceService();
