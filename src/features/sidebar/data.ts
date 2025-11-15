import { selectDataClientSide } from '^/src/shared/supabase/database-client';

import {
  ArcadeRecordTypeCount,
  ArcadeRecordTypeCountDBColumn,
  PostLength,
  PostLengthDBColumn,
} from './types';

export async function getArcadeRecordTypeCount() {
  const result = await selectDataClientSide<ArcadeRecordTypeCountDBColumn[]>({
    select: '*',
    from: 'arcade_record_type_counts',
    where: [],
    order: [
      {
        column: 'length',
        isAscending: false,
      },
      {
        column: 'arcade_title',
        isAscending: true,
      },
    ],
  });

  return result.map(
    (rawResult): ArcadeRecordTypeCount => ({
      arcadeId: rawResult.arcade_id,
      label: rawResult.arcade_title,
      length: rawResult.length,
    })
  );
}

export async function getReviewCount() {
  const result = await selectDataClientSide<PostLengthDBColumn[]>({
    select: '*',
    from: 'review_counts',
    where: [],
    order: [
      {
        column: 'length',
        isAscending: false,
      },
    ],
  });

  return result.map(
    (rawResult): PostLength => ({
      length: rawResult.length,
    })
  );
}

export async function getGalleryCount() {
  const result = await selectDataClientSide<PostLengthDBColumn[]>({
    select: '*',
    from: 'gallery_counts',
    where: [],
    order: [
      {
        column: 'length',
        isAscending: false,
      },
    ],
  });

  return result.map(
    (rawResult): PostLength => ({
      length: rawResult.length,
    })
  );
}
