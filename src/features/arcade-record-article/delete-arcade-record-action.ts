'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import db from '^/src/shared/lib/db';
import { createServerSideClient } from '^/src/shared/supabase/server';

export async function deleteArcadeRecordAction(formData: FormData) {
  const arcadeRecordId = formData.get('arcadeRecordId')?.toString();

  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const statement = db.prepare(`
    DELETE FROM records WHERE arcade_record_id = ?
  `);

  statement.run(arcadeRecordId);

  revalidatePath('/records');
  redirect(`/records`);
}
