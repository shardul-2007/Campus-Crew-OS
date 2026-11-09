'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { EventProof } from '@/types/database';
import { Button } from '@/components/ui/button';
import { verifyProofAction } from '@/lib/actions/proof';
import { Check, X, RefreshCw, Eye, Image as ImageIcon } from 'lucide-react';

interface Props {
  initialProofs: EventProof[];
}

export function ProofVerificationList({ initialProofs }: Props) {
  const [proofs, setProofs] = useState(initialProofs);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [previewProof, setPreviewProof] = useState<EventProof | null>(null);

  const filtered = proofs.filter((p) => {
    if (filter === 'all') return true;
    return p.verification_status === filter;
  });

  const handleAction = async (proofId: string, status: 'approved' | 'rejected' | 'replacement_requested') => {
    const res = await verifyProofAction(proofId, status);
    if (res.success && res.proof) {
      setProofs((prev) => prev.map((p) => (p.id === proofId ? res.proof! : p)));
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-2">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
              filter === st ? 'bg-emerald-500 text-black' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {st} ({st === 'all' ? proofs.length : proofs.filter((p) => p.verification_status === st).length})
          </button>
        ))}
      </div>

      {/* Proof Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">File Name</th>
                <th className="p-3">Proof Type</th>
                <th className="p-3">Uploaded By</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Reviewer</th>
                <th className="p-3 text-right">Verification Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40">
                  <td className="p-3">
                    <button
                      onClick={() => setPreviewProof(p)}
                      className="font-bold text-white hover:text-emerald-400 flex items-center gap-1.5 text-left"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[200px]">{p.file_name}</span>
                    </button>
                    <span className="text-[10px] text-slate-400 block truncate max-w-[220px]">
                      {p.description}
                    </span>
                  </td>
                  <td className="p-3 capitalize font-mono text-slate-300">
                    {p.proof_type.replace('_', ' ')}
                  </td>
                  <td className="p-3 text-slate-300 font-medium">{p.uploaded_by_name || 'Ambassador'}</td>
                  <td className="p-3 font-mono text-slate-400">{new Date(p.created_at).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.verification_status === 'approved'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : p.verification_status === 'rejected'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {p.verification_status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{p.reviewed_by_name || '—'}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="primary"
                        className="h-7 text-xs px-2"
                        disabled={p.verification_status === 'approved'}
                        onClick={() => handleAction(p.id, 'approved')}
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs px-2"
                        onClick={() => handleAction(p.id, 'replacement_requested')}
                      >
                        Replace
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        className="h-7 text-xs px-2"
                        disabled={p.verification_status === 'rejected'}
                        onClick={() => handleAction(p.id, 'rejected')}
                      >
                        <X className="w-3 h-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Image/Document Preview Modal */}
      {previewProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">{previewProof.file_name}</h3>
              <button onClick={() => setPreviewProof(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                <ImageIcon className="w-8 h-8" />
              </div>
              <p className="text-xs text-slate-300">{previewProof.description}</p>
              <span className="text-[10px] font-mono text-slate-500 block">
                MIME: {previewProof.mime_type} • Path: {previewProof.file_path}
              </span>
            </div>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => setPreviewProof(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
