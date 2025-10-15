import { redirect } from 'next/navigation';

import { getGalleryThemeList } from '^/src/features/gallery-theme/data';
import GalleryForm from '^/src/features/gallery/form';
import { createServerSideClient } from '^/src/shared/supabase/server';

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
