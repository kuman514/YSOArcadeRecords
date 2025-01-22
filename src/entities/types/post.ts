import { ArcadeInfo, Method, PlayerInfo } from './arcade-record-compositions';
import { ArcadeRecord } from './arcade-record';
import {
  Author,
  Commentable,
  HavingAuthor,
  HavingImages,
  HavingThumbnail,
  HavingYouTube,
  Taggable,
} from './post-compositions';

export interface BasePost extends HavingAuthor, Commentable, Taggable {
  postId: number;
  title: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface ArcadeRecordPost
  extends BasePost,
    ArcadeRecord,
    HavingThumbnail,
    HavingImages,
    HavingYouTube {}

export interface ArcadeRecordPostDBColumn {
  id: ArcadeRecordPost['postId'];
  arcadeRecordId: ArcadeRecordPost['arcadeRecordId'];
  title: ArcadeRecordPost['title'];
  authorId: Author['authorId'];
  arcadeId: ArcadeInfo['arcadeId'];
  methodId: Method['methodId'];
  players: PlayerInfo['players'];
  playerSide: PlayerInfo['playerSide'];
  evaluation: ArcadeRecordPost['evaluation'];
  stage: ArcadeRecordPost['stage'];
  comment: ArcadeRecordPost['comment'];
  tagIds: string;
  note?: ArcadeRecordPost['note'];
  youTubeId?: ArcadeRecordPost['youTubeId'];
  thumbnailUrl: ArcadeRecordPost['thumbnailUrl'];
  imageUrls: string;
  achievedAt: string;
  createdAt: string;
  modifiedAt: string;
}
