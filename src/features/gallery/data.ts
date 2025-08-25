import { GalleryThemeDBColumn } from '^/src/entities/types/gallery-theme';
import { GalleryPostDBColumn } from '^/src/entities/types/post';
import { selectData } from '^/src/shared/supabase/database';
import { SelectRange } from '^/src/shared/supabase/types';

import {
  convertGalleryDBColumnToGalleryPost,
  convertGalleryThemeDBColumnToGalleryTheme,
} from './util';

export async function getGalleryList(range?: SelectRange) {
  const result = await selectData<GalleryPostDBColumn[]>({
    select: '*, gallery_theme (*)',
    from: 'gallery',
    where: [],
    order: [
      {
        column: 'created_at',
        isAscending: false,
      },
    ],
    range,
  });

  return result.map(convertGalleryDBColumnToGalleryPost);
}

export async function getGalleryTheme() {
  const result = await selectData<GalleryThemeDBColumn[]>({
    select: '*',
    from: 'gallery_theme',
    where: [],
  });

  return result.map(convertGalleryThemeDBColumnToGalleryTheme);
}
