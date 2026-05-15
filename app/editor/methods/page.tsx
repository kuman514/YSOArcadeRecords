import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import MethodForm from '^/src/features/method/form';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { APP_NAME } from '^/src/shared/util/is-production';

export const metadata: Metadata = {
  title: `플레이 수단 편집기 :: ${APP_NAME}`,
  description: '플레이 수단을 편집하는 곳',
};

export default async function MethodEditorPage() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  return (
    <main className="w-full h-full max-w-3xl px-4 sm:px-8 py-32 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">플레이 수단 편집기</h1>
      <MethodForm />
    </main>
  );
}
