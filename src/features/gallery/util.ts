import {
  GalleryTheme,
  GalleryThemeDBColumn,
} from '^/src/entities/types/gallery-theme';
import { GalleryPost, GalleryPostDBColumn } from '^/src/entities/types/post';

export function convertGalleryDBColumnToGalleryPost({
  id,
  gallery_id,
  title,
  thumbnail_url,
  image_url,
  created_at,
  modified_at,
  gallery_theme,
}: GalleryPostDBColumn): GalleryPost {
  return {
    postId: id,
    galleryId: gallery_id,
    title,
    theme: {
      galleryThemeId: gallery_theme.gallery_theme_id,
      galleryThemeTitle: gallery_theme.gallery_theme_title,
    },
    thumbnailUrl: thumbnail_url,
    imageUrl: image_url,
    createdAt: new Date(created_at),
    modifiedAt: new Date(modified_at),
  };
}

export function convertGalleryThemeDBColumnToGalleryTheme({
  gallery_theme_id,
  gallery_theme_title,
}: GalleryThemeDBColumn): GalleryTheme {
  return {
    galleryThemeId: gallery_theme_id,
    galleryThemeTitle: gallery_theme_title,
  };
}
