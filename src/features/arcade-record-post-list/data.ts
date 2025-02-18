import { ArcadeInfo } from '^/src/entities/types/arcade-record-compositions';
import { ArcadeRecordPostDBColumn } from '^/src/entities/types/post';
import { readData } from '^/src/shared/supabase/database';

export async function getArcadeRecordPostList() {
  const result = await readData<ArcadeRecordPostDBColumn[]>('records');
  return result;
}

export async function getArcadeRecordPostListWithArcadeId(
  arcadeId: ArcadeInfo['arcadeId']
) {
  const result = await readData<ArcadeRecordPostDBColumn[]>('records', {
    column: 'arcade_id',
    value: arcadeId,
  });
  console.log(result, arcadeId);
  return result;
}
