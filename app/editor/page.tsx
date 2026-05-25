import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createServerSideClient } from '^/src/shared/supabase/server';
import Container from '^/src/shared/ui/container';
import { APP_NAME } from '^/src/shared/util/is-production';

export const metadata: Metadata = {
  title: `아케이드 정보 편집기 :: ${APP_NAME}`,
  description: '아케이드 부문, 플레이 수단, 갤러리 주제를 편집하는 곳',
};

export default async function EditorPage() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  return (
    <main className="w-full h-full max-w-3xl px-4 sm:px-8 py-32 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">아케이드 정보 편집기</h1>
      <Link
        href="/editor/arcade-info"
        className="hover:[&>section]:bg-hovering"
      >
        <Container className="w-full flex flex-col justify-center items-center">
          아케이드 부문 편집기
        </Container>
      </Link>
      <Link href="/editor/methods" className="hover:[&>section]:bg-hovering">
        <Container className="w-full flex flex-col justify-center items-center">
          플레이 수단 편집기
        </Container>
      </Link>
      <Link
        href="/editor/gallery-theme"
        className="hover:[&>section]:bg-hovering"
      >
        <Container className="w-full flex flex-col justify-center items-center">
          갤러리 주제 편집기
        </Container>
      </Link>
    </main>
  );
}
