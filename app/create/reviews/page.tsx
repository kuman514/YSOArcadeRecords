import { redirect } from 'next/navigation';

import PreparingNotice from '^/src/shared/notice/preparing';
import { createServerSideClient } from '^/src/shared/supabase/server';

export default async function CreateReviewPage() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  return <PreparingNotice />;
}
