import { notFound, redirect } from 'next/navigation';

import { getGalleryThemeList } from '^/src/features/gallery-theme/data';
import { getGallery } from '^/src/features/gallery/data';
import GalleryForm from '^/src/features/gallery/form';
import { createServerSideClient } from '^/src/shared/supabase/server';

interface Props {
  params: Promise<{
    galleryId: string;
  }>;
}

export default async function ModifyGalleryPage({ params }: Props) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const { galleryId } = await params;

  const galleryPost = await getGallery(galleryId);
  if (!galleryPost) {
    notFound();
  }

  const galleryThemeList = await getGalleryThemeList();

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">갤러리 사진 편집하기</h1>
      <GalleryForm post={galleryPost} galleryThemeList={galleryThemeList} />
    </main>
  );
}
