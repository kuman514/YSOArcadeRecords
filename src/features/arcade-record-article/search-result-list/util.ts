import { SearchResultProps } from '^/src/entities/search/types';
import { ArcadeRecordPost } from '^/src/entities/types/post';
import { parseDateToString } from '^/src/shared/util/parse-date';
import { parseEvaluation } from '^/src/shared/util/parse-evaluation';
import { EvaluationCriterion } from '^/src/shared/util/types';

export function convertArcadeRecordPostToSearchResultProps({
  title,
  achievedAt,
  comment,
  arcadeRecordId,
  thumbnailUrl,
  evaluation,
  score,
  elapsedTime,
}: ArcadeRecordPost): Omit<SearchResultProps, 'emphasize'> {
  const evaluations = [evaluation, score, elapsedTime]
    .filter((evaluationValue) => evaluationValue && evaluationValue.length > 0)
    .map((evaluationValue) => {
      const parsed = parseEvaluation(evaluationValue);
      if (parsed.evaluationCriterion === EvaluationCriterion.SCORE) {
        return `${parsed.value}점`;
      }
      return parsed.value;
    })
    .join(', ');

  return {
    title,
    subheading: `${evaluations} / 달성일자: ${parseDateToString(achievedAt)}`,
    description: comment,
    href: `/records/${arcadeRecordId}`,
    thumbnailUrl,
  };
}
