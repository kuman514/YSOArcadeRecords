import { ArcadeInfo, ArcadeInfoDBColumn } from './arcade-info';
import { ArcadeRecord } from './arcade-record';
import { PlayerInfo } from './arcade-record-compositions';
import { Method, MethodDBColumn } from './method';
import {
  Commentable,
  HavingImages,
  HavingThumbnail,
  HavingYouTube,
  Taggable,
} from './post-compositions';

export interface BasePost extends Commentable, Taggable {
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

export interface ArcadeRecordPostDBInput {
  id: ArcadeRecordPost['postId'];
  arcade_record_id: ArcadeRecordPost['arcadeRecordId'];
  title: ArcadeRecordPost['title'];
  arcade_id: ArcadeInfo['arcadeId'];
  method_id: Method['methodId'];
  players: PlayerInfo['players'];
  player_side: PlayerInfo['playerSide'];
  evaluation: ArcadeRecordPost['evaluation'];
  stage: ArcadeRecordPost['stage'];
  rank?: ArcadeRecordPost['rank'];
  comment: ArcadeRecordPost['comment'];
  tags: string[];
  note?: ArcadeRecordPost['note'];
  youtube_id?: ArcadeRecordPost['youTubeId'];
  thumbnail_url: ArcadeRecordPost['thumbnailUrl'];
  image_urls: ArcadeRecordPost['imageUrls'];
  achieved_at: string;
  created_at: string;
  modified_at: string;
}

export interface ArcadeRecordPostDBColumn extends ArcadeRecordPostDBInput {
  arcade_info: ArcadeInfoDBColumn;
  methods: MethodDBColumn;
}
