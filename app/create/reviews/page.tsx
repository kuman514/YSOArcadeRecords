import { redirect } from 'next/navigation';

import { createServerSideClient } from '^/src/shared/supabase/server';

export default async function CreateReviewPage() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  return <main>현재 준비 중입니다.</main>;
}
