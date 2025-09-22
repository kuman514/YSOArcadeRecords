'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { ArcadeRecordPostDBColumn } from '^/src/entities/types/post';
import { deleteData, selectData } from '^/src/shared/supabase/database';
import { removeUnusedImages } from '^/src/shared/supabase/image';
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

  const arcadeId = (
    await selectData<Pick<ArcadeRecordPostDBColumn, 'arcade_id'>[]>({
      select: 'arcade_id',
      from: 'records',
      where: [
        {
          type: ConditionType.EQUAL,
          column: 'arcade_record_id',
          value: arcadeRecordId,
        },
      ],
    })
  )[0].arcade_id;

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

  removeUnusedImages(`${arcadeId}/${arcadeRecordId}`, []);

  redirect(`/records`);
}
