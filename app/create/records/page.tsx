import { redirect } from 'next/navigation';

import RecordForm from '^/src/features/arcade-record-article/record-form';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { getArcadeInfoList } from '^/src/features/arcade-info/data';
import { convertArcadeInfoDBColumnToArcadeInfo } from '^/src/features/arcade-info/util';
import { getMethodList } from '^/src/features/method/data';
import { convertMethodDBColumnToMethod } from '^/src/features/method/util';

export default async function CreateRecordPage() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const arcadeInfoList = (await getArcadeInfoList()).map(
    convertArcadeInfoDBColumnToArcadeInfo
  );
  const methodList = (await getMethodList()).map(convertMethodDBColumnToMethod);

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">새 기록 만들기</h1>
      <RecordForm arcadeInfoList={arcadeInfoList} methodList={methodList} />
    </main>
  );
}
