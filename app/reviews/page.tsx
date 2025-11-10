import EmptySvg from '^/public/status/empty.svg';
import { ITEMS_PER_PAGE } from '^/src/entities/constants/pagenation';
import { PostListItemProps } from '^/src/entities/post-list-item/props';
import ReviewPostList from '^/src/features/review-article/review-post-list';
import { getReviewPostList } from '^/src/features/review-article/review-post-list/data';
import { convertReviewPostToPostListItem } from '^/src/features/review-article/review-post-list/util';

export default async function ReviewListPage() {
  const data = await getReviewPostList({
    from: 0,
    to: ITEMS_PER_PAGE - 1,
  });

  const postListItems: PostListItemProps[] = data.map(
    convertReviewPostToPostListItem
  );

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">리뷰 목록</h1>
      {postListItems.length > 0 ? (
        <ReviewPostList reviewPostListItems={postListItems} />
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
