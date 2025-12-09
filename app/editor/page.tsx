import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import ArcadeInfoForm from '^/src/features/arcade-info/form';
import GalleryThemeForm from '^/src/features/gallery-theme/form';
import MethodForm from '^/src/features/method/form';
import { IS_PRODUCTION } from '^/src/shared/lib/is-production';
import { createServerSideClient } from '^/src/shared/supabase/server';

export const metadata: Metadata = {
  title: `아케이드 정보 편집기 :: ${
    IS_PRODUCTION ? 'YSOArcadeRecords' : 'DEV YSOArcadeRecords'
  }`,
  description: '아케이드 부문, 플레이 수단, 갤러리 주제를 편집하는 곳',
};

export default async function EditorPage() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  return (
    <main className="w-full h-full max-w-3xl px-4 sm:px-8 py-32 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">아케이드 정보 편집기</h1>
      <ArcadeInfoForm />
      <MethodForm />
      <GalleryThemeForm />
    </main>
  );
}
