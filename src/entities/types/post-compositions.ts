export interface Tag {
  tagId: string;
  label: string;
}

export interface Taggable {
  tags: Tag[];
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

export interface HavingImages {
  imageUrls: string[];
}

// ===========================================

export interface HavingYouTube {
  youTubeId?: string;
}
