export interface ArcadeRecord {
  /**
   * ID of the arcade game.
   */
  typeId: string;

  /**
   * Value on the criterion of the arcade game.
   * The value can be in various ways.
   * For example, score in Shmups or time taken to clear in TGM3.
   */
  evaluation: string;

  /**
   * The number of players of the play.
   */
  players: number;

  /**
   * The played side of the play.
   * For example, if the player played on Player 2, the value will be `2`.
   */
  playerSide: number;

  /**
   * The stage at the end of play.
   * For example, `24` in Galaga Arrangement, `1-4` in Strikers 1945 II, or `EX5` in TGM3 Sakura Mode.
   * It can be `ALL`, `1-ALL`, `2-ALL` if you all-cleared.
   */
  stage: string;

  /**
   * The date of the record.
   * For example, if a record is achieved on Dec 24 2024, the value will be `new Date('2024-12-24')`
   */
  achievedAt: Date;

  /**
   * `Optional`
   * The given rank or title at the end of play.
   * For example, `m3` in TGM3 Master Mode or `Iron Condor` in G-Darius.
   */
  rank?: string;
}
