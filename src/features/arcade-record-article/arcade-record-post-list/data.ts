import { ArcadeInfo } from '^/src/entities/types/arcade-info';
import { ArcadeRecordPostDBColumn } from '^/src/entities/types/post';
import { selectData } from '^/src/shared/supabase/database';
import { ConditionType, SelectRange } from '^/src/shared/supabase/types';

import { convertArcadeRecordPostDBColumnToArcadeRecordPost } from './util';

export async function getArcadeRecordPostList(
  range?: SelectRange,
  arcadeId?: ArcadeInfo['arcadeId']
) {
  const result = await selectData<ArcadeRecordPostDBColumn[]>({
    select:
      'arcade_record_id, stage, rank, title, evaluation, score, elapsed_time, achieved_at, tags, youtube_id, thumbnail_url, arcade_info (*), methods (*)',
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
    range,
  });

  return result.map(convertArcadeRecordPostDBColumnToArcadeRecordPost);
}
