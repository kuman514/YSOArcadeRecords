import { ArcadeInfo } from '^/src/entities/types/arcade-info';
import { ArcadeRecordPostDBColumn } from '^/src/entities/types/post';
import { selectData } from '^/src/shared/supabase/database';
import { ConditionType, SelectRange, Where } from '^/src/shared/supabase/types';

import { convertArcadeRecordPostDBColumnToArcadeRecordPost } from './util';

export async function getArcadeRecordPostList(
  range?: SelectRange,
  params?: {
    arcadeId?: ArcadeInfo['arcadeId'];
    searchText?: string;
  }
) {
  const where: Where[] = [];

  if (params?.arcadeId) {
    where.push({
      type: ConditionType.EQUAL,
      column: 'arcade_id',
      value: params.arcadeId,
    });
  }

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
          column: 'comment',
          value: params.searchText,
        },
      ],
    });
  }

  const result = await selectData<ArcadeRecordPostDBColumn[]>({
    select:
      'id, arcade_record_id, stage, rank, title, evaluation, score, elapsed_time, achieved_at, tags, youtube_id, thumbnail_url, arcade_info (*), methods (*)',
    from: 'records',
    where,
    order: [
      {
        column: 'achieved_at',
        isAscending: false,
      },
      {
        column: 'id',
        isAscending: false,
      },
    ],
    range,
  });

  return result.map(convertArcadeRecordPostDBColumnToArcadeRecordPost);
}
