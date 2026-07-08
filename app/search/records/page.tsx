import { Metadata } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import EmptySvg from '^/public/status/empty.svg';
import { APP_NAME } from '^/src/shared/util/is-production';
import { ITEMS_PER_PAGE } from '^/src/entities/constants/pagenation';
import RecordSearchResultList from '^/src/features/arcade-record-article/search-result-list';
import { getArcadeRecordPostList } from '^/src/features/arcade-record-article/arcade-record-post-list/data';

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
    title: `${searchText} 아케이드 기록 검색 결과 :: ${APP_NAME}`,
  };
}

export default async function RecordSearchPage({ searchParams }: Props) {
  const { searchText } = await searchParams;

  const queryClient = new QueryClient();
  const queryKey = ['search', 'arcade-records', searchText];

  // 첫 번째 페이지(0페이지) 데이터 가져오기 - 다음 페이지 확인을 위해 +1개 더 가져옴
  const firstPageData = await getArcadeRecordPostList(
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
      <Link
        className="hover:text-hovering"
        href={`/search?searchText=${searchText}`}
      >
        {'<'} 전체 검색 결과 보기
      </Link>
      <h1 className="text-4xl font-bold">
        "{searchText}" 아케이드 기록 검색 결과
      </h1>
      {content.length > 0 ? (
        <RecordSearchResultList dehydratedState={dehydrate(queryClient)} />
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
