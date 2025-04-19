import { notFound, redirect } from 'next/navigation';

import { getArcadeInfoList } from '^/src/features/arcade-info/data';
import { getArcadeRecordPostArticle } from '^/src/features/arcade-record-article/data';
import RecordForm from '^/src/features/arcade-record-article/record-form';
import { getMethodList } from '^/src/features/method/data';
import { createServerSideClient } from '^/src/shared/supabase/server';

interface Props {
  params: Promise<{
    arcadeId: string;
    arcadeRecordId: string;
  }>;
}

export default async function ModifyRecordPage({ params }: Props) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const { arcadeId, arcadeRecordId } = await params;
  const article = await getArcadeRecordPostArticle(arcadeId, arcadeRecordId);
  if (!article) {
    notFound();
  }

  const arcadeInfoList = await getArcadeInfoList();
  const methodList = await getMethodList();

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">기록 편집하기</h1>
      <RecordForm
        post={article}
        arcadeInfoList={arcadeInfoList}
        methodList={methodList}
      />
    </main>
  );
}
