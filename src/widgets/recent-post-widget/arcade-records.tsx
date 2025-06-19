import PostListItem from '^/src/entities/post-list-item';
import { getArcadeRecordPostList } from '^/src/features/arcade-record-article/arcade-record-post-list/data';

export default async function RecentArcadeRecordPostsWidget() {
  const arcadeRecordPosts = (
    await getArcadeRecordPostList({
      from: 0,
      to: 2,
    })
  ).map((datum) => ({
    title: datum.title,
    memo: datum.note ?? '메모 없음',
    dateToDisplay: datum.achievedAt,
    tags: datum.tags,
    isHaveYouTube: Boolean(datum.youTubeId),
    href: `/records/${datum.arcade.arcadeId}/${datum.arcadeRecordId}`,
    thumbnailUrl: datum.thumbnailUrl,
  }));

  return (
    <ul className="w-full flex flex-col gap-4">
      {arcadeRecordPosts.map((postListItem, index) => (
        <PostListItem
          key={`recent-post-list-item-${index}`}
          {...postListItem}
        />
      ))}
    </ul>
  );
}
