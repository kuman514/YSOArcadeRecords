export enum EditorMode {
  DRAW = 'draw',
  ERASE = 'erase',
}

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface Point {
  x: number;
  y: number;
}

/**
 * @desc
 * 메멘토 패턴의 각 스냅샷에 해당하는 한 획의 정보.
 * 모달 출현부터 소멸까지 그리거나 지웠던 각각의 획을 저장하여 실행 취소에 사용한다.
 */
export interface EditorStroke {
  mode: EditorMode;
  color: string;
  size: number;
  points: Point[];
}
