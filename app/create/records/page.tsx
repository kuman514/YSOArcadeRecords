import { redirect } from 'next/navigation';

import RecordForm from '^/src/features/arcade-record-article/record-form';
import { createServerSideClient } from '^/src/shared/supabase/server';

export default async function CreateRecordPage() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">새 기록 만들기</h1>
      <RecordForm />
    </main>
  );
}
