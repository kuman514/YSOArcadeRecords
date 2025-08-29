import Image from 'next/image';

import EmptyPng from '^/public/status/empty.png';
import { GALLERY_PHOTOS_PER_PAGE } from '^/src/entities/constants/pagenation';
import GalleryPostList from '^/src/features/gallery';
import { getGalleryList } from '^/src/features/gallery/data';

export default async function GalleryPage() {
  const data = await getGalleryList({
    from: 0,
    to: GALLERY_PHOTOS_PER_PAGE - 1,
  });

  return (
    <main className="w-full h-full max-w-3xl px-4 sm:px-8 py-32 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">아케이드 갤러리</h1>
      {data.length > 0 ? (
        <GalleryPostList galleryPosts={data} />
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="w-full h-40 relative">
            <Image
              src={EmptyPng}
              fill
              alt="관련 데이터를 찾을 수 없음"
              className="object-contain"
              priority
              sizes="37.5rem"
            />
          </div>
          <span className="text-2xl font-bold">사진이 없습니다.</span>
        </div>
      )}
    </main>
  );
}
