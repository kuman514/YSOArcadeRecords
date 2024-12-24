import { temporaryPostList } from '^/src/entities/post-list-item/temp';
import ArcadeRecordPostList from '^/src/features/arcade-record-post-list';

export default function RecordListPage() {
  return (
    <main className="w-full h-full max-w-5xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">모든 아케이드 기록 목록</h1>
      <ArcadeRecordPostList arcadeRecordPostListItems={temporaryPostList} />
    </main>
  );
}
