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

export async function getReviewPost(reviewId: ReviewPost['reviewId']) {
  const result = await selectData<ReviewPostDBColumn[]>({
    select: '*',
    from: 'reviews',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'review_id',
        value: reviewId,
      },
    ],
  });

  return result[0];
}

export async function insertReviewPost(
  newReviewDBInput: Omit<ReviewPostDBInput, 'id'>
) {
  await insertData({
    insertInto: 'reviews',
    value: newReviewDBInput,
  });
}

export async function updateReviewPost(
  reviewId: ReviewPost['reviewId'],
  newReviewDBInput: Omit<ReviewPostDBInput, 'id'>
) {
  await updateData({
    update: 'reviews',
    set: newReviewDBInput,
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'review_id',
        value: reviewId,
      },
    ],
  });
}

export async function deleteReviewPost(reviewId: ReviewPost['reviewId']) {
  await deleteData({
    deleteFrom: 'reviews',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'arcade_record_id',
        value: reviewId,
      },
    ],
  });
}
