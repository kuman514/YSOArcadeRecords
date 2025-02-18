import { PostListItemProps } from '^/src/entities/post-list-item/props';
import ArcadeRecordPostList from '^/src/features/arcade-record-post-list';
import { getArcadeRecordPostList } from '^/src/features/arcade-record-post-list/data';
import { convertArcadeRecordPostDBColumnToItems } from '^/src/features/arcade-record-post-list/util';

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
      <ArcadeRecordPostList arcadeRecordPostListItems={postListItems} />
    </main>
  );
}
