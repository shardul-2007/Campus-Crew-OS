import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { EventCard } from '@/components/events/EventCard';
import { Building2, MapPin, Globe, ExternalLink } from 'lucide-react';

export default async function CollegeDetailPage({ params }: { params: { id: string } }) {
  const college = db.getCollegeById(params.id);
  if (!college) notFound();

  const collegeEvents = db.getEvents({ collegeId: college.id });
  const ambassadors = db.getProfiles().filter((p) => p.college_id === college.id);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* College Header */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {college.city}, {college.state}
                </span>
                <span className="text-xs text-slate-400">• Institutional Partner</span>
              </div>
              <h1 className="text-2xl font-black text-white">{college.name}</h1>
            </div>

            {college.website && (
              <a
                href={college.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-2">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <span className="text-slate-400 block mb-1">Total Events</span>
              <span className="text-xl font-bold font-mono text-white">{collegeEvents.length}</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <span className="text-slate-400 block mb-1">Ambassadors</span>
              <span className="text-xl font-bold font-mono text-cyan-400">{ambassadors.length}</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <span className="text-slate-400 block mb-1">Total Turnout</span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {collegeEvents.reduce((acc, e) => acc + (e.actual_participants || 0), 0)}
              </span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <span className="text-slate-400 block mb-1">Verified Events</span>
              <span className="text-xl font-bold font-mono text-purple-400">
                {collegeEvents.filter((e) => e.status === 'verified').length}
              </span>
            </div>
          </div>
        </div>

        {/* College's Events */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Events Hosted at {college.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collegeEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
