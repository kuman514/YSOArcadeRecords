import { PostListItemProps } from '^/src/entities/post-list-item/props';
import ArcadeRecordPostList from '^/src/features/arcade-record-post-list';
import { getArcadeRecordPostListWithArcadeId } from '^/src/features/arcade-record-post-list/data';
import { convertArcadeRecordPostDBColumnToItems } from '^/src/features/arcade-record-post-list/util';

interface Props {
  params: Promise<{
    typeId: string;
  }>;
}

export default async function RecordListByTypeIdPage({ params }: Props) {
  const { typeId } = await params;
  const data = getArcadeRecordPostListWithArcadeId(typeId).map(
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
      <h1 className="text-4xl font-bold">{typeId} 기록 목록</h1>
      <ArcadeRecordPostList arcadeRecordPostListItems={postListItems} />
    </main>
  );
}
