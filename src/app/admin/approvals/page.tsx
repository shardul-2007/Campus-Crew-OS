import React from 'react';
import Link from 'next/link';
import { requireRole } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { EventStatusBadge } from '@/components/events/EventStatusBadge';
import { Button } from '@/components/ui/button';
import { approveEventAction, rejectEventAction } from '@/lib/actions/events';
import { CheckSquare, ArrowRight, Clock, Check, X } from 'lucide-react';

interface Props {
  searchParams: {
    tab?: string;
  };
}

export default async function ApprovalsPage({ searchParams }: Props) {
  await requireRole(['analyst', 'admin', 'program_manager']);

  const activeTab = searchParams.tab || 'pending';
  const allEvents = db.getEvents();

  let filtered = allEvents;
  if (activeTab === 'pending') {
    filtered = allEvents.filter((e) => ['submitted', 'under_review'].includes(e.status));
  } else if (activeTab === 'changes_requested') {
    filtered = allEvents.filter((e) => e.status === 'changes_requested');
  } else if (activeTab === 'approved') {
    filtered = allEvents.filter((e) => ['approved', 'scheduled', 'live'].includes(e.status));
  } else if (activeTab === 'rejected') {
    filtered = allEvents.filter((e) => e.status === 'rejected');
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">Event Approval Queue</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit proposed campus event formats, platform configuration, and timelines before official approval.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'pending', label: 'Pending Review' },
            { id: 'changes_requested', label: 'Changes Requested' },
            { id: 'approved', label: 'Approved' },
            { id: 'rejected', label: 'Rejected' },
          ].map((tab) => (
            <Link
              key={tab.id}
              href={`/admin/approvals?tab=${tab.id}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-black'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Table of Submissions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Event Code & Title</th>
                  <th className="p-3">Crew Lead</th>
                  <th className="p-3">College</th>
                  <th className="p-3">Format</th>
                  <th className="p-3">Platform</th>
                  <th className="p-3">Target Date</th>
                  <th className="p-3">Expected</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-800/40">
                    <td className="p-3">
                      <Link href={`/events/${e.event_code}`} className="font-bold text-white hover:text-emerald-400">
                        {e.title}
                      </Link>
                      <span className="block font-mono text-[10px] text-emerald-400">{e.event_code}</span>
                    </td>
                    <td className="p-3 font-medium text-slate-300">{e.created_by_name}</td>
                    <td className="p-3 text-slate-400 truncate max-w-[140px]">{e.college_name}</td>
                    <td className="p-3 text-slate-300">{e.event_type_name}</td>
                    <td className="p-3 font-mono text-emerald-400">{e.platform}</td>
                    <td className="p-3 font-mono text-slate-400">{new Date(e.start_date).toLocaleDateString()}</td>
                    <td className="p-3 font-mono text-slate-300">{e.expected_participants}</td>
                    <td className="p-3">
                      <EventStatusBadge status={e.status} size="sm" />
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/events/${e.event_code}`}>
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            Review
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-xs text-slate-400 space-y-1">
              <CheckSquare className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-50" />
              <p className="font-bold text-slate-300">Queue is clear</p>
              <p>No event submissions currently under this status filter.</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
