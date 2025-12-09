import { Metadata } from 'next';

import EmptySvg from '^/public/status/empty.svg';
import { ITEMS_PER_PAGE } from '^/src/entities/constants/pagenation';
import { PostListItemProps } from '^/src/entities/post-list-item/props';
import ArcadeRecordPostList from '^/src/features/arcade-record-article/arcade-record-post-list';
import { getArcadeRecordPostList } from '^/src/features/arcade-record-article/arcade-record-post-list/data';
import { convertArcadeRecordPostToPostListItem } from '^/src/features/arcade-record-article/arcade-record-post-list/util';
import { IS_PRODUCTION } from '^/src/shared/lib/is-production';

export const metadata: Metadata = {
  title: `모든 아케이드 기록 목록 :: ${
    IS_PRODUCTION ? 'YSOArcadeRecords' : 'DEV YSOArcadeRecords'
  }`,
  description: 'YSO(kuman514)의 모든 부문의 아케이드 기록에 대한 목록',
};

export default async function RecordListPage() {
  const data = await getArcadeRecordPostList({
    from: 0,
    to: ITEMS_PER_PAGE - 1,
  });

  const postListItems: PostListItemProps[] = data.map(
    convertArcadeRecordPostToPostListItem
  );

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">모든 아케이드 기록 목록</h1>
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
