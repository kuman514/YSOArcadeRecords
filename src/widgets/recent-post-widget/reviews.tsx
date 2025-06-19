import PostListItem from '^/src/entities/post-list-item';
import { getReviewPostList } from '^/src/features/review-article/review-post-list/data';

export default async function RecentReviewPostsWidget() {
  const reviewPosts = (
    await getReviewPostList({
      from: 0,
      to: 2,
    })
  ).map((datum) => ({
    title: datum.title,
    memo: `${datum.subjectType} - ${datum.subjectName}`,
    dateToDisplay: datum.createdAt,
    tags: datum.tags,
    isHaveYouTube: Boolean(datum.youTubeId),
    href: `/reviews/${datum.reviewId}`,
    thumbnailUrl: datum.thumbnailUrl,
  }));

  return (
    <ul className="w-full flex flex-col gap-4">
      {reviewPosts.map((postListItem, index) => (
        <PostListItem
          key={`recent-post-list-item-${index}`}
          {...postListItem}
        />
      ))}
    </ul>
  );
}
