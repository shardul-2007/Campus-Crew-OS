/**
 * Decision & Knowledge Tracking Service (ADR Engine)
 * Manages Architecture Decision Records (ADRs) backed by Forge App Storage,
 * linking architectural choices directly to Jira epics and Confluence spaces.
 */

import { ArchitectureDecision, JiraIssue } from '../types/forge';

export const INITIAL_ADRS: ArchitectureDecision[] = [
  {
    id: 'ADR-001',
    title: 'Adopt Atlassian Forge OAuth PKCE & Least-Privilege Scopes',
    status: 'ACCEPTED',
    deciders: ['Alex Chen (Lead Architect)', 'Sarah Jenkins (Security Lead)'],
    date: '2026-11-01',
    context: 'Previous implementation stored tokens in custom cookies. We need enterprise-grade tenant boundary isolation and Atlassian 3LO compliance for Codegeist 2026.',
    decision: 'Migrate all backend invocations to Atlassian Forge OAuth 2.0 PKCE flow with strict least-privilege scopes (`read:jira-work`, `read:confluence-content.summary`, `storage:app`).',
    consequences: 'Eliminated secret leakage risks and cross-tenant data bleed. Requires all client calls to route through `@forge/bridge` and `@forge/resolver`.',
    linkedJiraKeys: ['ENG-101'],
    linkedConfluencePageIds: ['conf-201'],
    tags: ['security', 'auth', 'forge', 'compliance']
  },
  {
    id: 'ADR-002',
    title: 'Deploy PgBouncer Proxy Pool for PostgreSQL Database Scaling',
    status: 'ACCEPTED',
    deciders: ['Sarah Jenkins (SRE)', 'Marcus Brody (Backend)'],
    date: '2026-11-03',
    context: 'Heavy ingestion spikes from student chapter telemetry exceed maximum PostgreSQL client connections, starving web threads.',
    decision: 'Introduce PgBouncer in transaction pooling mode as a sidecar proxy between worker microservices and AWS RDS Aurora.',
    consequences: 'Supports 5,000+ virtual client connections on 100 physical database pool threads. Requires disabling session-level prepared statements.',
    linkedJiraKeys: ['ENG-102'],
    linkedConfluencePageIds: ['conf-202'],
    tags: ['database', 'postgres', 'scaling', 'performance']
  },
  {
    id: 'ADR-003',
    title: 'Stripe Webhook Idempotency via Distributed Redis Locks & SQS DLQ',
    status: 'ACCEPTED',
    deciders: ['Marcus Brody (Payments Lead)', 'Alex Chen (Architect)'],
    date: '2026-11-04',
    context: 'Duplicate webhook receipts during network partitions risk creating double ledger entries or multiple subscription activations.',
    decision: 'Implement Redis SETNX with 24-hour idempotent deduplication key and forward unresolvable failures to an Amazon SQS Dead Letter Queue (DLQ).',
    consequences: 'Guarantees strictly once billing execution. Requires Redis cluster high availability.',
    linkedJiraKeys: ['ENG-103'],
    linkedConfluencePageIds: ['conf-203'],
    tags: ['payments', 'idempotency', 'reliability']
  },
  {
    id: 'ADR-004',
    title: 'Realtime Document Synchronization via WebSocket State Clusters',
    status: 'PROPOSED',
    deciders: ['Elena Rostova (Frontend Lead)'],
    date: '2026-11-05',
    context: 'Engineers collaborating on live incident postmortems experience 5-10 second polling latency and sync collisions.',
    decision: 'Deploy persistent WebSocket connection pools with Operational Transformation / CRDT state reconciliation.',
    consequences: 'Sub-50ms latency updates. Incurs stateful connection memory overhead on cluster nodes.',
    linkedJiraKeys: ['ENG-105'],
    linkedConfluencePageIds: ['conf-204'],
    tags: ['realtime', 'websocket', 'crdt']
  }
];

export class DecisionService {
  private inMemoryAdrs: ArchitectureDecision[] = [...INITIAL_ADRS];

  /**
   * Retrieves all recorded ADRs for the project.
   * Pulls from Forge Storage if running in Cloud, or fallback store.
   */
  async getDecisions(projectKey: string = 'ENG'): Promise<ArchitectureDecision[]> {
    try {
      const forgeApi = await import('@forge/api').catch(() => null);
      if (forgeApi && forgeApi.storage && typeof forgeApi.storage.get === 'function') {
        const stored = await forgeApi.storage.get(`adrs:${projectKey}`);
        if (Array.isArray(stored) && stored.length > 0) {
          return stored;
        }
      }
    } catch (e) {
      console.warn('[DecisionService] Forge Storage get failed, using memory state:', e);
    }

    return this.inMemoryAdrs;
  }

  /**
   * Records or updates an Architecture Decision Record.
   */
  async recordDecision(
    projectKey: string,
    decision: Omit<ArchitectureDecision, 'id' | 'date'> & { id?: string; date?: string }
  ): Promise<ArchitectureDecision> {
    const id = decision.id || `ADR-00${this.inMemoryAdrs.length + 1}`;
    const date = decision.date || new Date().toISOString().split('T')[0];

    const newAdr: ArchitectureDecision = {
      ...decision,
      id,
      date
    };

    const existingIndex = this.inMemoryAdrs.findIndex(a => a.id === id);
    if (existingIndex >= 0) {
      this.inMemoryAdrs[existingIndex] = newAdr;
    } else {
      this.inMemoryAdrs.unshift(newAdr);
    }

    try {
      const forgeApi = await import('@forge/api').catch(() => null);
      if (forgeApi && forgeApi.storage && typeof forgeApi.storage.set === 'function') {
        await forgeApi.storage.set(`adrs:${projectKey}`, this.inMemoryAdrs);
      }
    } catch (e) {
      console.warn('[DecisionService] Forge Storage save failed:', e);
    }

    return newAdr;
  }

  /**
   * Identifies potentially stale documentation following accepted decisions.
   */
  detectOutdatedDocumentation(decisions: ArchitectureDecision[], issues: JiraIssue[]): {
    adrId: string;
    jiraKey: string;
    warning: string;
  }[] {
    const alerts: { adrId: string; jiraKey: string; warning: string }[] = [];

    for (const adr of decisions) {
      if (adr.status === 'ACCEPTED') {
        for (const jiraKey of adr.linkedJiraKeys) {
          const matchedIssue = issues.find(i => i.key === jiraKey);
          if (matchedIssue && matchedIssue.statusCategory === 'Done') {
            // Check if documentation is linked
            if (adr.linkedConfluencePageIds.length === 0) {
              alerts.push({
                adrId: adr.id,
                jiraKey,
                warning: `ADR ${adr.id} implementation completed in ${jiraKey}, but no official Confluence runbook is bound.`
              });
            }
          }
        }
      }
    }

    return alerts;
  }
}

export const decisionService = new DecisionService();
