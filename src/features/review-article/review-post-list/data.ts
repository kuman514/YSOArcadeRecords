import { ReviewPostDBColumn } from '^/src/entities/types/post';
import { selectData } from '^/src/shared/supabase/database';
import { SelectRange } from '^/src/shared/supabase/types';

import { convertReviewPostDBColumnToReviewPost } from './util';

export async function getReviewPostList(range?: SelectRange) {
  const result = await selectData<ReviewPostDBColumn[]>({
    select:
      'review_id, title, subject_name, subject_type, created_at, tags, youtube_id, thumbnail_url',
    from: 'reviews',
    where: [],
    order: [
      {
        column: 'created_at',
        isAscending: false,
      },
    ],
    range,
  });

  return result.map(convertReviewPostDBColumnToReviewPost);
}
