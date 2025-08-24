export interface Taggable {
  tags: string[];
}

// ===========================================

export interface Commentable {
  comment: string;
}

// ===========================================

export interface HavingThumbnail {
  thumbnailUrl: string;
}

// ===========================================

export interface HavingSingleImage {
  imageUrl: string;
}

export interface HavingImages {
  imageUrls: string[];
}

// ===========================================

export interface HavingYouTube {
  youTubeId?: string;
}
