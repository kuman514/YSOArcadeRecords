import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import GalleryThemeForm from '^/src/features/gallery-theme/form';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { APP_NAME } from '^/src/shared/util/is-production';

export const metadata: Metadata = {
  title: `갤러리 주제 편집기 :: ${APP_NAME}`,
  description: '갤러리 주제를 편집하는 곳',
};

export default async function GalleryThemeEditorPage() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  return (
    <main className="w-full h-full max-w-3xl px-4 sm:px-8 py-32 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">갤러리 주제 편집기</h1>
      <GalleryThemeForm />
    </main>
  );
}
