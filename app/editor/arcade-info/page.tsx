import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import ArcadeInfoList from '^/src/features/arcade-info/list';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { APP_NAME } from '^/src/shared/util/is-production';

export const metadata: Metadata = {
  title: `아케이드 부문 리스트 :: ${APP_NAME}`,
  description: '아케이드 부문 리스트',
};

export default async function ArcadeInfoListPage() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  return (
    <main className="w-full h-full max-w-3xl px-4 sm:px-8 py-32 flex flex-col gap-4">
      <ArcadeInfoList />
    </main>
  );
}
