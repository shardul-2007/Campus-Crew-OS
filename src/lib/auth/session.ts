import { cookies } from 'next/headers';
import { db } from '@/lib/db/store';
import { Profile, UserRole } from '@/types/database';

export const DEMO_USERS = {
  CREW: 'crew@example.com',
  ANALYST: 'analyst@example.com',
  ADMIN: 'admin@example.com',
};

export async function getCurrentUser(): Promise<Profile | null> {
  const cookieStore = cookies();
  const sessionUserEmail = cookieStore.get('campus_crew_user_email')?.value || DEMO_USERS.CREW;

  const profile = db.getProfileByEmail(sessionUserEmail);
  if (profile) return profile;

  // Fallback to demo crew member
  return db.getProfileByEmail(DEMO_USERS.CREW) || null;
}

export async function requireAuth(): Promise<Profile> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireRole(allowedRoles: UserRole[]): Promise<Profile> {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role) && user.role !== 'admin') {
    throw new Error('Forbidden: Insufficient privileges');
  }
  return user;
}
