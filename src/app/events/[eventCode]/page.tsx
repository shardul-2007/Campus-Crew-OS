import React from 'react';
import { notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { EventCommandCenter } from '@/components/events/EventCommandCenter';

interface Props {
  params: {
    eventCode: string;
  };
}

export default async function EventCommandCenterPage({ params }: Props) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    notFound();
  }

  const event = db.getEventByCode(params.eventCode) || db.getEventById(params.eventCode);
  if (!event) {
    notFound();
  }

  const stages = db.getEventStages(event.id);
  const team = db.getEventTeam(event.id);
  const checklists = db.getEventChecklists(event.id);
  const proofs = db.getEventProofs(event.id);
  const winners = db.getEventWinners(event.id);
  const participants = db.getEventParticipants(event.id);
  const report = db.getEventReport(event.id);
  const feedback = db.getEventFeedback(event.id);
  const improvement = db.getEventImprovement(event.id);
  const certificates = db.getEventCertificates(event.id);

  return (
    <AppShell>
      <EventCommandCenter
        event={event}
        stages={stages}
        team={team}
        checklists={checklists}
        proofs={proofs}
        winners={winners}
        participants={participants}
        report={report}
        feedback={feedback}
        improvement={improvement}
        currentUser={currentUser}
        certificates={certificates}
      />
    </AppShell>
  );
}
