import { ArcadeInfo } from '^/src/entities/types/arcade-record-compositions';
import {
  ArcadeRecordPost,
  ArcadeRecordPostDBColumn,
} from '^/src/entities/types/post';
import db from '^/src/shared/lib/db';

export function getArcadeRecordPostArticle(
  arcadeId: ArcadeInfo['arcadeId'],
  arcadeRecordId: ArcadeRecordPost['arcadeRecordId']
) {
  const statement = db.prepare<
    [ArcadeInfo['arcadeId'], ArcadeRecordPost['arcadeRecordId']],
    ArcadeRecordPostDBColumn
  >('SELECT * FROM records WHERE arcade_id = ? and arcade_record_id = ?');
  return statement.get(arcadeId, arcadeRecordId);
}
