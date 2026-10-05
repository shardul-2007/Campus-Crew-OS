import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { CertificateManager } from '@/components/certificates/CertificateGeneratorModal';
import { CertificateProvider } from '@/lib/certificates/certificate-provider';
import { ArrowLeft, Award, ExternalLink, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  params: {
    eventCode: string;
  };
}

export default async function EventCertificatesPage({ params }: Props) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    notFound();
  }

  const event = db.getEventByCode(params.eventCode) || db.getEventById(params.eventCode);
  if (!event) {
    notFound();
  }

  const participants = db.getEventParticipants(event.id);
  const winners = db.getEventWinners(event.id);
  const certificates = db.getEventCertificates(event.id);

  const provider = new CertificateProvider();
  const stats = provider.getEligibilityStats(event.id);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link
              href={`/events/${event.event_code}`}
              className="inline-flex items-center text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back to Event Command Center ({event.event_code})
            </Link>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-400" />
              Certificate Generation Center
            </h1>
            <p className="text-xs text-slate-400">
              Generate, preview, distribute, and verify official HackerRank certificates powered by Certify HackerRank.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/events/${event.event_code}`}>
              <Button variant="outline" size="sm">
                Event Overview
              </Button>
            </Link>
            <a
              href="https://certify-hackerrank.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="secondary" size="sm" className="inline-flex items-center gap-1.5">
                <span>Certify HackerRank Engine</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </div>

        {/* Event Quick Info Banner */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {event.event_code}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-semibold text-slate-300 uppercase">
                {event.event_type_name || 'HackerRank Event'}
              </span>
            </div>
            <h2 className="text-base font-bold text-white mt-0.5">{event.title}</h2>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{new Date(event.start_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{event.mode === 'offline' ? event.venue || 'On Campus' : event.mode === 'hybrid' ? 'Hybrid / Campus + Online' : 'Virtual / Online'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>{event.actual_participants || participants.length} Participants</span>
            </div>
          </div>
        </div>

        {/* Certificate Manager Component */}
        <CertificateManager
          event={event}
          stats={stats}
          certificates={certificates}
          participants={participants}
          winners={winners}
        />
      </div>
    </AppShell>
  );
}
