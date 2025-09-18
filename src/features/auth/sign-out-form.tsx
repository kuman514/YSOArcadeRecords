'use client';

import { useActionState } from 'react';

import { useLoadingBlockModal } from '^/src/shared/modal/loading-block';

import { signOutAction } from './sign-out-action';

export default function SignOutForm() {
  const [, formAction, isLoading] = useActionState(signOutAction, null);
  useLoadingBlockModal(isLoading);

  return (
    <form action={formAction}>
      <button type="submit" disabled={isLoading} className="cursor-pointer">
        로그아웃
      </button>
    </form>
  );
}
