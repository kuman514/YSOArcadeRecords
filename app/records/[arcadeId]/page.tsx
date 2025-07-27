import Image from 'next/image';

import EmptyPng from '^/public/status/empty.png';
import { PostListItemProps } from '^/src/entities/post-list-item/props';
import { getArcadeInfo } from '^/src/features/arcade-info/data';
import ArcadeRecordPostList from '^/src/features/arcade-record-article/arcade-record-post-list';
import { getArcadeRecordPostListWithArcadeId } from '^/src/features/arcade-record-article/arcade-record-post-list/data';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    arcadeId: string;
  }>;
}

export default async function RecordListByTypeIdPage({ params }: Props) {
  const { arcadeId } = await params;

  const arcadeInfo = await getArcadeInfo(arcadeId);
  if (!arcadeInfo) {
    notFound();
  }

  const data = await getArcadeRecordPostListWithArcadeId(arcadeId);
  const postListItems: PostListItemProps[] = data.map((datum) => ({
    title: datum.title,
    memo: datum.note ?? '',
    dateToDisplay: datum.achievedAt,
    tags: datum.tags,
    isHaveYouTube: Boolean(datum.youTubeId),
    href: `/records/${datum.arcade.arcadeId}/${datum.arcadeRecordId}`,
    thumbnailUrl: datum.thumbnailUrl,
  }));

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">{arcadeInfo.label} 기록 목록</h1>
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
              priority
              sizes="37.5rem"
            />
          </div>
          <span className="text-2xl font-bold">기록이 없습니다.</span>
        </div>
      )}
    </main>
  );
}
