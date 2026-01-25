import {
  ArcadeRecordPost,
  ArcadeRecordPostDBColumn,
} from '^/src/entities/types/post';
import { selectData } from '^/src/shared/supabase/database';
import { ConditionType } from '^/src/shared/supabase/types';

import { convertArcadeRecordPostDBColumnToArcadeRecordPost } from './arcade-record-post-list/util';

export async function getArcadeRecordPostArticle(
  arcadeRecordId: ArcadeRecordPost['arcadeRecordId']
) {
  const result = await selectData<ArcadeRecordPostDBColumn[]>({
    select:
      'id, arcade_record_id, stage, rank, title, evaluation, score, elapsed_time, created_at, modified_at, comment, note, achieved_at, tags, youtube_id, thumbnail_url, image_urls, arcade_info (*), methods (*)',
    from: 'records',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'arcade_record_id',
        value: arcadeRecordId,
      },
    ],
  });

  return result.map(convertArcadeRecordPostDBColumnToArcadeRecordPost)[0];
}
