export interface GalleryTheme {
  galleryThemeId: string;
  galleryThemeTitle: string;
}

export interface HavingGalleryTheme {
  theme: GalleryTheme;
}

export interface GalleryThemeDBColumn {
  gallery_theme_id: GalleryTheme['galleryThemeId'];
  gallery_theme_title: GalleryTheme['galleryThemeTitle'];
}
