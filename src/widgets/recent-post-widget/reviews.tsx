import EmptySvg from '^/public/status/empty.svg';
import PostListItem from '^/src/entities/post-list-item';
import { getReviewPostList } from '^/src/features/review-article/review-post-list/data';
import { convertReviewPostToPostListItem } from '^/src/features/review-article/review-post-list/util';

export default async function RecentReviewPostsWidget() {
  const reviewPosts = (
    await getReviewPostList({
      from: 0,
      to: 2,
    })
  ).map(convertReviewPostToPostListItem);

  return reviewPosts.length > 0 ? (
    <ul className="w-full flex flex-col gap-4">
      {reviewPosts.map((postListItem, index) => (
        <PostListItem
          key={`recent-post-list-item-${index}`}
          {...postListItem}
        />
      ))}
    </ul>
  ) : (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="w-full flex flex-col items-center pt-6">
        <EmptySvg width={`${(100 * 5) / 9}%`} />
      </div>
      <span className="text-xl font-bold text-center">리뷰가 없습니다.</span>
    </div>
  );
}
