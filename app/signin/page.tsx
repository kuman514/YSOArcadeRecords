import SignInForm from '^/src/features/auth/sign-in-form';

export default function SignInPage() {
  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-center px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">로그인</h1>
      <SignInForm />
    </main>
  );
}
