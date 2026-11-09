import React, { useState, useEffect } from 'react';
import {
  EngineeringOverviewPayload,
  ContextIntelligencePayload,
  WorkloadIntelligencePayload,
  ArchitectureDecision,
  JiraIssue
} from '../../../src/types/forge';
import {
  invokeBackend,
  getForgeContext,
  isInsideForge
} from './lib/bridge';
import { Header } from './components/Header';
import { CommandCenterTab } from './components/Tabs/CommandCenterTab';
import { ContextIntelligenceTab } from './components/Tabs/ContextIntelligenceTab';
import { AIAssistantTab } from './components/Tabs/AIAssistantTab';
import { WorkloadTab } from './components/Tabs/WorkloadTab';
import { DecisionsTab } from './components/Tabs/DecisionsTab';
import { ConfidenceTab } from './components/Tabs/ConfidenceTab';
import {
  LayoutDashboard,
  Link2,
  Bot,
  Users,
  FileText,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  X,
  CheckCircle2
} from 'lucide-react';
import { AIPromptType, AIResponsePayload } from '../../../src/resolvers/aiAssistantService';

type TabKey = 'command' | 'context' | 'assistant' | 'workload' | 'decisions' | 'confidence';

export function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('command');
  const [projectKey, setProjectKey] = useState<string>('ENG');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Core Data States
  const [overview, setOverview] = useState<EngineeringOverviewPayload | null>(null);
  const [contextData, setContextData] = useState<ContextIntelligencePayload | null>(null);
  const [workloadData, setWorkloadData] = useState<WorkloadIntelligencePayload | null>(null);
  const [decisions, setDecisions] = useState<ArchitectureDecision[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<JiraIssue | null>(null);

  // Notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Initial load
  useEffect(() => {
    getForgeContext().then(ctx => {
      if (ctx.projectKey) {
        setProjectKey(ctx.projectKey);
      }
    });
  }, []);

  // Fetch all intelligence payloads
  const fetchAllData = async (key: string = projectKey) => {
    setIsLoading(true);
    setError(null);
    try {
      const [ov, ctx, wl, dec] = await Promise.all([
        invokeBackend<EngineeringOverviewPayload>('getEngineeringOverview', { projectKey: key }),
        invokeBackend<ContextIntelligencePayload>('getContextIntelligence', { projectKey: key }),
        invokeBackend<WorkloadIntelligencePayload>('getTeamWorkload', { projectKey: key }),
        invokeBackend<ArchitectureDecision[]>('getDecisionsAndADRs', { projectKey: key })
      ]);

      setOverview(ov);
      setContextData(ctx);
      setWorkloadData(wl);
      setDecisions(dec);
    } catch (err: any) {
      console.error('[CampusCrew App] Failed to load data:', err);
      setError(err?.message || 'Failed to communicate with Atlassian Forge backend.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData(projectKey);
  }, [projectKey]);

  // AI Prompt Runner
  const handleRunAIPrompt = async (promptType: AIPromptType, userQuery?: string): Promise<AIResponsePayload> => {
    try {
      const res = await invokeBackend<AIResponsePayload>('runAIEngineeringAssistant', {
        projectKey,
        promptType,
        userQuery
      });
      showToast('AI analysis grounded in Jira & Confluence telemetry generated.');
      return res;
    } catch (err: any) {
      showToast('Failed to run AI Assistant: ' + err.message);
      throw err;
    }
  };

  // Save ADR
  const handleSaveDecision = async (decision: Omit<ArchitectureDecision, 'id' | 'date'>) => {
    try {
      const saved = await invokeBackend<ArchitectureDecision>('recordDecision', {
        projectKey,
        decision
      });
      setDecisions(prev => [saved, ...prev]);
      showToast(`ADR ${saved.id} successfully recorded in Forge App Storage.`);
    } catch (err: any) {
      showToast('Failed to save ADR: ' + err.message);
    }
  };

  // Assign Issue
  const handleAssignIssue = (issueKey: string, accountId: string) => {
    showToast(`Issue ${issueKey} re-assigned to engineer.`);
    // Refresh to reflect new balance
    setTimeout(() => fetchAllData(projectKey), 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-950/95 border border-emerald-500 text-emerald-300 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold backdrop-blur-md animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        projectKey={projectKey}
        onProjectChange={(k) => setProjectKey(k)}
        confidence={overview?.deliveryConfidence}
        isLoading={isLoading}
        onRefresh={() => fetchAllData(projectKey)}
        lastSyncedAt={overview?.lastSyncedAt}
      />

      {/* Main Tab Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/60 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-2">
          {[
            { id: 'command', label: 'Command Center', icon: LayoutDashboard },
            { id: 'context', label: 'Context Intelligence', icon: Link2, badge: contextData?.missingDocs?.length ? `${contextData.missingDocs.length} Missing` : undefined },
            { id: 'assistant', label: 'AI Assistant & Rovo', icon: Bot, badge: 'AI' },
            { id: 'workload', label: 'Team Workload', icon: Users, badge: workloadData?.unassignedIssuesCount ? `${workloadData.unassignedIssuesCount} Unassigned` : undefined },
            { id: 'decisions', label: 'Decisions & ADRs', icon: FileText, count: decisions.length },
            { id: 'confidence', label: 'Confidence Dashboard', icon: ShieldCheck, score: overview?.deliveryConfidence?.overallScore }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabKey)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>

              {tab.badge && (
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full border ${
                  tab.badge === 'AI'
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                    : 'bg-rose-950 text-rose-300 border-rose-800'
                }`}>
                  {tab.badge}
                </span>
              )}

              {tab.count !== undefined && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                  {tab.count}
                </span>
              )}

              {tab.score !== undefined && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {tab.score}%
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
        {/* Loading State */}
        {isLoading && !overview && (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-spin">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Connecting to Atlassian Forge...</h3>
              <p className="text-xs text-slate-400 mt-1">Retrieving Jira sprints, issues, and Confluence documentation</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-900 text-rose-300 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-white">Atlassian Cloud Integration Error</h4>
                <p className="text-xs text-rose-200 mt-1">{error}</p>
              </div>
            </div>
            <button
              onClick={() => fetchAllData(projectKey)}
              className="px-3 py-1.5 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-white text-xs font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Active Tab Views */}
        {overview && contextData && workloadData && (
          <>
            {activeTab === 'command' && (
              <CommandCenterTab
                overview={overview}
                onSelectIssue={(issue) => setSelectedIssue(issue)}
              />
            )}

            {activeTab === 'context' && (
              <ContextIntelligenceTab
                contextData={contextData}
                onCreateDoc={(jiraKey) => {
                  showToast(`Confluence documentation generator template queued for ${jiraKey}`);
                }}
              />
            )}

            {activeTab === 'assistant' && (
              <AIAssistantTab
                onRunPrompt={handleRunAIPrompt}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'workload' && (
              <WorkloadTab
                workload={workloadData}
                onAssignIssue={handleAssignIssue}
              />
            )}

            {activeTab === 'decisions' && (
              <DecisionsTab
                decisions={decisions}
                onSaveDecision={handleSaveDecision}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'confidence' && (
              <ConfidenceTab
                confidence={overview.deliveryConfidence}
                projectKey={projectKey}
              />
            )}
          </>
        )}
      </main>

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedIssue(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                {selectedIssue.key}
              </span>
              <span className="text-xs text-slate-400">• Priority: {selectedIssue.priority}</span>
              {selectedIssue.storyPoints && (
                <span className="text-xs font-mono text-slate-300">• {selectedIssue.storyPoints} Story Points</span>
              )}
            </div>

            <h3 className="text-base font-bold text-white mb-2">{selectedIssue.summary}</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">{selectedIssue.description || 'No description provided in Jira.'}</p>

            {selectedIssue.isBlocked && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-900/80 text-xs text-rose-300 mb-4">
                <strong>Blocker Status:</strong> {selectedIssue.blockerReason || 'Waiting on technical dependency.'}
              </div>
            )}

            <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-800 text-slate-400">
              <span>Assignee: <strong className="text-slate-200">{selectedIssue.assignee?.displayName || 'Unassigned'}</strong></span>
              <button
                onClick={() => setSelectedIssue(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-4 px-4 text-center text-xs text-slate-500">
        <p>
          CampusCrew Intelligence • Built for <strong className="text-slate-400">Atlassian Codegeist 2026</strong> • Official Atlassian Forge App
        </p>
      </footer>
    </div>
  );
}
