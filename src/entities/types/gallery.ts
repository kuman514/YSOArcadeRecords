import { HavingGalleryTheme } from './gallery-theme';
import { HavingSingleImage, HavingThumbnail } from './post-compositions';

export interface Gallery
  extends HavingGalleryTheme,
    HavingThumbnail,
    HavingSingleImage {
  galleryId: string;
}
