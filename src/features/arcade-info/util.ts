import {
  ArcadeInfo,
  ArcadeInfoDBColumn,
} from '^/src/entities/types/arcade-info';

export function convertArcadeInfoDBColumnToArcadeInfo({
  arcade_id,
  arcade_title,
}: ArcadeInfoDBColumn): ArcadeInfo {
  return {
    arcadeId: arcade_id,
    label: arcade_title,
  };
}
