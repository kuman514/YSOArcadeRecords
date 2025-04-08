'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createServerSideClient } from '^/src/shared/supabase/server';
import { deleteReviewPost } from './data';

export async function deleteReviewAction(formData: FormData) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const reviewId = formData.get('reviewId')?.toString();
  await deleteReviewPost(reviewId!);

  revalidatePath('/reviews');
  redirect(`/reviews`);
}
