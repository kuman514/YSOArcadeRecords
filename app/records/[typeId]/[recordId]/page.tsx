import { notFound } from 'next/navigation';

import ArcadeRecordArticle from '^/src/features/arcade-record-article';
import { getArcadeRecordPostArticle } from '^/src/features/arcade-record-article/data';
import { convertArcadeRecordPostDBColumnToItems } from '^/src/features/arcade-record-post-list/util';

interface Props {
  params: {
    typeId: string;
    recordId: string;
  };
}

export default function RecordArticlePage({
  params: { typeId, recordId },
}: Props) {
  const data = getArcadeRecordPostArticle(typeId, recordId);

  if (!data) {
    notFound();
  }

  const convertedData = convertArcadeRecordPostDBColumnToItems(data);

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <ArcadeRecordArticle post={convertedData} />
    </main>
  );
}
