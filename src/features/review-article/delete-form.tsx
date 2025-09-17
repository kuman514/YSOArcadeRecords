'use client';

import { useActionState, useEffect } from 'react';

import { ReviewPost } from '^/src/entities/types/post';

import { useModalStore } from '^/src/shared/modal/store';
import { ModalType } from '^/src/shared/modal/types';

import { deleteReviewAction } from './delete-review-action';

interface Props {
  reviewId: ReviewPost['reviewId'];
}

export default function DeleteReviewForm({ reviewId }: Props) {
  const [, formAction, isLoading] = useActionState(deleteReviewAction, null);
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
      <input type="hidden" id="reviewId" name="reviewId" value={reviewId} />
      <button type="submit" disabled={isLoading} className="cursor-pointer">
        {isLoading ? '삭제 중' : '삭제하기'}
      </button>
    </form>
  );
}
