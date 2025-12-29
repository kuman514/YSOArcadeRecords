import { GALLERY_PHOTOS_PER_PAGE } from '^/src/entities/constants/pagenation';
import { GalleryPostDBColumn } from '^/src/entities/types/post';
import { selectDataClientSide } from '^/src/shared/supabase/database-client';

import { convertGalleryDBColumnToGalleryPost } from './util';

export async function getExtendedGalleryList(page: number) {
  const result = await selectDataClientSide<GalleryPostDBColumn[]>({
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
    range: {
      from: page * GALLERY_PHOTOS_PER_PAGE,
      to: (page + 1) * GALLERY_PHOTOS_PER_PAGE,
    },
  });

  const content = result.map(convertGalleryDBColumnToGalleryPost);
  const isHaveNextPage = content.length === GALLERY_PHOTOS_PER_PAGE + 1;

  if (isHaveNextPage) {
    content.pop();
  }

  return {
    content,
    nextPage: isHaveNextPage ? page + 1 : null,
  };
}
