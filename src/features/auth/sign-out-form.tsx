'use client';

import { useActionState } from 'react';

import { signOutAction } from './sign-out-action';

export default function SignOutForm() {
  const [, formAction, isLoading] = useActionState(signOutAction, null);

  return (
    <form action={formAction}>
      <button type="submit" disabled={isLoading} className="cursor-pointer">
        로그아웃
      </button>
    </form>
  );
}
