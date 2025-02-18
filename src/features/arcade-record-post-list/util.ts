import { arcadeDictionary } from '^/src/entities/dictionary/arcade';
import { methodDictionary } from '^/src/entities/dictionary/method';
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
  author_id,
  arcade_id,
  method_id,
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
    author: {
      authorId: author_id,
      name: 'kuman514',
      email: 'hadjadj0@gmail.com',
    },
    arcade: {
      arcadeId: arcade_id,
      label: arcadeDictionary[arcade_id] ?? arcade_id,
    },
    method: {
      methodId: method_id,
      label: methodDictionary[method_id] ?? method_id,
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
