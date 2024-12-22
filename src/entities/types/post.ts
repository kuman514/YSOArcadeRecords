import { ArcadeRecord } from './arcade-record';
import { Commentable, HavingAuthor, Taggable } from './post-compositions';

export interface BasePost extends HavingAuthor, Commentable, Taggable {
  postId: string;
}

export interface ArcadeRecordPost extends BasePost, ArcadeRecord {}
