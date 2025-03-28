import {
  ReviewPost,
  ReviewPostDBColumn,
  ReviewPostDBInput,
} from '^/src/entities/types/post';
import {
  deleteData,
  insertData,
  selectData,
  updateData,
} from '^/src/shared/supabase/database';
import { ConditionType } from '^/src/shared/supabase/types';

export async function getReviewPostList() {
  const result = await selectData<ReviewPostDBColumn[]>({
    select: '*',
    from: 'reviews',
    where: [],
  });

  return result;
}

export async function getReviewPost(reviewId: ReviewPost['postId']) {
  const result = await selectData<ReviewPostDBColumn[]>({
    select: '*',
    from: 'reviews',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'review_id',
        value: String(reviewId),
      },
    ],
  });

  return result[0];
}

export async function insertReviewPost(newReviewDBInput: ReviewPostDBInput) {
  await insertData({
    insertInto: 'reviews',
    value: newReviewDBInput,
  });
}

export async function updateReviewPost(
  reviewId: ReviewPost['postId'],
  newReviewDBInput: ReviewPostDBInput
) {
  await updateData({
    update: 'reviews',
    set: newReviewDBInput,
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'review_id',
        value: String(reviewId),
      },
    ],
  });
}

export async function deleteReviewPost(reviewId: ReviewPost['postId']) {
  await deleteData({
    deleteFrom: 'reviews',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'arcade_record_id',
        value: String(reviewId),
      },
    ],
  });
}
