import { ArcadeInfo } from '^/src/entities/types/arcade-record-compositions';
import { ArcadeRecordPostDBColumn } from '^/src/entities/types/post';
import db from '^/src/shared/lib/db';

export function getArcadeRecordPostList() {
  const statement = db.prepare<void[], ArcadeRecordPostDBColumn>(
    'SELECT * FROM records'
  );
  return statement.all();
}

export function getArcadeRecordPostListWithArcadeId(
  arcadeId: ArcadeInfo['arcadeId']
) {
  const statement = db.prepare<
    ArcadeInfo['arcadeId'],
    ArcadeRecordPostDBColumn
  >('SELECT * FROM records WHERE arcade_id = ?');
  return statement.all(arcadeId);
}
