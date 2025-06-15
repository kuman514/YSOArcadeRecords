import { selectDataClientSide } from '^/src/shared/supabase/database-client';

import { ArcadeRecordTypeCount, ArcadeRecordTypeCountDBColumn } from './types';

export async function getArcadeRecordTypeCount() {
  const result = await selectDataClientSide<ArcadeRecordTypeCountDBColumn[]>({
    select: '*',
    from: 'arcade_record_type_counts',
    where: [],
  });

  return result.map(
    (rawResult): ArcadeRecordTypeCount => ({
      arcadeId: rawResult.arcade_id,
      label: rawResult.arcade_title,
      length: rawResult.length,
    })
  );
}
