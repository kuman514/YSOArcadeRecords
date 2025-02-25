import { tagDictionary } from '^/src/entities/dictionary/tag';
import {
  ArcadeRecordPost,
  ArcadeRecordPostDBColumn,
} from '^/src/entities/types/post';
import { Tag } from '^/src/entities/types/post-compositions';

export function convertArcadeRecordPostDBColumnToItems({
  id,
  arcade_record_id,
  title,
  arcade_info,
  methods,
  players,
  player_side,
  evaluation,
  stage,
  rank,
  comment,
  tag_ids,
  note,
  youtube_id,
  thumbnail_url,
  image_urls,
  achieved_at,
  created_at,
  modified_at,
}: ArcadeRecordPostDBColumn): ArcadeRecordPost {
  const parsedTagIds: Tag['tagId'][] = JSON.parse(tag_ids ?? '[]');
  const parsedImageUrls: ArcadeRecordPost['imageUrls'] = JSON.parse(image_urls);

  return {
    postId: id,
    arcadeRecordId: arcade_record_id,
    title,
    arcade: {
      arcadeId: arcade_info.arcade_id,
      label: arcade_info.arcade_title,
    },
    method: {
      methodId: methods.method_id,
      label: methods.method_name,
    },
    playerInfo: {
      players,
      playerSide: player_side,
    },
    evaluation,
    stage,
    rank,
    comment,
    tags: parsedTagIds.map((tagId) => ({
      tagId,
      label: tagDictionary[tagId] ?? tagId,
    })),
    note,
    youTubeId: youtube_id,
    thumbnailUrl: thumbnail_url,
    imageUrls: parsedImageUrls,
    achievedAt: new Date(achieved_at),
    createdAt: new Date(created_at),
    modifiedAt: new Date(modified_at),
  };
}
