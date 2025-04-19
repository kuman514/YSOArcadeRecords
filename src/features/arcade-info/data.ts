import {
  ArcadeInfo,
  ArcadeInfoDBColumn,
} from '^/src/entities/types/arcade-info';
import { selectData } from '^/src/shared/supabase/database';
import { ConditionType } from '^/src/shared/supabase/types';

import { convertArcadeInfoDBColumnToArcadeInfo } from './util';

export async function getArcadeInfoList() {
  const result = await selectData<ArcadeInfoDBColumn[]>({
    select: '*',
    from: 'arcade_info',
    where: [],
  });

  return result.map(convertArcadeInfoDBColumnToArcadeInfo);
}

export async function getArcadeInfo(arcadeId: ArcadeInfo['arcadeId']) {
  const result = await selectData<ArcadeInfoDBColumn[]>({
    select: '*',
    from: 'arcade_info',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'arcade_id',
        value: arcadeId,
      },
    ],
  });

  return result.map(convertArcadeInfoDBColumnToArcadeInfo)[0];
}
