'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { deleteData } from '^/src/shared/supabase/database';
import { createServerSideClient } from '^/src/shared/supabase/server';

export async function deleteArcadeRecordAction(formData: FormData) {
  const arcadeRecordId = formData.get('arcadeRecordId')?.toString();

  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  await deleteData('records', {
    column: 'arcade_record_id',
    value: arcadeRecordId!,
  });

  revalidatePath('/records');
  redirect(`/records`);
}
