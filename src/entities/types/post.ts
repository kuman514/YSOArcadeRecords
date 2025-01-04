import { ArcadeRecord } from './arcade-record';
import {
  Commentable,
  HavingAuthor,
  HavingImages,
  HavingThumbnail,
  HavingYouTube,
  Taggable,
} from './post-compositions';

export interface BasePost extends HavingAuthor, Commentable, Taggable {
  postId: string;
  title: string;
}

export interface ArcadeRecordPost
  extends BasePost,
    ArcadeRecord,
    HavingThumbnail,
    HavingImages,
    HavingYouTube {}
