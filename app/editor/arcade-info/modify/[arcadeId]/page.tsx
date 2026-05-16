import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { getArcadeInfo } from '^/src/features/arcade-info/data';
import ArcadeInfoForm from '^/src/features/arcade-info/form';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { APP_NAME } from '^/src/shared/util/is-production';

export const metadata: Metadata = {
  title: `아케이드 부문 편집 :: ${APP_NAME}`,
  description: '아케이드 부문을 편집하는 곳',
};

interface Props {
  params: Promise<{
    arcadeId: string;
  }>;
}

export default async function ModifyArcadeInfoPage({ params }: Props) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const arcadeId = (await params).arcadeId;
  const arcadeInfo = await getArcadeInfo(arcadeId);

  if (!arcadeInfo) {
    notFound();
  }

  return (
    <main className="w-full h-full max-w-3xl px-4 sm:px-8 py-32 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">아케이드 부문 편집</h1>
      <ArcadeInfoForm arcadeInfo={arcadeInfo} />
    </main>
  );
}
