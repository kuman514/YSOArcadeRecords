'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { deleteData } from '^/src/shared/supabase/database';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { ConditionType } from '^/src/shared/supabase/types';

export async function deleteGalleryAction(_: null, formData: FormData) {
  const galleryId = formData.get('galleryId')?.toString();

  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  if (!galleryId) {
    return null;
  }

  await deleteData({
    deleteFrom: 'gallery',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'gallery_id',
        value: galleryId,
      },
    ],
  });

  revalidatePath('/gallery', 'layout');
  redirect(`/gallery`);
}
