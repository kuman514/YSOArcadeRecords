import { GalleryThemeDBColumn } from '^/src/entities/types/gallery-theme';
import { selectData } from '^/src/shared/supabase/database';

import { convertGalleryThemeDBColumnToGalleryTheme } from './util';

export async function getGalleryThemeList() {
  const result = await selectData<GalleryThemeDBColumn[]>({
    select: '*',
    from: 'gallery_theme',
    where: [],
  });

  return result.map(convertGalleryThemeDBColumnToGalleryTheme);
}
