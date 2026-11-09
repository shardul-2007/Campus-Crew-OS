import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { EventCard } from '@/components/events/EventCard';
import { Building2, MapPin, Mail, Linkedin, Github, Trophy, CalendarDays, CheckCircle2 } from 'lucide-react';

export default async function CrewProfilePage({ params }: { params: { crewCode: string } }) {
  const profile = db.getProfiles().find((p) => p.crew_code.toUpperCase() === params.crewCode.toUpperCase());
  if (!profile) notFound();

  const userEvents = db.getEvents({ creatorId: profile.id });
  const verifiedCount = userEvents.filter((e) => e.status === 'verified').length;
  const participantsCount = userEvents.reduce((acc, e) => acc + (e.actual_participants || 0), 0);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Profile Card Header */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-xl text-white overflow-hidden shadow-md">
              {profile.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
              ) : (
                profile.full_name.slice(0, 2).toUpperCase()
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {profile.crew_code}
                </span>
                <span className="text-xs text-slate-400">Campus Ambassador</span>
              </div>
              <h1 className="text-2xl font-black text-white">{profile.full_name}</h1>
              <p className="text-xs text-slate-400 mt-0.5">{profile.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs w-full md:w-auto">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Events Organized</span>
              <span className="text-xl font-black font-mono text-white">{userEvents.length}</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Verified Events</span>
              <span className="text-xl font-black font-mono text-emerald-400">{verifiedCount}</span>
            </div>
          </div>
        </div>

        {/* Ambassador's Events */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Events by {profile.full_name}</h2>
          {userEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400">
              No public events recorded yet for this ambassador.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
