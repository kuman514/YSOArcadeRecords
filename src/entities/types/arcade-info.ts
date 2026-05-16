export interface ArcadeInfo {
  arcadeId: string;
  label: string;
  description?: string;
  availableStages?: string[];
  availableRanks?: string[];
  availableTags?: string[];
}

export interface HavingArcadeInfo {
  /**
   * The played arcade game.
   */
  arcade: ArcadeInfo;
}

export interface ArcadeInfoDBColumn {
  arcade_id: ArcadeInfo['arcadeId'];
  arcade_title: ArcadeInfo['label'];
  description?: ArcadeInfo['description'];
  available_stages?: ArcadeInfo['availableStages'];
  available_ranks?: ArcadeInfo['availableRanks'];
  available_tags?: ArcadeInfo['availableTags'];
}
