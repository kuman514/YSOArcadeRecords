import { ArcadeInfo, ArcadeInfoDBColumn } from './arcade-info';
import { ArcadeRecord } from './arcade-record';
import { Gallery } from './gallery';
import { GalleryTheme, GalleryThemeDBColumn } from './gallery-theme';
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
  evaluation: ArcadeRecordPost['evaluation'];
  score: ArcadeRecordPost['score'];
  elapsed_time: ArcadeRecordPost['elapsedTime'];
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
  details: ReviewPost['details'];
  /**
   * @legacy
   * Left for compatibility with `details`, which is added later.
   */
  key_features: ReviewPost['details'];
  /**
   * @legacy
   * Left for compatibility with `details`, which is added later.
   */
  expectations: ReviewPost['details'];
  /**
   * @legacy
   * Left for compatibility with `details`, which is added later.
   */
  first_impressions: ReviewPost['details'];
  /**
   * @legacy
   * Left for compatibility with `details`, which is added later.
   */
  positives: ReviewPost['details'];
  /**
   * @legacy
   * Left for compatibility with `details`, which is added later.
   */
  negatives: ReviewPost['details'];
  /**
   * @legacy
   * Left for compatibility with `details`, which is added later.
   */
  conclusions: ReviewPost['details'];
  review_score: ReviewPost['reviewScore'];
  youtube_id?: ReviewPost['youTubeId'];
  thumbnail_url: ReviewPost['thumbnailUrl'];
  image_urls: ReviewPost['imageUrls'];
  created_at: string;
  modified_at: string;
}

export type ReviewPostDBColumn = ReviewPostDBInput;

export interface GalleryPost extends BasePost, Gallery {}

export interface GalleryPostDBInput {
  id: GalleryPost['postId'];
  gallery_id: GalleryPost['galleryId'];
  title: GalleryPost['title'];
  thumbnail_url: GalleryPost['thumbnailUrl'];
  /**
   * @legacy
   * Left for compatibility with `image_urls`, which is added later.
   */
  image_url: GalleryPost['imageUrl'];
  image_urls: GalleryPost['imageUrls'];
  gallery_theme_id: GalleryTheme['galleryThemeId'];
  created_at: string;
  modified_at: string;
}

export interface GalleryPostDBColumn extends GalleryPostDBInput {
  gallery_theme: GalleryThemeDBColumn;
}
