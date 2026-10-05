import { Profile, EventRecord } from '@/types/database';
import { db } from '@/lib/db/store';

export function is_admin(user: Profile | null): boolean {
  return user?.role === 'admin';
}

export function is_analyst(user: Profile | null): boolean {
  return user?.role === 'analyst' || user?.role === 'admin' || user?.role === 'program_manager';
}

export function is_crew_member(user: Profile | null): boolean {
  return user?.role === 'crew_member';
}

export function is_event_owner(user: Profile | null, event: EventRecord): boolean {
  if (!user) return false;
  return event.created_by === user.id || is_admin(user);
}

export function is_event_team_member(user: Profile | null, eventId: string): boolean {
  if (!user) return false;
  if (is_admin(user)) return true;
  const team = db.getEventTeam(eventId);
  return team.some((t) => t.user_id === user.id);
}

export function can_edit_event(user: Profile | null, event: EventRecord): boolean {
  if (!user) return false;
  if (is_admin(user)) return true;
  if (is_analyst(user)) return true;
  if (is_event_owner(user, event) && ['draft', 'changes_requested'].includes(event.status)) {
    return true;
  }
  return false;
}

export function can_review_event(user: Profile | null): boolean {
  return is_analyst(user) || is_admin(user);
}

export function can_upload_proof(user: Profile | null, event: EventRecord): boolean {
  if (!user) return false;
  if (is_admin(user) || is_analyst(user)) return true;
  return is_event_owner(user, event) || is_event_team_member(user, event.id);
}
