import { notFound } from 'next/navigation';

import EmptySvg from '^/public/status/empty.svg';
import { ITEMS_PER_PAGE } from '^/src/entities/constants/pagenation';
import { PostListItemProps } from '^/src/entities/post-list-item/props';
import { getArcadeInfo } from '^/src/features/arcade-info/data';
import ArcadeRecordPostList from '^/src/features/arcade-record-article/arcade-record-post-list';
import { getArcadeRecordPostList } from '^/src/features/arcade-record-article/arcade-record-post-list/data';
import { convertArcadeRecordPostToPostListItem } from '^/src/features/arcade-record-article/arcade-record-post-list/util';

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

  const data = await getArcadeRecordPostList(
    {
      from: 0,
      to: ITEMS_PER_PAGE - 1,
    },
    arcadeId
  );
  const postListItems: PostListItemProps[] = data.map(
    convertArcadeRecordPostToPostListItem
  );

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">{arcadeInfo.label} 기록 목록</h1>
      {postListItems.length > 0 ? (
        <ArcadeRecordPostList arcadeRecordPostListItems={postListItems} />
      ) : (
        <div className="w-full flex flex-col items-center gap-12 sm:gap-16">
          <div className="w-full flex flex-col items-center pt-12">
            <EmptySvg width={`${(100 * 5) / 9}%`} />
          </div>
          <span className="text-2xl font-bold text-center">
            기록이 없습니다.
          </span>
        </div>
      )}
    </main>
  );
}
