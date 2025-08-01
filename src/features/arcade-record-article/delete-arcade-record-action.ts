'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { deleteData } from '^/src/shared/supabase/database';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { ConditionType } from '^/src/shared/supabase/types';

export async function deleteArcadeRecordAction(_: null, formData: FormData) {
  const arcadeRecordId = formData.get('arcadeRecordId')?.toString();

  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  if (!arcadeRecordId) {
    return null;
  }

  await deleteData({
    deleteFrom: 'records',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'arcade_record_id',
        value: arcadeRecordId,
      },
    ],
  });

  revalidatePath('/', 'page');
  revalidatePath('/records', 'layout');
  redirect(`/records`);
}
