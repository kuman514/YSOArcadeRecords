import { temporaryPostList } from '^/src/entities/post-list-item/temp';
import ArcadeRecordPostList from '^/src/features/arcade-record-post-list';

interface Props {
  params: {
    typeId: string;
  };
}

export default function RecordListByTypeIdPage({ params }: Props) {
  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">{params.typeId} 기록 목록</h1>
      <ArcadeRecordPostList arcadeRecordPostListItems={temporaryPostList} />
    </main>
  );
}
