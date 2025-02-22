export interface ArcadeInfo {
  arcadeId: string;
  label: string;
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
}
