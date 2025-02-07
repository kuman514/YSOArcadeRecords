import Link from 'next/link';
import { notFound } from 'next/navigation';

import ArcadeRecordArticle from '^/src/features/arcade-record-article';
import { getArcadeRecordPostArticle } from '^/src/features/arcade-record-article/data';
import { deleteArcadeRecordAction } from '^/src/features/arcade-record-article/delete-arcade-record-action';
import { convertArcadeRecordPostDBColumnToItems } from '^/src/features/arcade-record-post-list/util';
import { verifyAuth } from '^/src/shared/lib/auth';

interface Props {
  params: Promise<{
    typeId: string;
    recordId: string;
  }>;
}

export default async function RecordArticlePage({ params }: Props) {
  const { typeId, recordId } = await params;
  const data = getArcadeRecordPostArticle(typeId, recordId);
  const user = await verifyAuth();

  if (!data) {
    notFound();
  }

  const convertedData = convertArcadeRecordPostDBColumnToItems(data);

  const renderModifyButton = user.user ? (
    <div className="w-full flex flex-row justify-end items-center gap-4">
      <Link href={`/records/${typeId}/${recordId}/modify`}>수정하기</Link>
      <form action={deleteArcadeRecordAction}>
        <input
          type="hidden"
          id="arcadeRecordId"
          name="arcadeRecordId"
          value={data.arcadeRecordId}
        />
        <button type="submit">삭제하기</button>
      </form>
    </div>
  ) : null;

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      {renderModifyButton}
      <ArcadeRecordArticle post={convertedData} />
    </main>
  );
}
