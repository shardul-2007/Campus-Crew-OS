import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').trim().toLowerCase();

  if (!q) {
    return NextResponse.json({ success: true, results: [] });
  }

  const events = db.getEvents().filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.event_code.toLowerCase().includes(q) ||
      (e.college_name && e.college_name.toLowerCase().includes(q))
  ).slice(0, 8).map((e) => ({
    type: 'event',
    id: e.id,
    title: e.title,
    subtitle: `${e.event_code} • ${e.college_name} • ${e.status.toUpperCase()}`,
    url: `/events/${e.event_code}`
  }));

  const crew = db.getProfiles().filter(
    (p) =>
      p.role === 'crew_member' &&
      (p.full_name.toLowerCase().includes(q) ||
       p.crew_code.toLowerCase().includes(q) ||
       (p.city && p.city.toLowerCase().includes(q)))
  ).slice(0, 5).map((p) => ({
    type: 'crew',
    id: p.id,
    title: p.full_name,
    subtitle: `${p.crew_code} • ${p.college_name || p.city}`,
    url: `/crew/${p.crew_code}`
  }));

  const colleges = db.getColleges().filter(
    (c) => c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)
  ).slice(0, 5).map((c) => ({
    type: 'college',
    id: c.id,
    title: c.name,
    subtitle: `${c.city}, ${c.state}`,
    url: `/colleges/${c.id}`
  }));

  const announcements = db.getAnnouncements().filter(
    (a) => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)
  ).slice(0, 3).map((a) => ({
    type: 'announcement',
    id: a.id,
    title: a.title,
    subtitle: `Priority: ${a.priority.toUpperCase()}`,
    url: `/admin/announcements`
  }));

  return NextResponse.json({
    success: true,
    results: [...events, ...crew, ...colleges, ...announcements]
  });
}
