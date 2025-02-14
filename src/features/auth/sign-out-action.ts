'use server';

import { redirect } from 'next/navigation';

import { createServerSideClient } from '^/src/shared/supabase/server';

export async function signOutAction() {
  const supabase = await createServerSideClient();

  await supabase.auth.signOut();
  redirect('/');
}
