import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import SignInForm from '^/src/features/auth/sign-in-form';
import { IS_PRODUCTION } from '^/src/shared/lib/is-production';
import { createServerSideClient } from '^/src/shared/supabase/server';

export const metadata: Metadata = {
  title: `로그인 :: ${
    IS_PRODUCTION ? 'YSOArcadeRecords' : 'DEV YSOArcadeRecords'
  }`,
  description: '관리자 로그인',
};

export default async function SignInPage() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (!error || data?.user) {
    redirect('/');
  }

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-center px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">로그인</h1>
      <SignInForm />
    </main>
  );
}
