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

// ===========================================

export interface PlayerInfo {
  /**
   * The number of players of the play.
   */
  players: number;

  /**
   * The played side of the play.
   * For example, if the player played on Player 2, the value will be `2`.
   */
  playerSide: number;
}

export interface HavingPlayerInfo {
  playerInfo: PlayerInfo;
}

// ===========================================

export interface Method {
  methodId: string;
  label: string;
}

export interface HavingMethod {
  /**
   * The place or game console the play happened on.
   */
  method: Method;
}
