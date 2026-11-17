import { TouchList } from 'react';

import { Point, Rgb } from './types';

export function toColorCss(color: Rgb) {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export function getTouchDistance(touches: TouchList): number {
  const horizontal = touches[0].pageX - touches[1].pageX;
  const vertical = touches[0].pageY - touches[1].pageY;
  return Math.sqrt(horizontal * horizontal + vertical * vertical);
}

export function getTouchCenter(touches: TouchList): Point {
  return {
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  };
}
