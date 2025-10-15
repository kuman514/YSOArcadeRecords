import {
  GalleryTheme,
  GalleryThemeDBColumn,
} from '^/src/entities/types/gallery-theme';

export function convertGalleryThemeDBColumnToGalleryTheme({
  gallery_theme_id,
  gallery_theme_title,
}: GalleryThemeDBColumn): GalleryTheme {
  return {
    galleryThemeId: gallery_theme_id,
    galleryThemeTitle: gallery_theme_title,
  };
}
