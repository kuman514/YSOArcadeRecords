import {
  ArcadeRecordPost,
  ArcadeRecordPostDBColumn,
} from '^/src/entities/types/post';
import { parseEvaluation } from '^/src/shared/util/parse-evaluation';

export function convertArcadeRecordPostDBColumnToArcadeRecordPost({
  id,
  arcade_record_id,
  title,
  arcade_info,
  methods,
  evaluation,
  score,
  elapsed_time,
  stage,
  rank,
  comment,
  tags,
  note,
  youtube_id,
  thumbnail_url,
  image_urls,
  achieved_at,
  created_at,
  modified_at,
}: ArcadeRecordPostDBColumn): ArcadeRecordPost {
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
    evaluation,
    score,
    elapsedTime: elapsed_time,
    stage,
    rank,
    comment,
    tags,
    note,
    youTubeId: youtube_id,
    thumbnailUrl: thumbnail_url,
    imageUrls: image_urls,
    achievedAt: new Date(achieved_at),
    createdAt: new Date(created_at),
    modifiedAt: new Date(modified_at),
  };
}

export function convertArcadeRecordPostToPostListItem({
  title,
  achievedAt,
  tags,
  youTubeId,
  arcade,
  arcadeRecordId,
  thumbnailUrl,
  evaluation,
  stage,
  rank,
  score,
  elapsedTime,
}: ArcadeRecordPost) {
  const evaluations = [evaluation, score, elapsedTime]
    .filter((evaluationValue) => evaluationValue && evaluationValue.length > 0)
    .map((evaluationValue) => parseEvaluation(evaluationValue).value)
    .join(', ');

  return {
    title: title,
    memo: `${arcade.label} - ${stage} / ${evaluations}${
      rank ? ` / ${rank}` : ''
    }`,
    dateToDisplay: achievedAt,
    tags: tags,
    isHaveYouTube: Boolean(youTubeId),
    href: `/records/${arcade.arcadeId}/${arcadeRecordId}`,
    thumbnailUrl: thumbnailUrl,
  };
}
