import {
  HavingDetails,
  HavingIntroduction,
  Scorable,
} from './review-compositions';

export interface Review extends HavingIntroduction, HavingDetails, Scorable {
  reviewId: string;
}
