import { HavingGalleryTheme } from './gallery-theme';
import {
  HavingImages,
  HavingSingleImage,
  HavingThumbnail,
} from './post-compositions';

export interface Gallery
  extends HavingGalleryTheme,
    HavingThumbnail,
    HavingSingleImage,
    HavingImages {
  galleryId: string;
}
