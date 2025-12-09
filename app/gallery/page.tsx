import { Metadata } from 'next';

import EmptySvg from '^/public/status/empty.svg';
import { GALLERY_PHOTOS_PER_PAGE } from '^/src/entities/constants/pagenation';
import GalleryPostList from '^/src/features/gallery';
import { getGalleryList } from '^/src/features/gallery/data';
import { APP_NAME } from '^/src/shared/lib/is-production';

export const metadata: Metadata = {
  title: `갤러리 :: ${APP_NAME}`,
  description: 'YSO(kuman514)의 아케이드 사진 모음집',
};

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
        <div className="w-full flex flex-col items-center gap-12 sm:gap-16">
          <div className="w-full flex flex-col items-center pt-12">
            <EmptySvg width={`${(100 * 5) / 9}%`} />
          </div>
          <span className="text-2xl font-bold text-center">
            사진이 없습니다.
          </span>
        </div>
      )}
    </main>
  );
}
