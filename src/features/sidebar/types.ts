import {
  ArcadeInfo,
  ArcadeInfoDBColumn,
} from '^/src/entities/types/arcade-info';

export interface ArcadeRecordTypeCountDBColumn {
  arcade_id: ArcadeInfoDBColumn['arcade_id'];
  arcade_title: ArcadeInfoDBColumn['arcade_title'];
  length: number;
}

export interface ArcadeRecordTypeCount {
  arcadeId: ArcadeInfo['arcadeId'];
  label: ArcadeInfo['label'];
  length: ArcadeRecordTypeCountDBColumn['length'];
}
