export interface Author {
  authorId: number;
  name: string;
  email: string;
}

export interface HavingAuthor {
  author: Author;
}

// ===========================================

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
