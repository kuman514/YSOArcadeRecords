import {
  ArcadeInfo,
  ArcadeInfoDBColumn,
} from '^/src/entities/types/arcade-info';

export function convertArcadeInfoDBColumnToArcadeInfo({
  arcade_id,
  arcade_title,
  description,
  available_stages,
  available_ranks,
  available_tags,
}: ArcadeInfoDBColumn): ArcadeInfo {
  return {
    arcadeId: arcade_id,
    label: arcade_title,
    description,
    availableStages: available_stages,
    availableRanks: available_ranks,
    availableTags: available_tags,
  };
}
