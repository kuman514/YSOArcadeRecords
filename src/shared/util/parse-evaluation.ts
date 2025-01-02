import { TIME_REG } from './constants';
import { ParseEvaluationCriterion } from './types';

export function parseEvaluationByScore(evaluation: string) {
  if (Number.isNaN(Number(evaluation))) {
    throw new Error(
      `The evalutaion value ${evaluation} is not fit to score. The score must be a number.`
    );
  }

  let parsedResult = '점';
  for (let i = 0; i < evaluation.length; i++) {
    const targetIndex = evaluation.length - 1 - i;
    parsedResult = `${evaluation[targetIndex]}${parsedResult}`;
    if (i > 0 && i < evaluation.length - 1 && i % 3 === 2) {
      parsedResult = `,${parsedResult}`;
    }
  }
  return parsedResult;
}

export function parseEvaluationByTime(evaluation: string) {
  const matchResult = evaluation.match(TIME_REG);
  if (!matchResult || !TIME_REG.test(evaluation)) {
    throw new Error(
      `The evalutaion value ${evaluation} is not fit to time. The time must have hours (optional), minutes, and seconds (milliseconds optional). (ex: 1:20:33, 3:18.56, or 2:44:23.788)`
    );
  }

  return matchResult[0];
}

export function parseEvaluation(
  evaluation: string,
  criterion: ParseEvaluationCriterion
) {
  switch (criterion) {
    case ParseEvaluationCriterion.SCORE:
      return parseEvaluationByScore(evaluation);
    case ParseEvaluationCriterion.TIME:
      return parseEvaluationByTime(evaluation);
    default:
      throw new Error('Wrong criterion to parse evaluation.');
  }
}
