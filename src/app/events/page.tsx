import React from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth/session';
import { db } from '@/lib/db/store';
import { AppShell } from '@/components/layout/AppShell';
import { EventCard } from '@/components/events/EventCard';
import { EventStatusBadge } from '@/components/events/EventStatusBadge';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Filter, Download, Calendar, Layers } from 'lucide-react';

interface Props {
  searchParams: {
    status?: string;
    type?: string;
    college?: string;
    platform?: string;
    q?: string;
    risk?: string;
  };
}

export default async function EventsPage({ searchParams }: Props) {
  const currentUser = await getCurrentUser();
  const eventTypes = db.getEventTypes();
  const colleges = db.getColleges();

  const events = db.getEvents({
    status: searchParams.status,
    eventType: searchParams.type,
    collegeId: searchParams.college,
    platform: searchParams.platform,
    search: searchParams.q,
    risk: searchParams.risk
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header with Title and Create Event CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Campus Crew Events</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Browse, filter, and manage campus events across all 16 handbook formats.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a href="/api/export" download>
              <Button size="sm" variant="outline">
                <Download className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Export CSV
              </Button>
            </a>
            <Link href="/events/new">
              <Button size="sm" variant="primary">
                <PlusCircle className="w-3.5 h-3.5 mr-1" />
                Create Event Proposal
              </Button>
            </Link>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <form method="GET" action="/events" className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                name="q"
                defaultValue={searchParams.q || ''}
                placeholder="Search by title, event code (e.g. ACT-2026-00042), college, or lead..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-500"
              />
            </div>

            {/* Status Select */}
            <select
              name="status"
              defaultValue={searchParams.status || 'all'}
              className="bg-slate-950 border border-slate-800 rounded-lg text-white text-xs px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="changes_requested">Changes Requested</option>
              <option value="approved">Approved</option>
              <option value="scheduled">Scheduled</option>
              <option value="live">Live Now</option>
              <option value="completed">Completed</option>
              <option value="verification_pending">Verification Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>

            {/* Event Type Select */}
            <select
              name="type"
              defaultValue={searchParams.type || 'all'}
              className="bg-slate-950 border border-slate-800 rounded-lg text-white text-xs px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Formats</option>
              {eventTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            {/* Platform Select */}
            <select
              name="platform"
              defaultValue={searchParams.platform || 'all'}
              className="bg-slate-950 border border-slate-800 rounded-lg text-white text-xs px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Platforms</option>
              <option value="HRW">HRW (Primary)</option>
              <option value="HRC">HRC (Alternative)</option>
              <option value="Other">Other</option>
            </select>

            <Button type="submit" size="sm" variant="secondary">
              <Filter className="w-3.5 h-3.5 mr-1" />
              Filter
            </Button>
          </div>
        </form>

        {/* Results Counter & Grid */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Showing <strong className="text-white">{events.length}</strong> events</span>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Calendar className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No matching events found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search criteria or clear the filters to view all chapter activities.
            </p>
            <Link href="/events">
              <Button size="sm" variant="outline">Clear Filters</Button>
            </Link>
          </div>
        )}
      </div>
    </AppShell>
  );
}
