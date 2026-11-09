'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db/store';

export async function switchDemoUser(email: string) {
  const profile = db.getProfileByEmail(email);
  if (!profile) {
    throw new Error('User not found');
  }

  const cookieStore = cookies();
  cookieStore.set('campus_crew_user_email', email, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30
  });

  revalidatePath('/', 'layout');
  return { success: true, profile };
}

export async function loginUser(email: string, _password?: string) {
  const profile = db.getProfileByEmail(email);
  if (!profile) {
    return { success: false, error: 'Invalid credentials. Demo accounts: crew@example.com, analyst@example.com, admin@example.com' };
  }

  const cookieStore = cookies();
  cookieStore.set('campus_crew_user_email', email, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30
  });

  db.logAudit(profile.id, 'User Login', 'auth', profile.id, null, { email });
  revalidatePath('/', 'layout');
  return { success: true, profile };
}

export async function logoutUser() {
  const cookieStore = cookies();
  cookieStore.delete('campus_crew_user_email');
  revalidatePath('/', 'layout');
  return { success: true };
}
