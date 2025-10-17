'use client';

import { GalleryThemeDBColumn } from '^/src/entities/types/gallery-theme';
import { selectDataClientSide } from '^/src/shared/supabase/database-client';

import { convertGalleryThemeDBColumnToGalleryTheme } from './util';

export async function getGalleryThemeListClientSide() {
  const result = await selectDataClientSide<GalleryThemeDBColumn[]>({
    select: '*',
    from: 'gallery_theme',
    where: [],
  });

  return result.map(convertGalleryThemeDBColumnToGalleryTheme);
}
