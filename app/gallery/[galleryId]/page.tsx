import Link from 'next/link';
import { notFound } from 'next/navigation';

import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';
import { getGallery } from '^/src/features/gallery/data';
import GalleryPostViewer from '^/src/features/gallery/viewer';
import { createServerSideClient } from '^/src/shared/supabase/server';

interface Props {
  params: Promise<{
    galleryId: string;
  }>;
}

export default async function GalleryPostPage({ params }: Props) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  const { galleryId } = await params;

  const galleryPost = await getGallery(galleryId);
  if (!galleryPost) {
    notFound();
  }

  return (
    <main className="w-full h-full max-w-3xl px-4 sm:px-8 py-32">
      <div className="fixed left-0 top-0 w-screen h-dvh bg-[rgba(0,0,0)] z-50 touch-none">
        <GalleryPostViewer
          galleryPost={galleryPost}
          isAuthenticated={Boolean(!(error || !data?.user))}
        />

        <Link
          className="fixed left-0 top-0 w-12 h-12 p-2 m-2 cursor-pointer"
          href="/gallery"
        >
          <CloseSvgRepoComSvg width="100%" height="100%" />
        </Link>
      </div>
    </main>
  );
}
