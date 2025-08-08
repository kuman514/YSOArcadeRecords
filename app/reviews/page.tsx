import Image from 'next/image';

import EmptyPng from '^/public/status/empty.png';
import { ITEMS_PER_PAGE } from '^/src/entities/constants/pagenation';
import { PostListItemProps } from '^/src/entities/post-list-item/props';
import ReviewPostList from '^/src/features/review-article/review-post-list';
import { getReviewPostList } from '^/src/features/review-article/review-post-list/data';

export default async function ReviewListPage() {
  const data = await getReviewPostList({
    from: 0,
    to: ITEMS_PER_PAGE - 1,
  });

  const postListItems: PostListItemProps[] = data.map((datum) => ({
    title: datum.title,
    memo: `${datum.subjectType} - ${datum.subjectName}`,
    dateToDisplay: datum.createdAt,
    tags: datum.tags,
    isHaveYouTube: Boolean(datum.youTubeId),
    href: `/reviews/${datum.reviewId}`,
    thumbnailUrl: datum.thumbnailUrl,
  }));

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">리뷰 목록</h1>
      {postListItems.length > 0 ? (
        <ReviewPostList reviewPostListItems={postListItems} />
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
          <span className="text-2xl font-bold">리뷰가 없습니다.</span>
        </div>
      )}
    </main>
  );
}
