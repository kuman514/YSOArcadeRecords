'use client';

import Button from '^/src/shared/ui/button';

import {
  MAX_BRUSH_SIZE,
  MIN_BRUSH_SIZE,
  REPRESENTATIVE_COLORS,
} from './constants';
import { EditorMode, Rgb } from './types';

interface Props {
  mode: EditorMode;
  color: Rgb;
  brushSize: number;
  isUndoable: boolean;
  onChangeMode: (newMode: EditorMode) => void;
  onChangeColor: (newColor: Rgb) => void;
  onChangeBrushSize: (newBrushSize: number) => void;
  onUndo: () => void;
  onSave: () => void;
}

const COLOR_CHANNELS: { key: keyof Rgb; label: string }[] = [
  { key: 'r', label: 'R' },
  { key: 'g', label: 'G' },
  { key: 'b', label: 'B' },
];

function isSameColor(left: Rgb, right: Rgb) {
  return left.r === right.r && left.g === right.g && left.b === right.b;
}

export default function ImageEditorPalette({
  mode,
  color,
  brushSize,
  isUndoable,
  onChangeMode,
  onChangeColor,
  onChangeBrushSize,
  onUndo,
  onSave,
}: Props) {
  const currentColorCss = `rgb(${color.r}, ${color.g}, ${color.b})`;

  return (
    <div className="w-full bg-(--background) text-(--foreground) p-4 flex flex-col gap-6 justify-between items-stretch max-h-[45%] overflow-y-auto">
      <div className="w-full flex flex-col sm:flex-row gap-6 justify-center items-stretch">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold">도구</span>
          <div className="flex flex-row gap-2">
            <Button
              type="button"
              disabled={!isUndoable}
              onClick={onUndo}
              style={{
                width: 'unset',
              }}
            >
              실행 취소
            </Button>
            <Button
              type="button"
              onClick={() => {
                onChangeMode(EditorMode.DRAW);
              }}
              style={{
                width: 'unset',
                backgroundColor:
                  mode === EditorMode.DRAW ? 'var(--hovering-color)' : '',
              }}
            >
              그리기
            </Button>
            <Button
              type="button"
              onClick={() => {
                onChangeMode(EditorMode.ERASE);
              }}
              style={{
                width: 'unset',
                backgroundColor:
                  mode === EditorMode.ERASE ? 'var(--hovering-color)' : '',
              }}
            >
              지우기
            </Button>
          </div>
          <label className="flex flex-col gap-1 text-sm">
            <span>굵기: {brushSize}px</span>
            <input
              type="range"
              min={MIN_BRUSH_SIZE}
              max={MAX_BRUSH_SIZE}
              value={brushSize}
              onChange={(event) => {
                onChangeBrushSize(Number(event.currentTarget.value));
              }}
            />
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3 justify-between">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold">색상</span>
              <div className="flex flex-row flex-wrap gap-2">
                {REPRESENTATIVE_COLORS.map(({ label, value }) => (
                  <button
                    key={label}
                    type="button"
                    title={label}
                    aria-label={label}
                    className={`w-8 h-8 rounded-sm border cursor-pointer ${
                      isSameColor(color, value)
                        ? 'ring-2 ring-offset-2 ring-(--foreground)'
                        : ''
                    }`}
                    style={{
                      backgroundColor: `rgb(${value.r}, ${value.g}, ${value.b})`,
                    }}
                    onClick={() => {
                      onChangeColor(value);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <span className="text-sm font-bold">현재</span>
              <div
                className="w-8 h-8 rounded-sm border"
                style={{ backgroundColor: currentColorCss }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {COLOR_CHANNELS.map(({ key, label }) => (
              <label
                key={key}
                className="flex flex-row items-center gap-2 text-sm"
              >
                <span className="w-4">{label}</span>
                <input
                  className="flex-1 min-w-32"
                  type="range"
                  min={0}
                  max={255}
                  value={color[key]}
                  onChange={(event) => {
                    onChangeColor({
                      ...color,
                      [key]: Number(event.currentTarget.value),
                    });
                  }}
                />
                <span className="w-8 text-right tabular-nums">
                  {color[key]}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 justify-center items-center">
        <Button type="button" onClick={onSave}>
          저장
        </Button>
      </div>
    </div>
  );
}
