'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { removeUnusedImages } from '^/src/shared/supabase/image';
import { createServerSideClient } from '^/src/shared/supabase/server';

import { deleteReviewPost } from './data';

export async function deleteReviewAction(_: null, formData: FormData) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const reviewId = formData.get('reviewId')?.toString();
  if (!reviewId) {
    return null;
  }

  await deleteReviewPost(reviewId);

  revalidatePath('/', 'page');
  revalidatePath('/reviews', 'layout');

  removeUnusedImages(`reviews/${reviewId}`, []);

  redirect(`/reviews`);
}
