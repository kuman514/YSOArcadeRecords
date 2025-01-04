import { TIME_REG } from './constants';
import { EvaluationCriterion } from './types';

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
  if (!matchResult) {
    throw new Error(
      `The evalutaion value ${evaluation} is not fit to time. The time must have hours (optional), minutes, and seconds (milliseconds optional). (ex: 1:20:33, 3:18.56, or 2:44:23.788)`
    );
  }

  return matchResult[0];
}

export function parseEvaluation(evaluation: string) {
  if (!Number.isNaN(Number(evaluation))) {
    return {
      evaluationCriterion: EvaluationCriterion.SCORE,
      value: parseEvaluationByScore(evaluation),
    };
  } else if (TIME_REG.test(evaluation)) {
    return {
      evaluationCriterion: EvaluationCriterion.TIME,
      value: parseEvaluationByTime(evaluation),
    };
  }

  throw new Error(
    `The evalutaion value ${evaluation} is not fit to score or time. If the evaluation was supposed to be a score, it must be a number. If the evaluation was supposed to be time, it must have hours (optional), minutes, and seconds (milliseconds optional). (ex: 1:20:33, 3:18.56, or 2:44:23.788)`
  );
}
