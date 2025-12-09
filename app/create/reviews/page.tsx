import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import ReviewForm from '^/src/features/review-article/review-form';
import { APP_NAME } from '^/src/shared/lib/is-production';
import { createServerSideClient } from '^/src/shared/supabase/server';

export const metadata: Metadata = {
  title: `새로운 리뷰 작성 :: ${APP_NAME}`,
  description: '새로운 리뷰를 작성하는 곳',
};

export default async function CreateReviewPage() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">새 리뷰 만들기</h1>
      <ReviewForm />
    </main>
  );
}
