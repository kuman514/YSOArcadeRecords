'use client';

import { ArcadeRecordPost } from '^/src/entities/types/post';
import { deleteArcadeRecordAction } from './delete-arcade-record-action';

interface Props {
  arcadeRecordId: ArcadeRecordPost['arcadeRecordId'];
}

export default function DeleteArcadeRecordForm({ arcadeRecordId }: Props) {
  return (
    <form
      action={deleteArcadeRecordAction}
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
      <button type="submit">삭제하기</button>
    </form>
  );
}
