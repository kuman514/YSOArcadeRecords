import { notFound } from 'next/navigation';

import { getArcadeRecordPostArticle } from '^/src/features/arcade-record-article/data';
import RecordForm from '^/src/features/arcade-record-article/record-form';
import { convertArcadeRecordPostDBColumnToItems } from '^/src/features/arcade-record-post-list/util';

interface Props {
  params: Promise<{
    typeId: string;
    recordId: string;
  }>;
}

export default async function ModifyRecordPage({ params }: Props) {
  const { typeId, recordId } = await params;
  const data = getArcadeRecordPostArticle(typeId, recordId);

  if (!data) {
    notFound();
  }

  const convertedData = convertArcadeRecordPostDBColumnToItems(data);

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">기록 편집하기</h1>
      <RecordForm post={convertedData} />
    </main>
  );
}
