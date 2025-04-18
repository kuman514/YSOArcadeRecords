import Link from 'next/link';
import { notFound } from 'next/navigation';

import ArcadeRecordArticle from '^/src/features/arcade-record-article';
import { getArcadeRecordPostArticle } from '^/src/features/arcade-record-article/data';
import DeleteArcadeRecordForm from '^/src/features/arcade-record-article/delete-form';
import { createServerSideClient } from '^/src/shared/supabase/server';

interface Props {
  params: Promise<{
    arcadeId: string;
    arcadeRecordId: string;
  }>;
}

export default async function RecordArticlePage({ params }: Props) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  const { arcadeId, arcadeRecordId } = await params;
  const article = await getArcadeRecordPostArticle(arcadeId, arcadeRecordId);
  if (!article) {
    notFound();
  }

  const renderModifyButton = !(error || !data?.user) ? (
    <div className="w-full flex flex-row justify-end items-center gap-4">
      <Link href={`/records/${arcadeId}/${arcadeRecordId}/modify`}>
        수정하기
      </Link>
      <DeleteArcadeRecordForm arcadeRecordId={article.arcadeRecordId} />
    </div>
  ) : null;

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      {renderModifyButton}
      <ArcadeRecordArticle post={article} />
    </main>
  );
}
