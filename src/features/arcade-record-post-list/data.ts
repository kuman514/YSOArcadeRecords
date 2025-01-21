import { ArcadeInfo } from '^/src/entities/types/arcade-record-compositions';
import db from '^/src/shared/db';

export function getArcadeRecordPostList() {
  const statement = db.prepare('SELECT * FROM records');
  return statement.all();
}

export function getArcadeRecordPostListWithArcadeId(
  arcadeId: ArcadeInfo['arcadeId']
) {
  const statement = db.prepare('SELECT * FROM records WHERE arcadeId = ?');
  return statement.all(arcadeId);
}
