'use client';

import { useActionState } from 'react';

import { ReviewPost } from '^/src/entities/types/post';
import { useLoadingBlockModal } from '^/src/shared/modal/loading-block';

import { deleteReviewAction } from './delete-review-action';

interface Props {
  reviewId: ReviewPost['reviewId'];
}

export default function DeleteReviewForm({ reviewId }: Props) {
  const [, formAction, isLoading] = useActionState(deleteReviewAction, null);
  useLoadingBlockModal(isLoading);

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
