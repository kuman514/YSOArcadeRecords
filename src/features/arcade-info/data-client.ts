'use client';

import { ArcadeInfoDBColumn } from '^/src/entities/types/arcade-info';
import { selectDataClientSide } from '^/src/shared/supabase/database-client';

import { convertArcadeInfoDBColumnToArcadeInfo } from './util';

export async function getArcadeInfoListClientSide() {
  const result = await selectDataClientSide<ArcadeInfoDBColumn[]>({
    select: '*',
    from: 'arcade_info',
    where: [],
  });

  return result.map(convertArcadeInfoDBColumnToArcadeInfo);
}
