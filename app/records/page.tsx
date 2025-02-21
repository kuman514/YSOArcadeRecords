import Image from 'next/image';

import { PostListItemProps } from '^/src/entities/post-list-item/props';
import ArcadeRecordPostList from '^/src/features/arcade-record-post-list';
import { getArcadeRecordPostList } from '^/src/features/arcade-record-post-list/data';
import { convertArcadeRecordPostDBColumnToItems } from '^/src/features/arcade-record-post-list/util';
import EmptyPng from '^/public/status/empty.png';

export default async function RecordListPage() {
  const data = (await getArcadeRecordPostList()).map(
    convertArcadeRecordPostDBColumnToItems
  );

  const postListItems: PostListItemProps[] = data.map((datum) => ({
    title: datum.title,
    memo: datum.note ?? '메모 없음',
    dateToDisplay: datum.achievedAt,
    tags: datum.tags.map((tag) => tag.label),
    isHaveYouTube: Boolean(datum.youTubeId),
    href: `/records/${datum.arcade.arcadeId}/${datum.arcadeRecordId}`,
    thumbnailUrl: datum.thumbnailUrl,
  }));

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">모든 아케이드 기록 목록</h1>
      {postListItems.length > 0 ? (
        <ArcadeRecordPostList arcadeRecordPostListItems={postListItems} />
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="w-full h-40 relative">
            <Image
              src={EmptyPng}
              fill
              alt="관련 데이터를 찾을 수 없음"
              className="object-contain"
            />
          </div>
          <span className="text-2xl font-bold">기록이 없습니다.</span>
        </div>
      )}
    </main>
  );
}
