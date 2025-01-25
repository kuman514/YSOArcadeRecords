import { redirect } from 'next/navigation';

import SignInForm from '^/src/features/auth/sign-in-form';
import { verifyAuth } from '^/src/shared/lib/auth';

export default async function SignInPage() {
  const result = await verifyAuth();

  if (result.user) {
    return redirect('/');
  }

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-center px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">로그인</h1>
      <SignInForm />
    </main>
  );
}
