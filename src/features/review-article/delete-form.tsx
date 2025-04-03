'use client';

import { ReviewPost } from '^/src/entities/types/post';

import { deleteReviewAction } from './delete-review-action';

interface Props {
  reviewId: ReviewPost['reviewId'];
}

export default function DeleteReviewForm({ reviewId }: Props) {
  return (
    <form
      action={deleteReviewAction}
      onSubmit={(event) => {
        if (!confirm('삭제하시겠습니까?')) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" id="reviewId" name="reviewId" value={reviewId} />
      <button type="submit">삭제하기</button>
    </form>
  );
}
