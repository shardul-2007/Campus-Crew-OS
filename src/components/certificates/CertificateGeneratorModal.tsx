'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Certificate, EventRecord, EventParticipant, EventWinner } from '@/types/database';
import { CertificateEligibilityStats, CertificateType } from '@/lib/certificates/types';
import { Button } from '@/components/ui/button';
import {
  Award,
  Sparkles,
  CheckCircle2,
  Download,
  Share2,
  FileSpreadsheet,
  ArrowRight,
  ArrowLeft,
  X,
  ExternalLink,
  Users,
  QrCode,
  ShieldCheck,
  RefreshCw,
  Eye
} from 'lucide-react';

interface Props {
  event: EventRecord;
  stats: CertificateEligibilityStats;
  certificates: Certificate[];
  participants: EventParticipant[];
  winners: EventWinner[];
  onCertificatesUpdated?: () => void;
}

export function CertificateManager({
  event,
  stats: initialStats,
  certificates: initialCerts,
  participants,
  winners,
  onCertificatesUpdated,
}: Props) {
  const router = useRouter();
  const [stats, setStats] = useState(initialStats);
  const [certs, setCerts] = useState(initialCerts);

  // Modal Workflow State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workflowStep, setWorkflowStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [certType, setCertType] = useState<CertificateType>('participation');
  const [selectedRecipientIds, setSelectedRecipientIds] = useState<string[]>([]);
  const [previewRecipient, setPreviewRecipient] = useState({
    name: 'Sample Recipient',
    email: 'recipient@college.ac.in',
    rank: 1,
  });
  const [loading, setLoading] = useState(false);
  const [generationResults, setGenerationResults] = useState<any[]>([]);

  // Open workflow for a specific type
  const openWorkflow = (type: CertificateType) => {
    setCertType(type);
    setWorkflowStep(1);

    if (type === 'winner') {
      const wIds = winners.map((w) => w.id);
      setSelectedRecipientIds(wIds.length > 0 ? wIds : ['sample-win-1']);
      setPreviewRecipient({
        name: winners[0]?.name || 'Top Ranker',
        email: winners[0]?.hacker_rank_email || 'winner@college.ac.in',
        rank: 1,
      });
    } else {
      const pIds = participants.map((p) => p.id);
      setSelectedRecipientIds(pIds.length > 0 ? pIds : ['sample-part-1']);
      setPreviewRecipient({
        name: participants[0]?.name || 'Attending Student',
        email: participants[0]?.hacker_rank_email || 'student@college.ac.in',
        rank: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleToggleRecipient = (id: string) => {
    setSelectedRecipientIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (allIds: string[]) => {
    if (selectedRecipientIds.length === allIds.length) {
      setSelectedRecipientIds([]);
    } else {
      setSelectedRecipientIds(allIds);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      let itemsToGenerate: Array<{ name: string; email?: string; participantId?: string; rank?: number }> = [];

      if (certType === 'winner') {
        const selectedWinners = winners.filter((w) => selectedRecipientIds.includes(w.id));
        if (selectedWinners.length > 0) {
          itemsToGenerate = selectedWinners.map((w) => ({
            name: w.name || 'Rank Winner',
            email: w.hacker_rank_email,
            participantId: w.participant_id,
            rank: w.rank,
          }));
        } else {
          itemsToGenerate = [{ name: previewRecipient.name, email: previewRecipient.email, rank: 1 }];
        }
      } else {
        const selectedParts = participants.filter((p) => selectedRecipientIds.includes(p.id));
        if (selectedParts.length > 0) {
          itemsToGenerate = selectedParts.map((p) => ({
            name: p.name,
            email: p.hacker_rank_email,
            participantId: p.id,
          }));
        } else {
          itemsToGenerate = [{ name: previewRecipient.name, email: previewRecipient.email }];
        }
      }

      const res = await fetch(`/api/events/${event.id}/certificates/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: certType,
          items: itemsToGenerate,
          forceRegenerate: true,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setGenerationResults(data.results || []);
        if (data.certificates) setCerts(data.certificates);
        if (data.stats) setStats(data.stats);
        setWorkflowStep(5); // Go to distribution step
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCsv = () => {
    const rows = [
      ['Certificate ID', 'Recipient Name', 'Recipient Email', 'Event Name', 'Type', 'Certificate URL', 'Status', 'Generated At'],
      ...certs.map((c) => [
        c.id,
        c.recipient_name,
        c.recipient_email || '',
        event.title,
        c.certificate_type,
        `https://certify-hackerrank.vercel.app/verify/${c.id}`,
        c.status,
        c.generated_at,
      ]),
    ];

    const csvContent = rows.map((e) => e.map((x) => `"${x}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.event_code}-certificates.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Required UI Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Certify HackerRank Integration
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-mono">Provider: certify-hackerrank.vercel.app</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">CERTIFICATES</h2>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleDownloadCsv}>
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download CSV
            </Button>
          </div>
        </div>

        {/* Exact Metric Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Participation Metric Card */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Participation Certificates
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  {stats.participationGenerated} Issued
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center py-2 bg-slate-900/60 rounded-lg border border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Eligible</span>
                  <span className="font-mono font-bold text-slate-200 text-sm">{stats.participationEligible}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Generated</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">{stats.participationGenerated}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Distributed</span>
                  <span className="font-mono font-bold text-cyan-400 text-sm">{stats.participationDistributed}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <Button size="sm" variant="primary" className="w-full" onClick={() => openWorkflow('participation')}>
                Generate Participation Certificates
              </Button>
            </div>
          </div>

          {/* Winner Metric Card */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  Winner Certificates
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                  {stats.winnersGenerated} Issued
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center py-2 bg-slate-900/60 rounded-lg border border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Eligible</span>
                  <span className="font-mono font-bold text-slate-200 text-sm">{stats.winnersEligible}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Generated</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{stats.winnersGenerated}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Distributed</span>
                  <span className="font-mono font-bold text-cyan-400 text-sm">{stats.winnersDistributed}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <Button size="sm" variant="secondary" className="w-full border-amber-500/30 text-amber-300 hover:text-white" onClick={() => openWorkflow('winner')}>
                Generate Winner Certificates
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Certificate Records Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Issued Certificate Records ({certs.length})
          </h3>
          <span className="text-xs text-slate-400">Integrated with Certify HackerRank</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Unique Certificate ID</th>
                <th className="p-3">Recipient Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Generated Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Certificate Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {certs.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-emerald-400">{c.id}</td>
                  <td className="p-3 font-semibold text-white">
                    {c.recipient_name}
                    {c.recipient_email && (
                      <span className="text-[10px] text-slate-400 block font-mono">{c.recipient_email}</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.certificate_type === 'winner'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {c.certificate_type}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-400">
                    {new Date(c.generated_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/api/certificates/${c.id}/download`}
                        download
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold"
                      >
                        <Download className="w-3 h-3 text-emerald-400" />
                        <span>PDF</span>
                      </a>
                      <a
                        href={`https://certify-hackerrank.vercel.app/verify/${c.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded text-xs"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5-Step Generator Wizard Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Certify HackerRank Workflow
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  Generate {certType === 'winner' ? 'Winner' : 'Participation'} Certificates
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Workflow Breadcrumb Indicator */}
            <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-3">
              {[
                { step: 1, label: 'Type' },
                { step: 2, label: 'Select' },
                { step: 3, label: 'Preview' },
                { step: 4, label: 'Generate' },
                { step: 5, label: 'Distribute' },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-1">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                      workflowStep === s.step
                        ? 'bg-emerald-500 text-black'
                        : workflowStep > s.step
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {workflowStep > s.step ? '✓' : s.step}
                  </span>
                  <span
                    className={`font-semibold ${
                      workflowStep === s.step ? 'text-white' : 'text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* STEP 1: SELECT CERTIFICATE TYPE */}
            {workflowStep === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  Select the credential grade according to the handbook policy.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setCertType('participation')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      certType === 'participation'
                        ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
                    <h4 className="font-bold text-white text-sm">Participation</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Conferred upon students who attended and made a verified submission.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCertType('winner')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      certType === 'winner'
                        ? 'bg-amber-950/40 border-amber-500 ring-1 ring-amber-500'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <Award className="w-6 h-6 text-amber-400 mb-2" />
                    <h4 className="font-bold text-white text-sm">Top Winner</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Conferred upon top-ranked competitors with rank and score badges.
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SELECT PARTICIPANTS / WINNERS */}
            {workflowStep === 2 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    Select eligible recipients for bulk generation:
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectAll(
                        certType === 'winner'
                          ? winners.map((w) => w.id)
                          : participants.map((p) => p.id)
                      )
                    }
                    className="text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    Toggle All
                  </button>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-1.5 p-2 bg-slate-950 rounded-xl border border-slate-800">
                  {certType === 'winner'
                    ? winners.map((w) => (
                        <label
                          key={w.id}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 cursor-pointer text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedRecipientIds.includes(w.id)}
                              onChange={() => handleToggleRecipient(w.id)}
                              className="w-4 h-4 text-emerald-500 rounded"
                            />
                            <span className="font-bold text-amber-400">Rank #{w.rank}</span>
                            <span className="text-white font-semibold">{w.name}</span>
                          </div>
                          <span className="font-mono text-slate-400 text-[10px]">{w.hacker_rank_email}</span>
                        </label>
                      ))
                    : participants.map((p) => (
                        <label
                          key={p.id}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 cursor-pointer text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedRecipientIds.includes(p.id)}
                              onChange={() => handleToggleRecipient(p.id)}
                              className="w-4 h-4 text-emerald-500 rounded"
                            />
                            <span className="text-white font-semibold">{p.name}</span>
                          </div>
                          <span className="font-mono text-slate-400 text-[10px]">{p.hacker_rank_email}</span>
                        </label>
                      ))}

                  {((certType === 'winner' && winners.length === 0) ||
                    (certType === 'participation' && participants.length === 0)) && (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No saved {certType} records yet. Default mock recipients will be generated.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: PREVIEW CERTIFICATE TEMPLATE */}
            {workflowStep === 3 && (
              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-[#060912] border border-amber-500/40 text-center space-y-3 shadow-inner relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-800">
                    CERTIFY HACKERRANK VERIFIED
                  </div>

                  <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block">
                    CAMPUS CREW OS & CERTIFY HACKERRANK
                  </span>
                  <h4 className="text-lg font-black text-white">
                    {certType === 'winner' ? 'CERTIFICATE OF EXCELLENCE' : 'CERTIFICATE OF PARTICIPATION'}
                  </h4>
                  <p className="text-[11px] text-slate-400 italic">This credential is proudly conferred upon</p>
                  <p className="text-xl font-black text-amber-300">{previewRecipient.name}</p>
                  <p className="text-xs text-slate-300">
                    for completing technical assessments in <strong>{event.title}</strong>
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-3 text-[10px] font-mono text-slate-400">
                    <span>Date: {new Date(event.start_date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>ID: HRC-{event.event_code}-PREVIEW</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: GENERATION IN PROGRESS / SUMMARY */}
            {workflowStep === 4 && (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white">Ready to Execute Bulk Generation</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Generating {selectedRecipientIds.length || 1} certificates using the Certify HackerRank integration provider and updating the database.
                </p>
              </div>
            )}

            {/* STEP 5: DISTRIBUTION & COMPLETED */}
            {workflowStep === 5 && (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    Successfully generated and registered {generationResults.length || 1} certificates in Campus Crew OS!
                  </span>
                </div>

                <div className="max-h-48 overflow-y-auto space-y-1.5 p-2 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  {generationResults.map((res, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-900">
                      <div>
                        <span className="font-bold text-white block">{res.recipientName}</span>
                        <span className="font-mono text-[10px] text-emerald-400">{res.certificateId}</span>
                      </div>
                      <a
                        href={res.certificateUrl}
                        download
                        className="px-2 py-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded text-[11px] inline-flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {workflowStep > 1 && workflowStep < 5 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setWorkflowStep((prev) => (prev - 1) as any)}
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  Back
                </Button>
              )}

              {workflowStep < 4 && (
                <Button
                  size="sm"
                  variant="primary"
                  className="ml-auto"
                  onClick={() => setWorkflowStep((prev) => (prev + 1) as any)}
                >
                  Continue
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              )}

              {workflowStep === 4 && (
                <Button
                  size="md"
                  variant="primary"
                  className="ml-auto"
                  isLoading={loading}
                  onClick={handleGenerate}
                >
                  Execute Certificate Generation
                </Button>
              )}

              {workflowStep === 5 && (
                <Button
                  size="sm"
                  variant="primary"
                  className="ml-auto"
                  onClick={() => {
                    setIsModalOpen(false);
                    onCertificatesUpdated?.();
                  }}
                >
                  Done
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
