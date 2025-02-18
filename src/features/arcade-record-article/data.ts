import { ArcadeInfo } from '^/src/entities/types/arcade-record-compositions';
import {
  ArcadeRecordPost,
  ArcadeRecordPostDBColumn,
} from '^/src/entities/types/post';
import { readData } from '^/src/shared/supabase/database';

export async function getArcadeRecordPostArticle(
  arcadeId: ArcadeInfo['arcadeId'],
  arcadeRecordId: ArcadeRecordPost['arcadeRecordId']
) {
  const result = await readData<ArcadeRecordPostDBColumn[]>(
    'records',
    {
      column: 'arcade_id',
      value: arcadeId,
    },
    {
      column: 'arcade_record_id',
      value: arcadeRecordId,
    }
  );
  return result[0];
}
