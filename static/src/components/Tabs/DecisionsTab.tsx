import React, { useState } from 'react';
import { ArchitectureDecision } from '../../../../src/types/forge';
import {
  FileText,
  Plus,
  CheckCircle2,
  Clock,
  Archive,
  Link2,
  Tag,
  AlertTriangle,
  ExternalLink,
  X,
  BookOpen
} from 'lucide-react';

interface DecisionsTabProps {
  decisions: ArchitectureDecision[];
  onSaveDecision: (decision: Omit<ArchitectureDecision, 'id' | 'date'>) => Promise<void>;
  isLoading: boolean;
}

export const DecisionsTab: React.FC<DecisionsTabProps> = ({
  decisions,
  onSaveDecision,
  isLoading
}) => {
  const [filter, setFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [decisionText, setDecisionText] = useState('');
  const [consequences, setConsequences] = useState('');
  const [deciders, setDeciders] = useState('');
  const [jiraKeys, setJiraKeys] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<ArchitectureDecision['status']>('ACCEPTED');

  const filteredDecisions = decisions.filter(d => {
    if (filter === 'ALL') return true;
    return d.status === filter;
  });

  const getStatusBadge = (status: ArchitectureDecision['status']) => {
    switch (status) {
      case 'ACCEPTED':
        return 'bg-emerald-950/80 border-emerald-800 text-emerald-400';
      case 'PROPOSED':
        return 'bg-blue-950/80 border-blue-800 text-blue-400';
      case 'SUPERSEDED':
        return 'bg-amber-950/80 border-amber-800 text-amber-400';
      case 'DEPRECATED':
      default:
        return 'bg-rose-950/80 border-rose-800 text-rose-400';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !decisionText.trim()) return;

    await onSaveDecision({
      title,
      status,
      deciders: deciders.split(',').map(d => d.trim()).filter(Boolean),
      context,
      decision: decisionText,
      consequences,
      linkedJiraKeys: jiraKeys.split(',').map(k => k.trim()).filter(Boolean),
      linkedConfluencePageIds: [],
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setIsModalOpen(false);
    setTitle('');
    setContext('');
    setDecisionText('');
    setConsequences('');
    setDeciders('');
    setJiraKeys('');
    setTags('');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Architecture Decision Records (ADR Hub)
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Persistent technical decisions backed by Forge App Storage, linked directly to Jira epics & Confluence pages
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
            {['ALL', 'ACCEPTED', 'PROPOSED', 'SUPERSEDED'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-2 py-0.5 rounded font-mono font-medium transition-colors ${
                  filter === s
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log ADR</span>
          </button>
        </div>
      </div>

      {/* 2. Decisions List */}
      <div className="space-y-4">
        {filteredDecisions.map((adr) => (
          <div
            key={adr.id}
            className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                  {adr.id}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getStatusBadge(adr.status)}`}>
                  {adr.status}
                </span>
                <h3 className="text-base font-bold text-white">{adr.title}</h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">Date: {adr.date}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Context & Problem:</span>
                <p className="text-slate-200 mt-1 leading-relaxed">{adr.context}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Decision:</span>
                <p className="text-slate-100 mt-1 leading-relaxed">{adr.decision}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Consequences:</span>
                <p className="text-slate-200 mt-1 leading-relaxed">{adr.consequences}</p>
              </div>
            </div>

            {/* Deciders & Linked Artifacts */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 flex-wrap text-slate-400">
                <span>Deciders:</span>
                {adr.deciders.map(d => (
                  <span key={d} className="font-medium text-slate-200">{d}</span>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {adr.linkedJiraKeys.map(k => (
                  <span key={k} className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-950 border border-cyan-800/60 text-cyan-300 flex items-center gap-1">
                    <Link2 className="w-3 h-3" />
                    Jira: {k}
                  </span>
                ))}
                {adr.tags.map(t => (
                  <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-800/50 px-1.5 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Modal: Log New Architecture Decision */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Log Architecture Decision (ADR)</h3>
            <p className="text-xs text-slate-400 mb-4">
              Records a technical decision in Forge App Storage with cross-links to Jira tickets.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Adopt Redis Cluster for Distributed Session Cache"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="PROPOSED">PROPOSED</option>
                    <option value="SUPERSEDED">SUPERSEDED</option>
                    <option value="DEPRECATED">DEPRECATED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Deciders (comma-separated)</label>
                  <input
                    type="text"
                    value={deciders}
                    onChange={(e) => setDeciders(e.target.value)}
                    placeholder="Alex Chen, Sarah Jenkins"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Context & Problem</label>
                <textarea
                  required
                  rows={2}
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="What is the architectural context or limitation prompting this decision?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Decision</label>
                <textarea
                  required
                  rows={2}
                  value={decisionText}
                  onChange={(e) => setDecisionText(e.target.value)}
                  placeholder="What change or standard are we committing to?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Consequences & Tradeoffs</label>
                <textarea
                  rows={2}
                  value={consequences}
                  onChange={(e) => setConsequences(e.target.value)}
                  placeholder="What are the operational gains, costs, and risks?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Linked Jira Keys</label>
                  <input
                    type="text"
                    value={jiraKeys}
                    onChange={(e) => setJiraKeys(e.target.value)}
                    placeholder="ENG-101, ENG-104"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="database, redis, auth"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors disabled:opacity-50"
                >
                  Save ADR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
