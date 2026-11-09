import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { ShieldCheck, Award, ExternalLink, Info, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function CertificatesPage() {
  const certificates = db.getEventCertificates();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Certificate Issuance Center</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified digital credentials generated for contest completions and top-ranked participants.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            <span>Certificates are generated server-side using approved brand templates.</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Issued Certificates ({certificates.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Recipient Name</th>
                  <th className="p-3">Recipient Email</th>
                  <th className="p-3">Event Title</th>
                  <th className="p-3">Certificate Type</th>
                  <th className="p-3">Generated Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Verification Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {certificates.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">{c.recipient_name}</td>
                    <td className="p-3 font-mono text-slate-400">{c.recipient_email || '—'}</td>
                    <td className="p-3 text-slate-300">{c.event_title || 'Campus Contest'}</td>
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
                    <td className="p-3 font-mono text-slate-400">{new Date(c.generated_at).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={c.certificate_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-emerald-400 hover:underline"
                      >
                        <span>Verify URL</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
