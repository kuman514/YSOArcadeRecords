import Link from 'next/link';
import { notFound } from 'next/navigation';

import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';
import { getGallery } from '^/src/features/gallery/data';
import DeleteGalleryForm from '^/src/features/gallery/delete-form';
import ImageZoomController from '^/src/shared/image-zoom-controller';
import { CopyLinkButton } from '^/src/shared/share/copy-link';
import { ShareToTwitterButton } from '^/src/shared/share/share-to-twitter';
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

  const renderModifyButton = !(error || !data?.user) ? (
    <div className="w-full flex flex-row justify-end gap-2">
      <Link
        className="px-4 py-2 bg-primary hover:bg-hovering text-white rounded-sm cursor-pointer"
        href={`/gallery/${galleryId}/modify`}
      >
        수정하기
      </Link>
      <DeleteGalleryForm galleryId={galleryId} />
    </div>
  ) : null;

  return (
    <main className="w-full h-full max-w-3xl px-4 sm:px-8 py-32">
      <div className="fixed left-0 top-0 w-screen h-dvh bg-[rgba(0,0,0)] z-50 touch-none">
        <ImageZoomController
          imageUrl={galleryPost.imageUrl}
          alt={galleryPost.title}
        />

        <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between items-center pointer-events-none py-6">
          <div className="text-white px-4 py-2 bg-[rgba(32,32,32,0.6)] rounded-lg">
            주제: {galleryPost.theme.galleryThemeTitle}
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="text-white px-4 py-2 bg-[rgba(32,32,32,0.6)] rounded-lg">
              {galleryPost.title}
            </div>
            {renderModifyButton}
          </div>
        </div>

        <Link
          className="fixed left-0 top-0 w-12 h-12 p-2 m-2 cursor-pointer"
          href="/gallery"
        >
          <CloseSvgRepoComSvg width="100%" height="100%" />
        </Link>

        <div className="fixed flex flex-row gap-2 right-0 top-0 p-2 m-2">
          <ShareToTwitterButton postTitle={galleryPost.title} />
          <CopyLinkButton />
        </div>
      </div>
    </main>
  );
}
