import EmptySvg from '^/public/status/empty.svg';
import PostListItem from '^/src/entities/post-list-item';
import { getArcadeRecordPostList } from '^/src/features/arcade-record-article/arcade-record-post-list/data';
import { convertArcadeRecordPostToPostListItem } from '^/src/features/arcade-record-article/arcade-record-post-list/util';

export default async function RecentArcadeRecordPostsWidget() {
  const arcadeRecordPosts = (
    await getArcadeRecordPostList({
      from: 0,
      to: 2,
    })
  ).map(convertArcadeRecordPostToPostListItem);

  return arcadeRecordPosts.length > 0 ? (
    <ul className="w-full flex flex-col gap-4">
      {arcadeRecordPosts.map((postListItem, index) => (
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
      <span className="text-2xl font-bold text-center">기록이 없습니다.</span>
    </div>
  );
}
