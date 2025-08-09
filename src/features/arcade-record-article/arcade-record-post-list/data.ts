import { ArcadeInfo } from '^/src/entities/types/arcade-info';
import { ArcadeRecordPostDBColumn } from '^/src/entities/types/post';
import { selectData } from '^/src/shared/supabase/database';
import { ConditionType, SelectRange } from '^/src/shared/supabase/types';

import { convertArcadeRecordPostDBColumnToArcadeRecordPost } from './util';

/**
 * @todo
 * Unify `getArcadeRecordPostList` and `getArcadeRecordPostListWithArcadeId`.
 */

export async function getArcadeRecordPostList(range?: SelectRange) {
  const result = await selectData<ArcadeRecordPostDBColumn[]>({
    select:
      'arcade_record_id, title, note, achieved_at, tags, youtube_id, thumbnail_url, arcade_info (*), methods (*)',
    from: 'records',
    where: [],
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

export async function getArcadeRecordPostListWithArcadeId(
  arcadeId: ArcadeInfo['arcadeId'],
  range?: SelectRange
) {
  const result = await selectData<ArcadeRecordPostDBColumn[]>({
    select:
      'arcade_record_id, title, note, achieved_at, tags, youtube_id, thumbnail_url, arcade_info (*), methods (*)',
    from: 'records',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'arcade_id',
        value: arcadeId,
      },
    ],
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
