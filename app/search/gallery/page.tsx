import { Metadata } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import EmptySvg from '^/public/status/empty.svg';
import { APP_NAME } from '^/src/shared/util/is-production';
import { ITEMS_PER_PAGE } from '^/src/entities/constants/pagenation';
import { getGalleryList } from '^/src/features/gallery/data';
import GallerySearchResultList from '^/src/features/gallery/search-result-list';

interface Props {
  searchParams: Promise<{
    searchText?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { searchText } = await searchParams;
  return {
    title: `${searchText} 갤러리 검색 결과 :: ${APP_NAME}`,
  };
}

export default async function GallerySearchPage({ searchParams }: Props) {
  const { searchText } = await searchParams;

  const queryClient = new QueryClient();
  const queryKey = ['search', 'gallery', searchText];

  // 첫 번째 페이지(0페이지) 데이터 가져오기 - 다음 페이지 확인을 위해 +1개 더 가져옴
  const firstPageData = await getGalleryList(
    {
      from: 0,
      to: ITEMS_PER_PAGE,
    },
    {
      searchText,
    }
  );

  // 다음 페이지 존재 여부 확인
  const isHaveNextPage = firstPageData.length > ITEMS_PER_PAGE;
  const content = isHaveNextPage
    ? firstPageData.slice(0, ITEMS_PER_PAGE)
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
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">"{searchText}" 갤러리 검색 결과</h1>
      {content.length > 0 ? (
        <GallerySearchResultList dehydratedState={dehydrate(queryClient)} />
      ) : (
        <div className="w-full flex flex-col items-center gap-12 sm:gap-16">
          <div className="w-full flex flex-col items-center pt-12">
            <EmptySvg width={`${(100 * 5) / 9}%`} />
          </div>
          <span className="text-2xl font-bold text-center">
            검색 결과가 없습니다.
          </span>
        </div>
      )}
    </main>
  );
}
