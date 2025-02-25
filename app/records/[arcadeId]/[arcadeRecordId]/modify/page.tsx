import { notFound, redirect } from 'next/navigation';

import { getArcadeRecordPostArticle } from '^/src/features/arcade-record-article/data';
import RecordForm from '^/src/features/arcade-record-article/record-form';
import { convertArcadeRecordPostDBColumnToItems } from '^/src/features/arcade-record-post-list/util';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { getArcadeInfoList } from '^/src/features/arcade-info/data';
import { convertArcadeInfoDBColumnToArcadeInfo } from '^/src/features/arcade-info/util';
import { convertMethodDBColumnToMethod } from '^/src/features/method/util';
import { getMethodList } from '^/src/features/method/data';

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

  const convertedArticle = convertArcadeRecordPostDBColumnToItems(article);

  const arcadeInfoList = (await getArcadeInfoList()).map(
    convertArcadeInfoDBColumnToArcadeInfo
  );
  const methodList = (await getMethodList()).map(convertMethodDBColumnToMethod);

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">기록 편집하기</h1>
      <RecordForm
        post={convertedArticle}
        arcadeInfoList={arcadeInfoList}
        methodList={methodList}
      />
    </main>
  );
}
