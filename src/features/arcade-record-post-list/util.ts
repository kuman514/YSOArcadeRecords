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
  arcadeRecordId,
  title,
  authorId,
  arcadeId,
  methodId,
  players,
  playerSide,
  evaluation,
  stage,
  rank,
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
      label: arcadeDictionary[arcadeId] ?? arcadeId,
    },
    method: {
      methodId,
      label: methodDictionary[methodId] ?? methodId,
    },
    playerInfo: {
      players,
      playerSide,
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
    youTubeId,
    thumbnailUrl,
    imageUrls: parsedImageUrls,
    achievedAt: new Date(achievedAt),
    createdAt: new Date(createdAt),
    modifiedAt: new Date(modifiedAt),
  };
}
