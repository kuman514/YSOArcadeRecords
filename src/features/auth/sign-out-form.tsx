'use client';

import { useActionState, useEffect } from 'react';

import { useModalStore } from '^/src/shared/modal/store';
import { ModalType } from '^/src/shared/modal/types';

import { signOutAction } from './sign-out-action';

export default function SignOutForm() {
  const [, formAction, isLoading] = useActionState(signOutAction, null);
  const setModal = useModalStore((state) => state.setModal);

  useEffect(() => {
    if (isLoading) {
      setModal({
        type: ModalType.LOADING_BLOCK,
      });
    } else {
      setModal({
        type: ModalType.OFF,
      });
    }

    return () => {
      setModal({
        type: ModalType.OFF,
      });
    };
  }, [isLoading, setModal]);

  return (
    <form action={formAction}>
      <button type="submit" disabled={isLoading} className="cursor-pointer">
        로그아웃
      </button>
    </form>
  );
}
