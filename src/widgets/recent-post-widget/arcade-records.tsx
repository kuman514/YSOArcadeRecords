import Image from 'next/image';

import EmptyPng from '^/public/status/empty.png';
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
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-20 relative">
        <Image
          src={EmptyPng}
          fill
          alt="관련 데이터를 찾을 수 없음"
          className="object-contain"
          priority
          sizes="37.5rem"
        />
      </div>
      <span className="text-xl font-bold">기록이 없습니다.</span>
    </div>
  );
}
