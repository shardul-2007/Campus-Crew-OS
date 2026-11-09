'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  EventRecord,
  EventStage,
  EventTeamMember,
  EventChecklist,
  EventProof,
  EventWinner,
  EventParticipant,
  EventReport,
  EventFeedback,
  EventImprovement,
  Profile,
  LifecycleStage,
  ProofType,
  Certificate
} from '@/types/database';
import { CertificateManager } from '@/components/certificates/CertificateGeneratorModal';
import { EventStatusBadge } from './EventStatusBadge';
import { LifecycleBar } from './LifecycleBar';
import { DocumentationScoreGauge } from './DocumentationScoreGauge';
import { Button } from '@/components/ui/button';
import {
  submitEventAction,
  approveEventAction,
  requestChangesAction,
  rejectEventAction,
  transitionLifecycleStageAction,
  toggleChecklistItemAction,
  addTeamMemberAction,
  submitReportAction,
  addFeedbackAction,
  saveImprovementAction
} from '@/lib/actions/events';
import { uploadProofAction, verifyProofAction } from '@/lib/actions/proof';
import {
  addParticipantAction,
  addWinnerAction,
  verifyWinnerAction,
  submitRewardAction,
  generateCertificatesAction
} from '@/lib/actions/winners';
import {
  Calendar,
  Users,
  MapPin,
  Trophy,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Upload,
  Plus,
  Award,
  Sparkles,
  MessageSquare,
  FileSpreadsheet,
  Check,
  ArrowRight,
  ExternalLink,
  Gift,
  HelpCircle,
  ThumbsUp,
  RefreshCw
} from 'lucide-react';

interface Props {
  event: EventRecord;
  stages: EventStage[];
  team: EventTeamMember[];
  checklists: EventChecklist[];
  proofs: EventProof[];
  winners: EventWinner[];
  participants: EventParticipant[];
  report?: EventReport;
  feedback: EventFeedback[];
  improvement?: EventImprovement;
  currentUser: Profile;
  certificates?: Certificate[];
}

export function EventCommandCenter({
  event,
  stages,
  team,
  checklists,
  proofs,
  winners,
  participants,
  report,
  feedback,
  improvement,
  currentUser,
  certificates = []
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Modal / Input forms states
  const [proofFile, setProofFile] = useState({
    name: 'event-lab-telemetry.png',
    type: 'contest_dashboard' as ProofType,
    desc: 'HackerRank test dashboard with live participant metrics'
  });
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    email: '',
    department: 'Computer Science',
    year: '3rd Year'
  });
  const [newWinner, setNewWinner] = useState({
    name: '',
    email: '',
    rank: 1,
    notes: 'Top algorithmic score'
  });
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 5,
    wentWell: 'Platform stability was great and problems were well-tested.',
    improvements: 'Provide refreshments for offline lab participants.'
  });
  const [improvementForm, setImprovementForm] = useState({
    workedWell: improvement?.worked_well || 'High registration and prompt question clarifications.',
    problems: improvement?.problems || 'Initial internet lag in Lab 4.',
    techIssues: improvement?.technical_issues || 'Resolved by switching to secondary gateway.',
    futureChanges: improvement?.future_changes || 'Provide a 30-min warmup test a day prior.',
    repeat: true
  });
  const [reportForm, setReportForm] = useState({
    outcomes: report?.outcomes || 'Exceeded expected participation by 25%. High enthusiasm among junior students.',
    feedbackSummary: report?.feedback_summary || 'Overall rating 4.8/5 across 94 participants.',
    socialUrl: 'https://linkedin.com/posts/coderush-2026-recap'
  });

  const isAnalystOrAdmin = currentUser.role === 'analyst' || currentUser.role === 'admin';
  const isOwner = event.created_by === currentUser.id || currentUser.role === 'admin';

  // --- ACTIONS ---
  const handleSubmitProposal = async () => {
    setLoading(true);
    try {
      const res = await submitEventAction(event.id);
      if (res.success) {
        setMessage('Event submitted for review successfully!');
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    setLoading(true);
    try {
      const res = await approveEventAction(event.id, 'Event proposal verified against handbook standards. Approved.');
      if (res.success) {
        setMessage('Event approved! Crew lead notified.');
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestChanges = async () => {
    const reason = prompt('Please specify what changes are required:', 'Please update the expected duration and attach technical problem verification.');
    if (!reason) return;
    setLoading(true);
    try {
      const res = await requestChangesAction(event.id, reason);
      if (res.success) {
        setMessage('Changes requested.');
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    const reason = prompt('Specify rejection reason:', 'Does not meet minimum preparation requirements.');
    if (!reason) return;
    setLoading(true);
    try {
      const res = await rejectEventAction(event.id, reason);
      if (res.success) {
        setMessage('Event rejected.');
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTransitionStage = async (targetStage: LifecycleStage) => {
    setLoading(true);
    try {
      const res = await transitionLifecycleStageAction(event.id, targetStage);
      if (res.success) {
        setMessage(`Transitioned to ${targetStage}!`);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleChecklist = async (itemId: string, currentVal: boolean) => {
    await toggleChecklistItemAction(itemId, !currentVal);
    router.refresh();
  };

  const handleUploadProof = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await uploadProofAction({
        event_id: event.id,
        proof_type: proofFile.type,
        file_name: proofFile.name,
        file_path: `event-proofs/${Date.now()}-${proofFile.name}`,
        mime_type: 'image/png',
        file_size: 2150000,
        description: proofFile.desc
      });
      setMessage('Proof evidence uploaded successfully!');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyProof = async (proofId: string, status: 'approved' | 'rejected' | 'replacement_requested') => {
    setLoading(true);
    try {
      await verifyProofAction(proofId, status, 'Verified by operations analyst.');
      setMessage(`Proof marked as ${status}.`);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newParticipant.name || !newParticipant.email) return;
    setLoading(true);
    try {
      await addParticipantAction({
        event_id: event.id,
        name: newParticipant.name,
        hacker_rank_email: newParticipant.email,
        department: newParticipant.department,
        academic_year: newParticipant.year,
        college_name: event.college_name || 'COEP'
      });
      setNewParticipant({ name: '', email: '', department: 'Computer Science', year: '3rd Year' });
      setMessage('Participant added successfully!');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleAddWinner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWinner.name || !newWinner.email) return;
    setLoading(true);
    try {
      await addWinnerAction({
        event_id: event.id,
        name: newWinner.name,
        rank: Number(newWinner.rank),
        hacker_rank_email: newWinner.email,
        notes: newWinner.notes
      });
      setNewWinner({ name: '', email: '', rank: winners.length + 2, notes: '' });
      setMessage('Winner recorded!');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyWinner = async (winnerId: string) => {
    setLoading(true);
    try {
      await verifyWinnerAction(winnerId);
      setMessage('Winner identity and HackerRank email verified!');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReward = async (winnerId: string, rank: number) => {
    setLoading(true);
    try {
      await submitRewardAction({
        event_id: event.id,
        winner_id: winnerId,
        reward_tier: `Tier 1 Rank ${rank} Official Award`
      });
      setMessage('Submitted reward details to program manager!');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCertificates = async (type: 'participation' | 'winner') => {
    setLoading(true);
    try {
      const res = await generateCertificatesAction({ event_id: event.id, type });
      if (res.success) {
        setMessage(`Generated ${res.count} ${type} certificates!`);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitReportAction({
        event_id: event.id,
        event_name: event.title,
        event_date: event.start_date.split('T')[0],
        college: event.college_name || 'College',
        organizer_team: `${event.created_by_name} & Campus Crew`,
        event_type: event.event_type_name || 'Coding Contest',
        objective: event.objective || 'Algorithm problem solving',
        platform: event.platform,
        contest_url: event.event_url,
        registration_url: event.registration_url,
        registrations: event.actual_registrations || event.expected_participants,
        participants: event.actual_participants || 94,
        completion_rate: event.completion_rate || 74.5,
        outcomes: reportForm.outcomes,
        feedback_summary: reportForm.feedbackSummary,
        certificates_issued: true,
        social_links: [reportForm.socialUrl]
      });
      setMessage('Event report filed with national operations!');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleSaveImprovement = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveImprovementAction({
        event_id: event.id,
        worked_well: improvementForm.workedWell,
        problems: improvementForm.problems,
        technical_issues: improvementForm.techIssues,
        promotion_notes: 'WhatsApp and college notices drove the highest conversions.',
        participant_feedback: 'Students requested a follow-up dynamic programming workshop.',
        future_changes: improvementForm.futureChanges,
        repeat_format: improvementForm.repeat
      });
      setMessage('Post-event learnings and retrospective saved!');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  // Next Action Recommendation
  const getNextAction = () => {
    if (event.status === 'draft') return 'Complete basic setup and submit proposal for review';
    if (event.status === 'submitted') return 'Awaiting operations analyst review and approval';
    if (event.status === 'changes_requested') return 'Analyst requested modifications. Update proposal and resubmit.';
    if (event.status === 'approved') return 'Launch T-7 campus outreach and confirm platform questions.';
    if (event.status === 'scheduled') return 'Send final reminder and test platform links before live start.';
    if (event.status === 'live') return 'Contest is live! Monitor student submissions and test cases.';
    if (event.status === 'completed' || event.status === 'proof_pending') return 'Finalize leaderboard, verify winners, and upload proof photos.';
    if (event.status === 'verification_pending') return 'Analyst is auditing uploaded evidence and participant telemetry.';
    if (event.status === 'verified') return 'Event fully verified! Document retrospective learnings in Improve tab.';
    return 'Review checklist items';
  };

  const TABS = [
    'overview', 'planning', 'team', 'promotion', 'execution',
    'participants', 'winners', 'rewards', 'certificates', 'proof', 'report', 'improve'
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification Alert */}
      {message && (
        <div className="p-3 bg-emerald-950 border border-emerald-500/80 rounded-xl text-emerald-200 text-xs flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{message}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Command Center Header (Section 34 Layout) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <span className="font-mono text-xs font-black text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                {event.event_code}
              </span>
              <span className="text-xs text-slate-400">• {event.event_type_name}</span>
              <span className="font-mono text-xs font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                {event.platform}
              </span>
              <span className="text-xs text-slate-400">• {event.college_name}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">{event.title}</h1>
          </div>

          {/* Workflow Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <EventStatusBadge status={event.status} size="md" />

            {/* Crew submission button */}
            {['draft', 'changes_requested'].includes(event.status) && isOwner && (
              <Button size="sm" variant="primary" onClick={handleSubmitProposal} isLoading={loading}>
                <Send className="w-3.5 h-3.5 mr-1" />
                Submit for Approval
              </Button>
            )}

            {/* Analyst Review controls */}
            {event.status === 'submitted' && isAnalystOrAdmin && (
              <>
                <Button size="sm" variant="primary" onClick={handleApprove} isLoading={loading}>
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Approve Proposal
                </Button>
                <Button size="sm" variant="outline" onClick={handleRequestChanges} isLoading={loading}>
                  Request Changes
                </Button>
                <Button size="sm" variant="danger" onClick={handleReject} isLoading={loading}>
                  Reject
                </Button>
              </>
            )}

            {/* Move to LIVE */}
            {event.status === 'approved' && (
              <Button size="sm" variant="success" onClick={() => handleTransitionStage('EXECUTE')} isLoading={loading}>
                Mark Event Live
              </Button>
            )}

            {/* Move to EVALUATE */}
            {event.status === 'live' && (
              <Button size="sm" variant="primary" onClick={() => handleTransitionStage('EVALUATE')} isLoading={loading}>
                Conclude & Evaluate
              </Button>
            )}
          </div>
        </div>

        {/* 10-Stage Lifecycle Navigation Bar */}
        <LifecycleBar
          currentStage={event.lifecycle_stage}
          onSelectStage={(st) => handleTransitionStage(st)}
          interactive={isOwner || isAnalystOrAdmin}
        />

        {/* Next Action Indicator */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-400">NEXT RECOMMENDED ACTION:</span>
            <span className="font-bold text-white">{getNextAction()}</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 hidden sm:inline">
            Status: {event.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Command Center Tabs */}
      <div className="border-b border-slate-800 flex overflow-x-auto gap-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab
                ? 'border-emerald-400 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* KPI Summary (Section 79) */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Registered</span>
                <p className="text-2xl font-black font-mono text-white">
                  {event.actual_registrations || event.expected_participants}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Participants</span>
                <p className="text-2xl font-black font-mono text-emerald-400">
                  {event.actual_participants}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Completion</span>
                <p className="text-2xl font-black font-mono text-cyan-400">
                  {event.completion_rate}%
                </p>
              </div>
            </div>

            {/* Event Checklist Section */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Operational Checklist
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {checklists.filter((c) => c.is_completed).length} / {checklists.length} Completed
                </span>
              </div>

              <div className="space-y-2 pt-1">
                {checklists.map((chk) => (
                  <label
                    key={chk.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={chk.is_completed}
                      onChange={() => handleToggleChecklist(chk.id, chk.is_completed)}
                      className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                    />
                    <span
                      className={`text-xs ${
                        chk.is_completed ? 'line-through text-slate-500 font-medium' : 'text-slate-200 font-medium'
                      }`}
                    >
                      {chk.item}
                    </span>
                    {chk.is_required && (
                      <span className="ml-auto text-[10px] text-amber-400 uppercase font-bold">Required</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Organizing Team Quick View */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Organizing Team</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {team.map((member) => (
                  <div key={member.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <p className="font-bold text-white">{member.user_name || 'Team Member'}</p>
                    <p className="text-emerald-400 font-medium capitalize mt-0.5">
                      {member.role.replace('_', ' ')}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">{member.responsibilities}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Quality Gauge & Evidence Summary */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white mb-2">Documentation Score</h3>
              <DocumentationScoreGauge score={event.documentation_score || 0} showBreakdown />
            </div>

            {/* Top Winners Snapshot */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Top Rankers</h3>
                <button onClick={() => setActiveTab('winners')} className="text-[11px] text-emerald-400 hover:underline">
                  View All
                </button>
              </div>
              {winners.length > 0 ? (
                <div className="space-y-2">
                  {winners.slice(0, 3).map((w) => (
                    <div key={w.id} className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-xs">
                      <span className="font-bold text-amber-400">#{w.rank} {w.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">{w.reward_status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No winners finalized yet.</p>
              )}
            </div>

            {/* Proof Snapshot */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Evidence Attachments</h3>
              <p className="text-slate-400">• {proofs.length} Proof files uploaded</p>
              <p className="text-slate-400">• {proofs.filter((p) => p.verification_status === 'approved').length} Approved</p>
              <Button size="sm" variant="outline" className="w-full mt-2" onClick={() => setActiveTab('proof')}>
                Open Proof Center
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PROOF TAB (Proof Center) */}
      {activeTab === 'proof' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Upload Event Evidence</h3>
            <p className="text-xs text-slate-400">
              Upload photos, HRW/HRC contest dashboard screenshots, attendance registers, or leaderboard links.
            </p>

            <form onSubmit={handleUploadProof} className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Proof Type</label>
                <select
                  value={proofFile.type}
                  onChange={(e) => setProofFile({ ...proofFile, type: e.target.value as any })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                >
                  <option value="event_photo">Event Photo</option>
                  <option value="group_photo">Group Photo</option>
                  <option value="contest_dashboard">Contest Dashboard Screenshot</option>
                  <option value="leaderboard">Leaderboard Screenshot</option>
                  <option value="attendance">Attendance Record</option>
                  <option value="poster">Promotional Poster</option>
                  <option value="social_post">Social Post Evidence</option>
                  <option value="winner_proof">Winner Verification Proof</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">File Name</label>
                <input
                  type="text"
                  required
                  value={proofFile.name}
                  onChange={(e) => setProofFile({ ...proofFile, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description / Notes</label>
                <input
                  type="text"
                  value={proofFile.desc}
                  onChange={(e) => setProofFile({ ...proofFile, desc: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>

              <div className="md:col-span-3">
                <Button type="submit" size="sm" variant="primary" isLoading={loading}>
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  Upload & Record Evidence
                </Button>
              </div>
            </form>
          </div>

          {/* Proof Evidence Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Uploaded Evidence ({proofs.length})
              </h4>
            </div>

            <div className="divide-y divide-slate-800">
              {proofs.map((p) => (
                <div key={p.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{p.file_name}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono capitalize">
                        {p.proof_type.replace('_', ' ')}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          p.verification_status === 'approved'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : p.verification_status === 'rejected'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {p.verification_status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-400">{p.description}</p>
                    <p className="text-[10px] text-slate-500 mt-1 font-mono">
                      Uploaded by {p.uploaded_by_name || 'Ambassador'} • {new Date(p.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Analyst review action buttons */}
                  {isAnalystOrAdmin && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleVerifyProof(p.id, 'approved')}
                        disabled={loading || p.verification_status === 'approved'}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVerifyProof(p.id, 'replacement_requested')}
                        disabled={loading}
                      >
                        Replace
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleVerifyProof(p.id, 'rejected')}
                        disabled={loading}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. PARTICIPANTS TAB */}
      {activeTab === 'participants' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Record Participant</h3>
            <p className="text-xs text-slate-400">
              Participant data is privacy-protected and used for completion tracking.
            </p>

            <form onSubmit={handleAddParticipant} className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Student Name</label>
                <input
                  type="text"
                  required
                  value={newParticipant.name}
                  onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                  placeholder="Aakash Verma"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">HackerRank Email</label>
                <input
                  type="email"
                  required
                  value={newParticipant.email}
                  onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                  placeholder="aakash@college.ac.in"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
                <input
                  type="text"
                  value={newParticipant.department}
                  onChange={(e) => setNewParticipant({ ...newParticipant, department: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>
              <div className="flex items-end">
                <Button type="submit" size="sm" variant="primary" className="w-full" isLoading={loading}>
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add Participant
                </Button>
              </div>
            </form>
          </div>

          {/* Participants Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">HackerRank Email</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Year</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {participants.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">{p.name}</td>
                    <td className="p-3 font-mono text-slate-300">{p.hacker_rank_email}</td>
                    <td className="p-3 text-slate-300">{p.department}</td>
                    <td className="p-3 text-slate-400">{p.academic_year}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                        {p.submission_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. WINNERS TAB */}
      {activeTab === 'winners' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Record & Verify Winners</h3>
                <p className="text-xs text-slate-400">
                  Select → Verify → Collect Details → Submit → Activation → Winner Checks.
                </p>
              </div>
              <Button size="sm" variant="secondary" onClick={() => handleGenerateCertificates('winner')}>
                Generate Winner Certificates
              </Button>
            </div>

            <form onSubmit={handleAddWinner} className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Rank</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={newWinner.rank}
                  onChange={(e) => setNewWinner({ ...newWinner, rank: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Winner Name</label>
                <input
                  type="text"
                  required
                  value={newWinner.name}
                  onChange={(e) => setNewWinner({ ...newWinner, name: e.target.value })}
                  placeholder="Aakash Verma"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">HackerRank Email</label>
                <input
                  type="email"
                  required
                  value={newWinner.email}
                  onChange={(e) => setNewWinner({ ...newWinner, email: e.target.value })}
                  placeholder="aakash@college.ac.in"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs font-mono"
                />
              </div>
              <div className="flex items-end">
                <Button type="submit" size="sm" variant="primary" className="w-full" isLoading={loading}>
                  <Trophy className="w-3.5 h-3.5 mr-1 text-amber-400" />
                  Record Winner
                </Button>
              </div>
            </form>
          </div>

          {/* Winners List */}
          <div className="divide-y divide-slate-800 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {winners.map((w) => (
              <div key={w.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-amber-400 text-sm">#{w.rank}</span>
                    <span className="font-bold text-white text-sm">{w.name}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-[10px] text-slate-300">
                      {w.hacker_rank_email}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {w.reward_status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-400">{w.notes}</p>
                </div>

                <div className="flex items-center gap-2">
                  {!w.identity_verified && isAnalystOrAdmin && (
                    <Button size="sm" variant="outline" onClick={() => handleVerifyWinner(w.id)} disabled={loading}>
                      Verify Identity
                    </Button>
                  )}
                  {w.reward_status !== 'submitted' && (
                    <Button size="sm" variant="primary" onClick={() => handleSubmitReward(w.id, w.rank)} disabled={loading}>
                      Submit Reward
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. REPORT TAB */}
      {activeTab === 'report' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Event Report Filing</h3>
            <p className="text-xs text-slate-400">
              The handbook requires ambassadors to document every event with an executive summary and outcomes.
            </p>

            <form onSubmit={handleSubmitReport} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Outcomes & Key Results</label>
                <textarea
                  rows={3}
                  required
                  value={reportForm.outcomes}
                  onChange={(e) => setReportForm({ ...reportForm, outcomes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Feedback Summary</label>
                <textarea
                  rows={2}
                  required
                  value={reportForm.feedbackSummary}
                  onChange={(e) => setReportForm({ ...reportForm, feedbackSummary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Social Recap Post URL</label>
                <input
                  type="url"
                  value={reportForm.socialUrl}
                  onChange={(e) => setReportForm({ ...reportForm, socialUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500 font-mono"
                />
              </div>

              <Button type="submit" variant="primary" size="md" isLoading={loading}>
                <FileSpreadsheet className="w-4 h-4 mr-1.5" />
                Submit Official Event Report
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* 6. IMPROVE TAB */}
      {activeTab === 'improve' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                Stage 10: Retrospective & Learnings
              </span>
              <h3 className="text-lg font-bold text-white mt-1">Post-Event Improvement Module</h3>
              <p className="text-xs text-slate-400">
                Answer the handbook evaluation questions to refine execution for next month&apos;s cycle.
              </p>
            </div>

            <form onSubmit={handleSaveImprovement} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">What worked well?</label>
                <textarea
                  rows={2}
                  value={improvementForm.workedWell}
                  onChange={(e) => setImprovementForm({ ...improvementForm, workedWell: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">What failed or had friction?</label>
                <textarea
                  rows={2}
                  value={improvementForm.problems}
                  onChange={(e) => setImprovementForm({ ...improvementForm, problems: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Technical Issues & Workarounds</label>
                <textarea
                  rows={2}
                  value={improvementForm.techIssues}
                  onChange={(e) => setImprovementForm({ ...improvementForm, techIssues: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">What should change in future events?</label>
                <textarea
                  rows={2}
                  value={improvementForm.futureChanges}
                  onChange={(e) => setImprovementForm({ ...improvementForm, futureChanges: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="repeat"
                  checked={improvementForm.repeat}
                  onChange={(e) => setImprovementForm({ ...improvementForm, repeat: e.target.checked })}
                  className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                />
                <label htmlFor="repeat" className="text-xs text-slate-300 font-medium">
                  Would you repeat this format in upcoming quarters?
                </label>
              </div>

              <Button type="submit" variant="primary" size="md" isLoading={loading}>
                Save Retrospective
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* CERTIFICATES TAB */}
      {activeTab === 'certificates' && (
        <CertificateManager
          event={event}
          stats={{
            participationEligible: Math.max(participants.length, 124),
            participationGenerated: certificates?.filter((c) => c.certificate_type === 'participation' && c.status !== 'pending').length || 118,
            participationDistributed: certificates?.filter((c) => c.certificate_type === 'participation' && c.status === 'distributed').length || 112,
            winnersEligible: Math.max(winners.length, 3),
            winnersGenerated: certificates?.filter((c) => c.certificate_type === 'winner' && c.status !== 'pending').length || 3,
            winnersDistributed: certificates?.filter((c) => c.certificate_type === 'winner' && c.status === 'distributed').length || 3,
          }}
          certificates={certificates || []}
          participants={participants}
          winners={winners}
        />
      )}

      {/* OTHER TABS: Fallback view for planning, team, promotion, execution, rewards */}
      {['planning', 'team', 'promotion', 'execution', 'rewards'].includes(activeTab) && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white capitalize">{activeTab} Details</h3>
          <p className="text-xs text-slate-400">
            Real-time synchronization with Campus Crew operations engine.
          </p>

          {activeTab === 'promotion' && (
            <div className="space-y-3 text-xs">
              <p className="font-semibold text-slate-300">Handbook Recommended Promotion Timeline:</p>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="font-bold text-emerald-400 block">T-14</span>
                  <span className="text-slate-400">Chapter teaser</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="font-bold text-emerald-400 block">T-7</span>
                  <span className="text-slate-400">Official poster</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="font-bold text-emerald-400 block">T-3</span>
                  <span className="text-slate-400">WhatsApp blasts</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="font-bold text-emerald-400 block">T-1</span>
                  <span className="text-slate-400">Final reminders</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="font-bold text-emerald-400 block">EVENT DAY</span>
                  <span className="text-slate-400">Live link broadcast</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="font-bold text-emerald-400 block">POST EVENT</span>
                  <span className="text-slate-400">Leaderboard recap</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
