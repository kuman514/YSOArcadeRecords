export interface ReviewObject {
  reviewObjectId: string;
  label: string;
}

export interface HavingReviewObject {
  reviewObject: ReviewObject;
}

// ===========================================

export interface HavingPositives {
  /**
   * Positive things of the object.
   */
  positives: string[];
}

// ===========================================

export interface HavingNegatives {
  /**
   * Negative things of the object.
   */
  negatives: string[];
}

// ===========================================

export interface Scorable {
  reviewScore: number;
}
