import { ITEMS_PER_PAGE } from '^/src/entities/constants/pagenation';
import { ReviewPostDBColumn } from '^/src/entities/types/post';
import { selectDataClientSide } from '^/src/shared/supabase/database-client';

import { convertReviewPostDBColumnToReviewPost } from './util';

export async function getExtendedReviewPostList(page: number) {
  const result = await selectDataClientSide<ReviewPostDBColumn[]>({
    select: '*',
    from: 'reviews',
    where: [],
    order: [
      {
        column: 'created_at',
        isAscending: false,
      },
    ],
    range: {
      from: page * ITEMS_PER_PAGE,
      to: (page + 1) * ITEMS_PER_PAGE,
    },
  });

  const content = result.map(convertReviewPostDBColumnToReviewPost);
  const isHaveNextPage = content.length === ITEMS_PER_PAGE + 1;

  if (isHaveNextPage) {
    content.pop();
  }

  return {
    content,
    nextPage: isHaveNextPage ? page + 1 : null,
  };
}
