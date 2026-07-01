import { ReviewPostDBColumn } from '^/src/entities/types/post';
import { selectData } from '^/src/shared/supabase/database';
import { ConditionType, SelectRange, Where } from '^/src/shared/supabase/types';

import { convertReviewPostDBColumnToReviewPost } from './util';

export async function getReviewPostList(
  range?: SelectRange,
  params?: {
    searchText?: string;
  }
) {
  const where: Where[] = [];

  if (params?.searchText) {
    where.push({
      type: ConditionType.OR,
      wheres: [
        {
          type: ConditionType.ILIKE,
          column: 'title',
          value: params.searchText,
        },
        {
          type: ConditionType.ILIKE,
          column: 'subject_name',
          value: params.searchText,
        },
      ],
    });
  }

  const result = await selectData<ReviewPostDBColumn[]>({
    select:
      'id, review_id, title, tags, subject_name, subject_type, created_by, release_date, details, key_features, expectations, first_impressions, positives, negatives, conclusions, review_score, youtube_id, thumbnail_url, image_urls, created_at, modified_at',
    from: 'reviews',
    where,
    order: [
      {
        column: 'id',
        isAscending: false,
      },
    ],
    range,
  });

  return result.map(convertReviewPostDBColumnToReviewPost);
}
