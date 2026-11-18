'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { useModalStore } from '^/src/shared/modal/store';
import { ModalType } from '^/src/shared/modal/types';

import { DEFAULT_BRUSH_SIZE, MAX_SCALE, MIN_SCALE } from './constants';
import ImageEditorPalette from './palette';
import { EditorMode, EditorStroke, Point, Rgb, Size } from './types';
import { getTouchCenter, getTouchDistance, toColorCss } from './utils';

export default function ImageEditor() {
  const imageUrl = useModalStore((state) =>
    state.type === ModalType.IMAGE_EDITOR ? state.imageUrl : ''
  );
  const onSave = useModalStore((state) =>
    state.type === ModalType.IMAGE_EDITOR ? state.onSave : null
  );
  const setModal = useModalStore((state) => state.setModal);

  const [mode, setMode] = useState<EditorMode>(EditorMode.DRAW);
  const [color, setColor] = useState<Rgb>({ r: 0, g: 0, b: 0 });
  const [brushSize, setBrushSize] = useState<number>(DEFAULT_BRUSH_SIZE);
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [isUndoable, setIsUndoable] = useState<boolean>(false);

  const [imageSize, setImageSize] = useState<Size>({ w: 0, h: 0 });
  const [containerSize, setContainerSize] = useState<Size>({ w: 0, h: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const baseCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const strokesRef = useRef<EditorStroke[]>([]);
  const currentStrokeRef = useRef<EditorStroke | null>(null);
  const lastPointRef = useRef<Point | null>(null);
  const isPointerDownRef = useRef<boolean>(false);
  const lastTouchDistRef = useRef<number>(-1);
  const lastTouchCenterRef = useRef<Point | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const base = baseCanvasRef.current;
      const overlay = overlayCanvasRef.current;
      const ctx = base?.getContext('2d');
      if (!base || !overlay || !ctx) {
        return;
      }

      base.width = img.naturalWidth;
      base.height = img.naturalHeight;
      overlay.width = img.naturalWidth;
      overlay.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);
      setImageSize({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => {
      toast('이미지를 불러오지 못했습니다.', { type: 'error' });
    };
    img.src = imageUrl;
  }, [imageUrl]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateContainerSize = () => {
      setContainerSize({ w: container.clientWidth, h: container.clientHeight });
    };

    updateContainerSize();
    const observer = new ResizeObserver(updateContainerSize);
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const displaySize: Size = (() => {
    if (!imageSize.w || !imageSize.h || !containerSize.w || !containerSize.h) {
      return { w: 0, h: 0 };
    }
    const ratio = Math.min(
      containerSize.w / imageSize.w,
      containerSize.h / imageSize.h
    );
    return { w: imageSize.w * ratio, h: imageSize.h * ratio };
  })();

  function getCanvasPoint(clientX: number, clientY: number): Point | null {
    const overlay = overlayCanvasRef.current;
    if (!overlay) {
      return null;
    }
    const rect = overlay.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return null;
    }
    return {
      x: ((clientX - rect.left) / rect.width) * overlay.width,
      y: ((clientY - rect.top) / rect.height) * overlay.height,
    };
  }

  function applyStrokeStyle(
    ctx: CanvasRenderingContext2D,
    stroke: EditorStroke
  ) {
    ctx.globalCompositeOperation =
      stroke.mode === EditorMode.ERASE ? 'destination-out' : 'source-over';
    ctx.strokeStyle = stroke.color;
    ctx.fillStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  function drawDot(stroke: EditorStroke, point: Point) {
    const ctx = overlayCanvasRef.current?.getContext('2d');
    if (!ctx) {
      return;
    }
    applyStrokeStyle(ctx, stroke);
    ctx.beginPath();
    ctx.arc(point.x, point.y, stroke.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawSegment(stroke: EditorStroke, from: Point, to: Point) {
    const ctx = overlayCanvasRef.current?.getContext('2d');
    if (!ctx) {
      return;
    }
    applyStrokeStyle(ctx, stroke);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  function redrawOverlay() {
    const overlay = overlayCanvasRef.current;
    const ctx = overlay?.getContext('2d');
    if (!overlay || !ctx) {
      return;
    }
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    strokesRef.current.forEach((stroke) => {
      if (stroke.points.length === 1) {
        drawDot(stroke, stroke.points[0]);
        return;
      }
      for (let index = 1; index < stroke.points.length; index += 1) {
        drawSegment(stroke, stroke.points[index - 1], stroke.points[index]);
      }
    });
  }

  function startStroke(clientX: number, clientY: number) {
    const point = getCanvasPoint(clientX, clientY);
    if (!point) {
      return;
    }
    const stroke: EditorStroke = {
      mode,
      color: toColorCss(color),
      size: brushSize,
      points: [point],
    };
    currentStrokeRef.current = stroke;
    lastPointRef.current = point;
    isPointerDownRef.current = true;
    drawDot(stroke, point);
  }

  function continueStroke(clientX: number, clientY: number) {
    const stroke = currentStrokeRef.current;
    const lastPoint = lastPointRef.current;
    if (!isPointerDownRef.current || !stroke || !lastPoint) {
      return;
    }
    const point = getCanvasPoint(clientX, clientY);
    if (!point) {
      return;
    }
    drawSegment(stroke, lastPoint, point);
    stroke.points.push(point);
    lastPointRef.current = point;
  }

  function endStroke() {
    const stroke = currentStrokeRef.current;
    isPointerDownRef.current = false;
    lastPointRef.current = null;
    currentStrokeRef.current = null;
    if (!stroke) {
      return;
    }
    strokesRef.current.push(stroke);
    setIsUndoable(true);
  }

  function handleUndo() {
    if (strokesRef.current.length === 0) {
      return;
    }
    strokesRef.current.pop();
    redrawOverlay();
    setIsUndoable(strokesRef.current.length > 0);
  }

  function applyZoom(delta: number) {
    setScale((prev) => Math.min(Math.max(MIN_SCALE, prev + delta), MAX_SCALE));
  }

  function applyPan(deltaX: number, deltaY: number) {
    setPosition((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
  }

  function handleSave() {
    const base = baseCanvasRef.current;
    const overlay = overlayCanvasRef.current;
    if (!base || !overlay) {
      return;
    }

    const merged = document.createElement('canvas');
    merged.width = base.width;
    merged.height = base.height;
    const ctx = merged.getContext('2d');
    if (!ctx) {
      toast('이미지 저장을 위한 캔버스 생성에 실패했습니다.', {
        type: 'error',
      });
      return;
    }

    ctx.drawImage(base, 0, 0);
    ctx.drawImage(overlay, 0, 0);

    try {
      merged.toBlob((blob) => {
        if (!blob) {
          toast('편집한 이미지 생성에 실패했습니다.', { type: 'error' });
          return;
        }
        onSave?.(new File([blob], '', { type: 'image/jpeg' }));
        setModal({ type: ModalType.OFF });
      }, 'image/jpeg');
    } catch {
      toast('편집한 이미지를 저장할 수 없습니다. (외부 이미지 보안 정책)', {
        type: 'error',
      });
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-[rgba(0,0,0,0.85)]">
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden flex justify-center items-center touch-none select-none"
        onMouseDown={(event) => {
          /**
           * @desc
           * 마우스 휠 클릭(가운데 버튼)으로는 캔버스를 이동시키며,
           * 기본 자동 스크롤 동작을 막는다.
           */
          if (event.button === 1) {
            event.preventDefault();
            return;
          }
          startStroke(event.clientX, event.clientY);
        }}
        onMouseMove={(event) => {
          if ((event.buttons & 4) === 4) {
            applyPan(event.movementX, event.movementY);
            return;
          }
          if (event.buttons !== 1) {
            return;
          }
          continueStroke(event.clientX, event.clientY);
        }}
        onMouseUp={endStroke}
        onMouseLeave={endStroke}
        onWheel={(event) => {
          applyZoom(-event.deltaY * 0.001);
        }}
        onTouchStart={(event) => {
          if (event.touches.length >= 2) {
            isPointerDownRef.current = false;
            currentStrokeRef.current = null;
            lastPointRef.current = null;
            lastTouchDistRef.current = getTouchDistance(event.touches);
            lastTouchCenterRef.current = getTouchCenter(event.touches);
            return;
          }
          startStroke(event.touches[0].clientX, event.touches[0].clientY);
        }}
        onTouchMove={(event) => {
          if (event.touches.length >= 2) {
            const dist = getTouchDistance(event.touches);
            const center = getTouchCenter(event.touches);
            if (lastTouchDistRef.current > 0) {
              applyZoom((dist - lastTouchDistRef.current) / 100);
            }
            if (lastTouchCenterRef.current) {
              applyPan(
                center.x - lastTouchCenterRef.current.x,
                center.y - lastTouchCenterRef.current.y
              );
            }
            lastTouchDistRef.current = dist;
            lastTouchCenterRef.current = center;
            return;
          }
          continueStroke(event.touches[0].clientX, event.touches[0].clientY);
        }}
        onTouchEnd={(event) => {
          if (event.touches.length === 0) {
            endStroke();
          }
          lastTouchDistRef.current = -1;
          lastTouchCenterRef.current = null;
        }}
      >
        <div
          className="relative"
          style={{
            width: `${displaySize.w}px`,
            height: `${displaySize.h}px`,
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <canvas
            ref={baseCanvasRef}
            className="absolute left-0 top-0 w-full h-full"
          />
          <canvas
            ref={overlayCanvasRef}
            className="absolute left-0 top-0 w-full h-full cursor-crosshair"
          />
        </div>
      </div>

      <ImageEditorPalette
        mode={mode}
        color={color}
        brushSize={brushSize}
        isUndoable={isUndoable}
        onChangeMode={setMode}
        onChangeColor={setColor}
        onChangeBrushSize={setBrushSize}
        onUndo={handleUndo}
        onSave={handleSave}
      />
    </div>
  );
}
