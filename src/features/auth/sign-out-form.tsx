'use client';

import { useActionState } from 'react';

import { useLoadingBlockModal } from '^/src/shared/modal/loading-block';
import ExitSvgRepoComSvg from '^/public/icons/exit-svgrepo-com.svg';

import { signOutAction } from './sign-out-action';

export default function SignOutForm() {
  const [, formAction, isLoading] = useActionState(signOutAction, null);
  useLoadingBlockModal(isLoading);

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isLoading}
        className="w-16 h-16 flex flex-row justify-center items-center cursor-pointer"
      >
        <ExitSvgRepoComSvg width="1.4rem" height="1.4rem" />
      </button>
    </form>
  );
}
