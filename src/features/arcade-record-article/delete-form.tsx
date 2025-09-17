'use client';

import { useActionState, useEffect } from 'react';

import { ArcadeRecordPost } from '^/src/entities/types/post';
import { useModalStore } from '^/src/shared/modal/store';
import { ModalType } from '^/src/shared/modal/types';

import { deleteArcadeRecordAction } from './delete-arcade-record-action';

interface Props {
  arcadeRecordId: ArcadeRecordPost['arcadeRecordId'];
}

export default function DeleteArcadeRecordForm({ arcadeRecordId }: Props) {
  const [, formAction, isLoading] = useActionState(
    deleteArcadeRecordAction,
    null
  );
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
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!confirm('삭제하시겠습니까?')) {
          event.preventDefault();
        }
      }}
    >
      <input
        type="hidden"
        id="arcadeRecordId"
        name="arcadeRecordId"
        value={arcadeRecordId}
      />
      <button className="cursor-pointer" type="submit" disabled={isLoading}>
        {isLoading ? '삭제 중' : '삭제하기'}
      </button>
    </form>
  );
}
