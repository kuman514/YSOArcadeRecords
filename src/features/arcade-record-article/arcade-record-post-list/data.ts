import { ArcadeInfo } from '^/src/entities/types/arcade-info';
import { ArcadeRecordPostDBColumn } from '^/src/entities/types/post';
import { selectData } from '^/src/shared/supabase/database';
import { ConditionType } from '^/src/shared/supabase/types';

import { convertArcadeRecordPostDBColumnToArcadeRecordPost } from './util';

export async function getArcadeRecordPostList() {
  const result = await selectData<ArcadeRecordPostDBColumn[]>({
    select: '*, arcade_info (*), methods (*)',
    from: 'records',
    where: [],
    order: [
      {
        column: 'achieved_at',
        isAscending: false,
      },
    ],
  });

  return result.map(convertArcadeRecordPostDBColumnToArcadeRecordPost);
}

export async function getArcadeRecordPostListWithArcadeId(
  arcadeId: ArcadeInfo['arcadeId']
) {
  const result = await selectData<ArcadeRecordPostDBColumn[]>({
    select: '*, arcade_info (*), methods (*)',
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
  });

  return result.map(convertArcadeRecordPostDBColumnToArcadeRecordPost);
}
