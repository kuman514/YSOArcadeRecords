import {
  ArcadeInfo,
  ArcadeInfoDBColumn,
} from '^/src/entities/types/arcade-info';
import {
  deleteData,
  selectData,
  updateData,
} from '^/src/shared/supabase/database';
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

export async function modifyArcadeInfo(
  arcadeId: ArcadeInfo['arcadeId'],
  newArcadeInfo: ArcadeInfo
) {
  await updateData<ArcadeInfoDBColumn>({
    update: 'arcade_info',
    set: {
      arcade_id: newArcadeInfo.arcadeId,
      arcade_title: newArcadeInfo.label,
    },
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'arcade_id',
        value: arcadeId,
      },
    ],
  });
}

export async function deleteArcadeInfo(arcadeId: ArcadeInfo['arcadeId']) {
  await deleteData({
    deleteFrom: 'arcade_info',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'arcade_id',
        value: arcadeId,
      },
    ],
  });
}
