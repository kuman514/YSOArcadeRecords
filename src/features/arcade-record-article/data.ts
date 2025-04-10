import { ArcadeInfo } from '^/src/entities/types/arcade-info';
import {
  ArcadeRecordPost,
  ArcadeRecordPostDBColumn,
} from '^/src/entities/types/post';
import { selectData } from '^/src/shared/supabase/database';
import { ConditionType } from '^/src/shared/supabase/types';

import { convertArcadeRecordPostDBColumnToArcadeRecordPost } from './arcade-record-post-list/util';

export async function getArcadeRecordPostArticle(
  arcadeId: ArcadeInfo['arcadeId'],
  arcadeRecordId: ArcadeRecordPost['arcadeRecordId']
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
      {
        type: ConditionType.EQUAL,
        column: 'arcade_record_id',
        value: arcadeRecordId,
      },
    ],
  });

  return result.map(convertArcadeRecordPostDBColumnToArcadeRecordPost)[0];
}
