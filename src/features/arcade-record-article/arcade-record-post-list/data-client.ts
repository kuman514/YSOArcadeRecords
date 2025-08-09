import { ITEMS_PER_PAGE } from '^/src/entities/constants/pagenation';
import { ArcadeInfo } from '^/src/entities/types/arcade-info';
import { ArcadeRecordPostDBColumn } from '^/src/entities/types/post';
import { selectDataClientSide } from '^/src/shared/supabase/database-client';
import { ConditionType } from '^/src/shared/supabase/types';

import { convertArcadeRecordPostDBColumnToArcadeRecordPost } from './util';

export async function getExtendedArcadeRecordPostList(
  page: number,
  arcadeId?: ArcadeInfo['arcadeId']
) {
  const result = await selectDataClientSide<ArcadeRecordPostDBColumn[]>({
    select:
      'arcade_record_id, title, note, achieved_at, tags, youtube_id, thumbnail_url, arcade_info (*), methods (*)',
    from: 'records',
    where: arcadeId
      ? [
          {
            type: ConditionType.EQUAL,
            column: 'arcade_id',
            value: arcadeId,
          },
        ]
      : [],
    order: [
      {
        column: 'achieved_at',
        isAscending: false,
      },
    ],
    range: {
      from: page * ITEMS_PER_PAGE,
      to: (page + 1) * ITEMS_PER_PAGE,
    },
  });

  const content = result.map(convertArcadeRecordPostDBColumnToArcadeRecordPost);
  const isHaveNextPage = content.length === ITEMS_PER_PAGE + 1;

  if (isHaveNextPage) {
    content.pop();
  }

  return {
    content,
    nextPage: isHaveNextPage ? page + 1 : null,
  };
}
