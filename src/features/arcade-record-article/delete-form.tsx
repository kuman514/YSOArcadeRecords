'use client';

import { useActionState } from 'react';

import { ArcadeRecordPost } from '^/src/entities/types/post';

import { deleteArcadeRecordAction } from './delete-arcade-record-action';

interface Props {
  arcadeRecordId: ArcadeRecordPost['arcadeRecordId'];
}

export default function DeleteArcadeRecordForm({ arcadeRecordId }: Props) {
  const [, formAction, isLoading] = useActionState(
    deleteArcadeRecordAction,
    null
  );

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
