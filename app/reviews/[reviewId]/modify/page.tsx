import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { getReviewPost } from '^/src/features/review-article/data';
import ReviewForm from '^/src/features/review-article/review-form';
import { APP_NAME } from '^/src/shared/lib/is-production';
import { createServerSideClient } from '^/src/shared/supabase/server';

interface Props {
  params: Promise<{
    reviewId: string;
  }>;
}

export const metadata: Metadata = {
  title: `리뷰 편집하기 :: ${APP_NAME}`,
  description: '리뷰 포스트를 편집하는 곳',
};

export default async function ModifyReviewPage({ params }: Props) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const { reviewId } = await params;
  const article = await getReviewPost(reviewId);
  if (!article) {
    notFound();
  }

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">리뷰 편집하기</h1>
      <ReviewForm post={article} />
    </main>
  );
}
