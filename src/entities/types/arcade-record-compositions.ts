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
