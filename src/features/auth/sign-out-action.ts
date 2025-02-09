'use server';

import { redirect } from 'next/navigation';

import { destroySession } from '^/src/shared/lib/auth';

export async function signOutAction() {
  destroySession();
  redirect('/');
}
