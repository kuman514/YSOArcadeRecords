import { redirect } from 'next/navigation';

import SignInForm from '^/src/features/auth/sign-in-form';
import { createServerSideClient } from '^/src/shared/supabase/server';

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
