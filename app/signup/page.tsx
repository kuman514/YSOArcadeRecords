import SignUpForm from '^/src/features/auth/sign-up-form';

export default function SignUpPage() {
  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-center px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">회원가입</h1>
      <SignUpForm />
    </main>
  );
}
