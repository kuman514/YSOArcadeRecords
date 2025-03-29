import {
  HavingIntroduction,
  HavingMainReview,
  HavingOpinion,
  Scorable,
} from './review-compositions';

export interface Review
  extends HavingIntroduction,
    HavingMainReview,
    HavingOpinion,
    Scorable {
  reviewId: string;
}
