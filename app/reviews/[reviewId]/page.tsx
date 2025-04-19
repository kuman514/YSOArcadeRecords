import Link from 'next/link';
import { notFound } from 'next/navigation';

import ReviewArticle from '^/src/features/review-article';
import { getReviewPost } from '^/src/features/review-article/data';
import DeleteReviewForm from '^/src/features/review-article/delete-form';
import { createServerSideClient } from '^/src/shared/supabase/server';

interface Props {
  params: Promise<{
    reviewId: string;
  }>;
}

export default async function ReviewArticlePage({ params }: Props) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  const { reviewId } = await params;
  const article = await getReviewPost(reviewId);
  if (!article) {
    notFound();
  }

  const renderModifyButton = !(error || !data?.user) ? (
    <div className="w-full flex flex-row justify-end items-center gap-4">
      <Link href={`/reviews/${reviewId}/modify`}>수정하기</Link>
      <DeleteReviewForm reviewId={article.reviewId} />
    </div>
  ) : null;

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      {renderModifyButton}
      <ReviewArticle post={article} />
    </main>
  );
}
