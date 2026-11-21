import { Rgb } from './types';

export const REPRESENTATIVE_COLORS: { label: string; value: Rgb }[] = [
  { label: '검정', value: { r: 0, g: 0, b: 0 } },
  { label: '하양', value: { r: 255, g: 255, b: 255 } },
  { label: '빨강', value: { r: 255, g: 0, b: 0 } },
  { label: '주황', value: { r: 255, g: 107, b: 0 } },
  { label: '노랑', value: { r: 255, g: 221, b: 0 } },
  { label: '초록', value: { r: 0, g: 160, b: 0 } },
  { label: '파랑', value: { r: 0, g: 112, b: 255 } },
  { label: '보라', value: { r: 150, g: 0, b: 200 } },
];

export const COLOR_CHANNELS: { key: keyof Rgb; label: string }[] = [
  { key: 'r', label: 'R' },
  { key: 'g', label: 'G' },
  { key: 'b', label: 'B' },
];

export const MIN_SCALE = 0.3;
export const MAX_SCALE = 10;

export const MIN_BRUSH_SIZE = 1;
export const MAX_BRUSH_SIZE = 100;
export const DEFAULT_BRUSH_SIZE = 12;
