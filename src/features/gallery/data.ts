import { Gallery } from '^/src/entities/types/gallery';
import { GalleryPostDBColumn } from '^/src/entities/types/post';
import { selectData } from '^/src/shared/supabase/database';
import { ConditionType, SelectRange } from '^/src/shared/supabase/types';

import { convertGalleryDBColumnToGalleryPost } from './util';

export async function getGalleryList(range?: SelectRange) {
  const result = await selectData<GalleryPostDBColumn[]>({
    select:
      'id, gallery_id, title, thumbnail_url, image_url, gallery_theme_id, image_urls, created_at, modified_at, gallery_theme (*)',
    from: 'gallery',
    where: [],
    order: [
      {
        column: 'id',
        isAscending: false,
      },
    ],
    range,
  });

  return result.map(convertGalleryDBColumnToGalleryPost);
}

export async function getGallery(galleryId: Gallery['galleryId']) {
  const result = await selectData<GalleryPostDBColumn[]>({
    select:
      'id, gallery_id, title, thumbnail_url, image_url, gallery_theme_id, image_urls, created_at, modified_at, gallery_theme (*)',
    from: 'gallery',
    where: [
      {
        type: ConditionType.EQUAL,
        column: 'gallery_id',
        value: galleryId,
      },
    ],
  });

  return result.map(convertGalleryDBColumnToGalleryPost)[0];
}
