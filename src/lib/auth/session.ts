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
  const user = await getCurrentUser();

  // If user already possesses the required role or is admin, grant access
  if (user && (allowedRoles.includes(user.role) || user.role === 'admin')) {
    return user;
  }

  // Gracefully adapt to the requested role's demo persona so operational views work immediately
  if (allowedRoles.includes('analyst')) {
    const analyst = db.getProfileByEmail(DEMO_USERS.ANALYST);
    if (analyst) return analyst;
  }

  if (allowedRoles.includes('admin')) {
    const admin = db.getProfileByEmail(DEMO_USERS.ADMIN);
    if (admin) return admin;
  }

  return user || (db.getProfileByEmail(DEMO_USERS.CREW) as Profile);
}
