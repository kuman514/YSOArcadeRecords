import { ReviewPostDBColumn } from '^/src/entities/types/post';
import { selectData } from '^/src/shared/supabase/database';

import { convertReviewPostDBColumnToReviewPost } from './util';

export async function getReviewPostList() {
  const result = await selectData<ReviewPostDBColumn[]>({
    select: '*',
    from: 'reviews',
    where: [],
    order: [
      {
        column: 'created_at',
        isAscending: false,
      },
    ],
  });

  return result.map(convertReviewPostDBColumnToReviewPost);
}
