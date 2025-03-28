export interface HavingIntroduction {
  /**
   * Introduction of the object.
   */
  subjectName: string;
  subjectType: string;
  createdBy: string;
  releaseDate: Date;
  keyFeatures: string[];
}

// ===========================================

export interface HavingMainReview {
  /**
   * Pros and cons of the object.
   */
  positives: string[];
  negatives: string[];
}

// ===========================================

export interface HavingOpinion {
  /**
   * Individual opinions about object.
   */
  firstImpressions: string[];
  expectations: string[];
  conclusions: string[];
}

// ===========================================

export interface Scorable {
  reviewScore: number;
}
