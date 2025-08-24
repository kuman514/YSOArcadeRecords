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
import { Review } from './review';

export interface BasePost {
  postId: number;
  title: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface ArcadeRecordPost
  extends BasePost,
    Taggable,
    Commentable,
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

export interface ReviewPost
  extends BasePost,
    Taggable,
    Review,
    HavingThumbnail,
    HavingImages,
    HavingYouTube {}

export interface ReviewPostDBInput {
  id: ReviewPost['postId'];
  review_id: ReviewPost['reviewId'];
  title: ReviewPost['title'];
  tags: ReviewPost['tags'];
  subject_name: ReviewPost['subjectName'];
  subject_type: ReviewPost['subjectType'];
  created_by: ReviewPost['createdBy'];
  release_date: string;
  key_features: ReviewPost['keyFeatures'];
  expectations: ReviewPost['expectations'];
  first_impressions: ReviewPost['firstImpressions'];
  positives: ReviewPost['positives'];
  negatives: ReviewPost['negatives'];
  conclusions: ReviewPost['conclusions'];
  review_score: ReviewPost['reviewScore'];
  youtube_id?: ReviewPost['youTubeId'];
  thumbnail_url: ReviewPost['thumbnailUrl'];
  image_urls: ReviewPost['imageUrls'];
  created_at: string;
  modified_at: string;
}

export type ReviewPostDBColumn = ReviewPostDBInput;
