import React, { useState } from 'react';
import {
  ContextIntelligencePayload,
  ContextLink,
  MissingDocumentationAlert
} from '../../../../src/types/forge';
import {
  BookOpen,
  Link2,
  AlertCircle,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  PlusCircle,
  Sparkles,
  Search,
  Clock,
  ArrowRight
} from 'lucide-react';

interface ContextIntelligenceTabProps {
  contextData: ContextIntelligencePayload;
  onCreateDoc?: (jiraKey: string) => void;
}

export const ContextIntelligenceTab: React.FC<ContextIntelligenceTabProps> = ({
  contextData,
  onCreateDoc
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const coverage = contextData.coveragePercentage || 0;

  const getScoreColor = () => {
    if (coverage >= 80) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20';
    if (coverage >= 60) return 'text-amber-400 border-amber-500/40 bg-amber-950/20';
    return 'text-rose-400 border-rose-500/40 bg-rose-950/20';
  };

  const filteredLinks = contextData.links.filter(
    link =>
      link.jiraIssueKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.jiraSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.confluenceTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Documentation Completeness & Coverage Engine (Evolved from DocumentationScoreGauge) */}
      <div className={`border rounded-2xl p-6 relative overflow-hidden ${getScoreColor()}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-300">
                Software Engineering Documentation Coverage Engine
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {coverage}% Documentation Completeness
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              {contextData.documentedIssuesCount} of {contextData.totalIssuesChecked} active sprint tickets are backed by verified Confluence specifications or ADRs.
              Target compliance threshold is <strong className="text-emerald-300">80%+</strong> prior to staging deployment.
            </p>
          </div>

          <div className="text-right">
            <div className="text-4xl font-black font-mono text-emerald-400">{coverage}%</div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              {coverage >= 80 ? 'Production Ready' : 'Documentation Gap'}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-900/80 h-3 rounded-full overflow-hidden mt-4 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700 rounded-full"
            style={{ width: `${coverage}%` }}
          />
        </div>
      </div>

      {/* 2. Missing Documentation Alerts (Critical Quality Gate) */}
      {contextData.missingDocs && contextData.missingDocs.length > 0 && (
        <div className="bg-rose-950/20 border border-rose-900/60 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Missing Documentation Alerts ({contextData.missingDocs.length})
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950 border border-rose-800 px-2 py-0.5 rounded">
              Requires Technical Spec
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-4">
            The following high-priority Jira issues are being built or deployed without linked Confluence architecture specs, PRDs, or runbooks:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {contextData.missingDocs.map((doc) => (
              <div
                key={doc.jiraIssueKey}
                className="bg-slate-900/90 border border-rose-900/60 rounded-xl p-4 flex flex-col justify-between hover:border-rose-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-rose-400 bg-rose-950 border border-rose-800 px-2 py-0.5 rounded">
                      {doc.jiraIssueKey}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {doc.riskScore} RISK
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-100">{doc.summary}</h4>
                  <p className="text-xs text-slate-400 mt-1">{doc.reason}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300">
                    Suggested: <strong className="text-emerald-400">{doc.suggestedDocType}</strong>
                  </span>
                  <button
                    onClick={() => onCreateDoc?.(doc.jiraIssueKey)}
                    className="flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Generate Spec</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Jira <-> Confluence Context Link Graph */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Verified Context Links ({contextData.links.length})
            </h3>
            <p className="text-xs text-slate-400">
              Bi-directional correlation between Jira issues and Confluence knowledgebase
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredLinks.map((link) => (
            <div
              key={`${link.jiraIssueKey}-${link.confluencePageId}`}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1 space-y-2">
                {/* Jira side */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                    {link.jiraIssueKey}
                  </span>
                  <span className="text-sm font-semibold text-slate-200">{link.jiraSummary}</span>
                </div>

                {/* Connection line */}
                <div className="flex items-center gap-2 text-xs text-slate-400 pl-4 border-l-2 border-emerald-500/40">
                  <Link2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-emerald-300 text-[11px] font-semibold">
                    {Math.round(link.relevanceScore * 100)}% Match
                  </span>
                  <span>— {link.matchReason}</span>
                </div>

                {/* Confluence side */}
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-medium text-blue-300 hover:underline cursor-pointer">
                    {link.confluenceTitle}
                  </span>
                </div>
              </div>

              {/* View Confluence button */}
              <a
                href={link.confluenceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium self-end md:self-center transition-colors"
              >
                <span>View Doc</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Stale Documentation Detector */}
      {contextData.staleDocs && contextData.staleDocs.length > 0 && (
        <div className="bg-amber-950/20 border border-amber-900/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Stale Documentation Detector</h3>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Confluence pages that have exceeded update cadence while linked Jira components evolved:
          </p>

          <div className="space-y-2">
            {contextData.staleDocs.map(stale => (
              <div key={stale.pageId} className="p-3 rounded-lg bg-slate-900/80 border border-amber-900/40 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-amber-200">{stale.title}</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">{stale.reason}</p>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  Cadence Expired
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
