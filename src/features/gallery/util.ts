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
