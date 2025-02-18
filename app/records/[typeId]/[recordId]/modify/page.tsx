import { notFound, redirect } from 'next/navigation';

import { getArcadeRecordPostArticle } from '^/src/features/arcade-record-article/data';
import RecordForm from '^/src/features/arcade-record-article/record-form';
import { convertArcadeRecordPostDBColumnToItems } from '^/src/features/arcade-record-post-list/util';
import { createServerSideClient } from '^/src/shared/supabase/server';

interface Props {
  params: Promise<{
    typeId: string;
    recordId: string;
  }>;
}

export default async function ModifyRecordPage({ params }: Props) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const { typeId, recordId } = await params;
  const article = await getArcadeRecordPostArticle(typeId, recordId);

  if (!article) {
    notFound();
  }

  const convertedArticle = convertArcadeRecordPostDBColumnToItems(article);

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">기록 편집하기</h1>
      <RecordForm post={convertedArticle} />
    </main>
  );
}
