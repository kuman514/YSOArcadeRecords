import Link from 'next/link';

import { getGallery } from '^/src/features/gallery/data';
import ImageZoomController from '^/src/shared/image-zoom-controller';
import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';

interface Props {
  params: Promise<{
    galleryId: string;
  }>;
}

export default async function GalleryPostPage({ params }: Props) {
  const { galleryId } = await params;

  const data = await getGallery(galleryId);

  return (
    <main className="w-full h-full max-w-3xl px-4 sm:px-8 py-32">
      <div className="fixed left-0 top-0 w-screen h-dvh bg-[rgba(0,0,0)] z-50 touch-none">
        <ImageZoomController imageUrl={data.imageUrl} alt={data.title} />
        <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between items-center pointer-events-none py-6">
          <div className="text-white px-4 py-2 bg-[rgba(32,32,32,0.6)] rounded-lg">
            주제: {data.theme.galleryThemeTitle}
          </div>
          <div className="text-white px-4 py-2 bg-[rgba(32,32,32,0.6)] rounded-lg">
            {data.title}
          </div>
        </div>
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
