import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getArcadeInfoList } from '^/src/features/arcade-info/data';
import RecordForm from '^/src/features/arcade-record-article/record-form';
import { getMethodList } from '^/src/features/method/data';
import { IS_PRODUCTION } from '^/src/shared/lib/is-production';
import { createServerSideClient } from '^/src/shared/supabase/server';

export const metadata: Metadata = {
  title: `새로운 아케이드 기록 작성 :: ${
    IS_PRODUCTION ? 'YSOArcadeRecords' : 'DEV YSOArcadeRecords'
  }`,
  description: '새로운 아케이드 기록을 작성하는 곳',
};

export default async function CreateRecordPage() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const arcadeInfoList = await getArcadeInfoList();
  const methodList = await getMethodList();

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">새 기록 만들기</h1>
      <RecordForm arcadeInfoList={arcadeInfoList} methodList={methodList} />
    </main>
  );
}
