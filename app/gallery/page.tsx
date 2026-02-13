import { Metadata } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';

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
  const queryClient = new QueryClient();
  const queryKey = ['gallery'];

  // 첫 번째 페이지(0페이지) 데이터 가져오기 - 다음 페이지 확인을 위해 +1개 더 가져옴
  const firstPageData = await getGalleryList({
    from: 0,
    to: GALLERY_PHOTOS_PER_PAGE,
  });

  // 다음 페이지 존재 여부 확인
  const isHaveNextPage = firstPageData.length > GALLERY_PHOTOS_PER_PAGE;
  const content = isHaveNextPage
    ? firstPageData.slice(0, GALLERY_PHOTOS_PER_PAGE)
    : firstPageData;

  // prefetchInfiniteQuery로 첫 페이지 prefetch
  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: async () => ({
      content,
      nextPage: isHaveNextPage ? 1 : null,
    }),
    initialPageParam: 0,
  });

  return (
    <main className="w-full h-full max-w-3xl px-4 sm:px-8 py-32 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">아케이드 갤러리</h1>
      {content.length > 0 ? (
        <GalleryPostList
          galleryPosts={content}
          dehydratedState={dehydrate(queryClient)}
        />
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
