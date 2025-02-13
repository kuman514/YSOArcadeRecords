import { ArcadeRecord } from './arcade-record';
import { ArcadeInfo, Method, PlayerInfo } from './arcade-record-compositions';
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
  arcade_record_id: ArcadeRecordPost['arcadeRecordId'];
  title: ArcadeRecordPost['title'];
  author_id: Author['authorId'];
  arcade_id: ArcadeInfo['arcadeId'];
  method_id: Method['methodId'];
  players: PlayerInfo['players'];
  player_side: PlayerInfo['playerSide'];
  evaluation: ArcadeRecordPost['evaluation'];
  stage: ArcadeRecordPost['stage'];
  rank?: ArcadeRecordPost['rank'];
  comment: ArcadeRecordPost['comment'];
  tag_ids: string;
  note?: ArcadeRecordPost['note'];
  youtube_id?: ArcadeRecordPost['youTubeId'];
  thumbnail_url: ArcadeRecordPost['thumbnailUrl'];
  image_urls: string;
  achieved_at: string;
  created_at: string;
  modified_at: string;
}
