import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getGalleryThemeList } from '^/src/features/gallery-theme/data';
import GalleryForm from '^/src/features/gallery/form';
import { IS_PRODUCTION } from '^/src/shared/lib/is-production';
import { createServerSideClient } from '^/src/shared/supabase/server';

export const metadata: Metadata = {
  title: `새로운 갤러리 사진 :: ${
    IS_PRODUCTION ? 'YSOArcadeRecords' : 'DEV YSOArcadeRecords'
  }`,
  description: '새로운 갤러리 사진을 올리는 곳',
};

export default async function CreateGalleryPage() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const galleryThemeList = await getGalleryThemeList();

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">새 갤러리 사진</h1>
      <GalleryForm galleryThemeList={galleryThemeList} />
    </main>
  );
}
