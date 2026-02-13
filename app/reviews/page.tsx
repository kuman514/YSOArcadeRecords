import { QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import EmptySvg from '^/public/status/empty.svg';
import { ITEMS_PER_PAGE } from '^/src/entities/constants/pagenation';
import ReviewPostList from '^/src/features/review-article/review-post-list';
import { getReviewPostList } from '^/src/features/review-article/review-post-list/data';
import { APP_NAME } from '^/src/shared/lib/is-production';

export const metadata: Metadata = {
  title: `리뷰 목록 :: ${APP_NAME}`,
  description: 'YSO(kuman514)의 리뷰 목록',
};

export default async function ReviewListPage() {
  const queryClient = new QueryClient();
  const queryKey = ['reviews'];

  // 첫 번째 페이지(0페이지) 데이터 가져오기 - 다음 페이지 확인을 위해 +1개 더 가져옴
  const firstPageData = await getReviewPostList({
    from: 0,
    to: ITEMS_PER_PAGE,
  });

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
      <h1 className="text-4xl font-bold">리뷰 목록</h1>
      {content.length > 0 ? (
        <ReviewPostList dehydratedState={dehydrate(queryClient)} />
      ) : (
        <div className="w-full flex flex-col items-center gap-12 sm:gap-16">
          <div className="w-full flex flex-col items-center pt-12">
            <EmptySvg width={`${(100 * 5) / 9}%`} />
          </div>
          <span className="text-2xl font-bold text-center">
            리뷰가 없습니다.
          </span>
        </div>
      )}
    </main>
  );
}
