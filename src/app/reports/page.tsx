import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, Download, FileText, Calendar, Filter } from 'lucide-react';

export default async function ReportsPage() {
  const allEvents = db.getEvents();
  const reportsWithEvents = allEvents
    .map((e) => ({
      event: e,
      report: db.getEventReport(e.id),
    }))
    .filter((x) => x.report !== undefined);

  const reportTypes = [
    { title: 'Monthly Campus Crew Report', desc: 'Consolidated summary of chapter activations, registrations, and verified events.', type: 'monthly' },
    { title: 'Crew Performance Report', desc: 'Individual ambassador metrics, documentation completeness, and impact ranking.', type: 'crew' },
    { title: 'College Impact Report', desc: 'University-level participation, repeat attendee retention, and department diversity.', type: 'college' },
    { title: 'Event Activity Report', desc: 'Granular logs of all 16 format events hosted on HRW and HRC platforms.', type: 'activity' },
    { title: 'Verification Audit Report', desc: 'Audit trail of proof evaluations, approved attachments, and analyst comments.', type: 'verification' },
    { title: 'Reward Status Report', desc: 'Status of verified winners and activated digital certificates.', type: 'reward' },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Operational Reports Center</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Export verified chapter data in standard CSV, Excel (XLSX), or PDF formats.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a href="/api/export" download>
              <Button size="sm" variant="primary">
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download Complete CSV Export
              </Button>
            </a>
          </div>
        </div>

        {/* Standard Report Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((rep) => (
            <div key={rep.type} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{rep.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{rep.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <a href={`/api/export?report=${rep.type}`} download className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1">
                  Export Data <Download className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Submitted Chapter Event Reports Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl mt-8">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Filed Event Reports ({reportsWithEvents.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Event Code & Title</th>
                  <th className="p-3">College</th>
                  <th className="p-3">Submitted By</th>
                  <th className="p-3">Participants</th>
                  <th className="p-3">Completion Rate</th>
                  <th className="p-3">Review Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {reportsWithEvents.map(({ event: e, report: r }) => (
                  <tr key={e.id} className="hover:bg-slate-800/40">
                    <td className="p-3">
                      <Link href={`/events/${e.event_code}`} className="font-bold text-white hover:text-emerald-400">
                        {e.title}
                      </Link>
                      <span className="block font-mono text-[10px] text-emerald-400">{e.event_code}</span>
                    </td>
                    <td className="p-3 text-slate-300 truncate max-w-[150px]">{e.college_name}</td>
                    <td className="p-3 text-slate-300">{r?.submitted_by_name || e.created_by_name}</td>
                    <td className="p-3 font-mono text-cyan-400">{r?.participants || e.actual_participants}</td>
                    <td className="p-3 font-mono text-emerald-400">{r?.completion_rate || e.completion_rate}%</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          r?.review_status === 'approved'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {r?.review_status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-400">{r?.event_date || e.start_date.split('T')[0]}</td>
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
