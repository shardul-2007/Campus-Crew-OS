import React, { useState } from 'react';
import {
  AIPromptType,
  AIResponsePayload
} from '../../../../src/resolvers/aiAssistantService';
import {
  Sparkles,
  Bot,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Send,
  Link2,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Cpu,
  FileText
} from 'lucide-react';

interface AIAssistantTabProps {
  onRunPrompt: (promptType: AIPromptType, userQuery?: string) => Promise<AIResponsePayload>;
  initialResponse?: AIResponsePayload;
  isLoading: boolean;
}

export const AIAssistantTab: React.FC<AIAssistantTabProps> = ({
  onRunPrompt,
  initialResponse,
  isLoading
}) => {
  const [activePrompt, setActivePrompt] = useState<AIPromptType>('sprint_summary');
  const [userQuery, setUserQuery] = useState('');
  const [response, setResponse] = useState<AIResponsePayload | undefined>(initialResponse);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleSelectPrompt = async (type: AIPromptType) => {
    setActivePrompt(type);
    setIsExecuting(true);
    try {
      const res = await onRunPrompt(type);
      setResponse(res);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim() || isExecuting) return;
    setIsExecuting(true);
    try {
      const res = await onRunPrompt('freeform', userQuery);
      setResponse(res);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-800/40 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 shrink-0">
              <Bot className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">AI Engineering Assistant</h2>
                <span className="text-[10px] uppercase font-mono font-bold bg-cyan-950 border border-cyan-700/60 text-cyan-300 px-2 py-0.5 rounded-full">
                  Rovo Integrated
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Synthesizes real-time Jira sprint telemetry, Confluence documentation, and developer workload into
                grounded, zero-hallucination operational recommendations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-400">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Grounded in Atlassian 3LO Context</span>
          </div>
        </div>

        {/* Quick Action Prompts */}
        <div className="flex items-center gap-2 mt-5 flex-wrap">
          {[
            { id: 'sprint_summary', label: 'Sprint Summary & Health', icon: Sparkles },
            { id: 'blocker_root_cause', label: 'Blocker Root-Cause Diagnostics', icon: ShieldAlert },
            { id: 'delivery_risks', label: 'Delivery Risk Forecast', icon: AlertTriangle }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => handleSelectPrompt(p.id as AIPromptType)}
              disabled={isExecuting || isLoading}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePrompt === p.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <p.icon className="w-3.5 h-3.5" />
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Custom Query Input */}
      <form onSubmit={handleCustomSubmit} className="relative">
        <input
          type="text"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Ask anything about sprint status, blocker root causes, or Confluence docs..."
          className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-4 pr-24 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-inner"
        />
        <button
          type="submit"
          disabled={!userQuery.trim() || isExecuting}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors disabled:opacity-40"
        >
          {isExecuting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          <span>Ask AI</span>
        </button>
      </form>

      {/* 3. AI Generated Insights Display */}
      {response && (
        <div className="space-y-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                  {response.promptType.replace(/_/g, ' ')}
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">{response.title}</h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                Generated: {new Date(response.generatedAt).toLocaleTimeString()}
              </span>
            </div>

            {/* Executive Summary */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-sm text-slate-200 leading-relaxed">
              {response.summary}
            </div>

            {/* Key Telemetry Insights */}
            <div className="mt-5 space-y-2">
              <h4 className="text-xs font-mono uppercase font-bold text-slate-400">Key Context Insights:</h4>
              <div className="grid grid-cols-1 gap-2">
                {response.keyInsights.map((insight, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grounded Atlassian Context Citations */}
            <div className="mt-5 p-4 rounded-xl bg-slate-950/90 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 uppercase mb-2">
                <Link2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Grounded Atlassian References (Zero-Hallucination Evidence)</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {response.groundedReferences.jiraKeys.map(k => (
                  <span key={k} className="px-2.5 py-1 rounded-md font-mono font-bold bg-slate-900 border border-slate-700 text-cyan-300 flex items-center gap-1">
                    Jira: {k}
                  </span>
                ))}
                {response.groundedReferences.confluencePages.map(p => (
                  <span key={p} className="px-2.5 py-1 rounded-md font-mono bg-slate-900 border border-slate-700 text-blue-300 flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Confluence: {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Actionable Recommendations Table */}
            {response.recommendedActions && response.recommendedActions.length > 0 && (
              <div className="mt-5 space-y-2">
                <h4 className="text-xs font-mono uppercase font-bold text-slate-400">
                  Recommended Tactical Interventions:
                </h4>
                <div className="space-y-2">
                  {response.recommendedActions.map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-700 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                              rec.priority === 'URGENT'
                                ? 'bg-rose-950 text-rose-400 border-rose-800'
                                : rec.priority === 'HIGH'
                                ? 'bg-amber-950 text-amber-400 border-amber-800'
                                : 'bg-blue-950 text-blue-400 border-blue-800'
                            }`}
                          >
                            {rec.priority}
                          </span>
                          <span className="text-sm font-semibold text-slate-100">{rec.action}</span>
                        </div>
                        <p className="text-xs text-slate-400 pl-2 border-l border-slate-800">{rec.rationale}</p>
                      </div>

                      {rec.targetOwner && (
                        <div className="text-xs text-slate-300 font-mono self-end md:self-center bg-slate-950 px-2.5 py-1 rounded border border-slate-800 shrink-0">
                          Assignee: <strong className="text-emerald-400">{rec.targetOwner}</strong>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
