export interface HavingIntroduction {
  /**
   * Introduction of the object.
   */
  subjectName: string;
  subjectType: string;
  createdBy: string;
  releaseDate: Date;
}

// ===========================================

export interface HavingDetails {
  details: string[];
}

// ===========================================

export interface Scorable {
  reviewScore: number;
}
