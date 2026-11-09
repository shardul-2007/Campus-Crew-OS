import React from 'react';
import Link from 'next/link';
import { EventRecord } from '@/types/database';
import { EventStatusBadge } from './EventStatusBadge';
import { Calendar, Users, MapPin, Terminal, Award, AlertTriangle, ArrowRight } from 'lucide-react';

interface Props {
  event: EventRecord;
}

export function EventCard({ event }: Props) {
  const dateFormatted = new Date(event.start_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl p-5 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-950/10 flex flex-col justify-between">
      {/* Top row: Code + Status Badge + Risk */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
              {event.event_code}
            </span>
            {event.risk_level === 'HIGH' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-300 bg-rose-950/80 border border-rose-800 px-1.5 py-0.5 rounded animate-pulse">
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                HIGH RISK
              </span>
            )}
          </div>
          <EventStatusBadge status={event.status} size="sm" />
        </div>

        {/* Title & Format */}
        <Link href={`/events/${event.event_code}`} className="block group-hover:text-emerald-300 transition-colors">
          <h3 className="text-base font-bold text-white line-clamp-1">{event.title}</h3>
        </Link>
        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5 font-medium">
          <span>{event.event_type_name || 'Event Format'}</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-mono font-semibold">{event.platform}</span>
        </p>

        {/* Details row: Date, Venue/City */}
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{dateFormatted}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{event.college_name || 'Campus'}</span>
          </div>
        </div>

        {/* Stats: Registrations & Participants */}
        <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/60 text-xs">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Registrations</span>
            <span className="font-mono font-bold text-slate-200">
              {event.actual_registrations || event.expected_participants}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Participants</span>
            <span className="font-mono font-bold text-emerald-300">
              {event.actual_participants}
              {event.completion_rate ? ` (${event.completion_rate}%)` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Stage + Documentation Score + Link */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 bg-slate-800 rounded text-[11px] font-mono font-semibold text-slate-300">
            {event.lifecycle_stage}
          </div>
          <span className="text-[11px] text-slate-400">
            Doc: <strong className="text-slate-200">{event.documentation_score || 0}%</strong>
          </span>
        </div>

        <Link
          href={`/events/${event.event_code}`}
          className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>Open</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
