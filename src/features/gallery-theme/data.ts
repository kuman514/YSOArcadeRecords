import {
  GalleryTheme,
  GalleryThemeDBColumn,
} from '^/src/entities/types/gallery-theme';
import {
  deleteData,
  insertData,
  selectData,
} from '^/src/shared/supabase/database';

import { ConditionType } from '^/src/shared/supabase/types';
import { convertGalleryThemeDBColumnToGalleryTheme } from './util';

export async function getGalleryThemeList() {
  const result = await selectData<GalleryThemeDBColumn[]>({
    select: '*',
    from: 'gallery_theme',
    where: [],
  });

  return result.map(convertGalleryThemeDBColumnToGalleryTheme);
}

export async function createGalleryTheme(newGalleryTheme: GalleryTheme) {
  await insertData<GalleryThemeDBColumn>({
    insertInto: 'gallery_theme',
    value: {
      gallery_theme_id: newGalleryTheme.galleryThemeId,
      gallery_theme_title: newGalleryTheme.galleryThemeTitle,
    },
  });
}

export async function deleteGalleryTheme(
  galleryThemeId: GalleryTheme['galleryThemeId']
) {
  await deleteData({
    deleteFrom: 'gallery_theme',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'gallery_theme_id',
        value: galleryThemeId,
      },
    ],
  });
}
