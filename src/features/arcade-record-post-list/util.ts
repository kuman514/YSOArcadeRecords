import {
  ArcadeRecordPost,
  ArcadeRecordPostDBColumn,
} from '^/src/entities/types/post';
import { Tag } from '^/src/entities/types/post-compositions';

export function convertArcadeRecordPostDBColumnToItems({
  id,
  arcadeRecordId,
  title,
  authorId,
  arcadeId,
  methodId,
  players,
  playerSide,
  evaluation,
  stage,
  comment,
  tagIds,
  note,
  youTubeId,
  thumbnailUrl,
  imageUrls,
  achievedAt,
  createdAt,
  modifiedAt,
}: ArcadeRecordPostDBColumn): ArcadeRecordPost {
  const parsedTagIds: Tag['tagId'][] = JSON.parse(tagIds);
  const parsedImageUrls: ArcadeRecordPost['imageUrls'] = JSON.parse(imageUrls);

  /**
   * @todo
   * Add dictionary for arcades, methods, and tags.
   */
  return {
    postId: id,
    arcadeRecordId,
    title,
    author: {
      authorId,
      name: 'kuman514',
      email: 'hadjadj0@gmail.com',
    },
    arcade: {
      arcadeId,
      label: '',
    },
    method: {
      methodId,
      label: '',
    },
    playerInfo: {
      players,
      playerSide,
    },
    evaluation,
    stage,
    comment,
    tags: parsedTagIds.map((tagId) => ({
      tagId,
      label: '',
    })),
    note,
    youTubeId,
    thumbnailUrl,
    imageUrls: parsedImageUrls,
    achievedAt: new Date(achievedAt),
    createdAt: new Date(createdAt),
    modifiedAt: new Date(modifiedAt),
  };
}
