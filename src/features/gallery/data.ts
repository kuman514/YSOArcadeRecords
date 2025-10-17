import { Gallery } from '^/src/entities/types/gallery';
import { GalleryPostDBColumn } from '^/src/entities/types/post';
import { selectData } from '^/src/shared/supabase/database';
import { ConditionType, SelectRange } from '^/src/shared/supabase/types';

import { convertGalleryDBColumnToGalleryPost } from './util';

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

export async function getGallery(galleryId: Gallery['galleryId']) {
  const result = await selectData<GalleryPostDBColumn[]>({
    select: '*, gallery_theme (*)',
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
