import { HavingSingleImage, HavingThumbnail } from './post-compositions';
import { HavingGalleryTheme } from './gallery-theme';

export interface Gallery
  extends HavingGalleryTheme,
    HavingThumbnail,
    HavingSingleImage {
  galleryId: string;
}
