'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  imageUrl: string;
  alt: string;
}

export default function ImageZoomController({ imageUrl, alt }: Props) {
  const [recentTouchDist, setRecentTouchDist] = useState<number>(-1);
  const [position, setPosition] = useState<number[]>([0, 0]);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    setRecentTouchDist(-1);
    setPosition([0, 0]);
    setScale(1);
  }, [imageUrl]);

  function moveImage(dx: number, dy: number) {
    setPosition([
      position[0] + dx * (1 / scale),
      position[1] + dy * (1 / scale),
    ]);
  }

  return (
    <div
      className="w-full h-full cursor-grab"
      onClick={(event) => {
        event.stopPropagation();
        event.nativeEvent.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
      }}
      onWheel={(event) => {
        const newScale = scale - event.deltaY * 0.001;
        const finalScale = Math.min(Math.max(0.3, newScale), 10);
        setScale(finalScale);
      }}
      onMouseMove={(event) => {
        if (event.buttons !== 1) {
          return;
        }
        moveImage(event.movementX, event.movementY);
      }}
      onTouchStart={(touchStartEvent) => {
        function handleOnTouchMove(touchMoveEvent: TouchEvent) {
          if (touchMoveEvent.cancelable) {
            touchMoveEvent.preventDefault();
          }

          const deltaX =
            touchMoveEvent.touches[0].pageX - touchStartEvent.touches[0].pageX;
          const deltaY =
            touchMoveEvent.touches[0].pageY - touchStartEvent.touches[0].pageY;
          moveImage(deltaX, deltaY);
        }

        function handleOnTouchEnd() {
          document.removeEventListener('touchmove', handleOnTouchMove);
        }

        document.addEventListener('touchmove', handleOnTouchMove);
        document.addEventListener('touchend', handleOnTouchEnd, { once: true });
      }}
      onTouchMove={(event) => {
        if (event.touches.length === 2) {
          const firstPageX = event.touches[0].pageX;
          const firstPageY = event.touches[0].pageY;
          const secondPageX = event.touches[1].pageX;
          const secondPageY = event.touches[1].pageY;

          const left = Math.min(firstPageX, secondPageX);
          const right = Math.max(firstPageX, secondPageX);
          const top = Math.min(firstPageY, secondPageY);
          const bottom = Math.max(firstPageY, secondPageY);

          const horizontalDist = right - left;
          const verticalDist = bottom - top;

          const dist = Math.sqrt(
            horizontalDist * horizontalDist + verticalDist * verticalDist
          );

          if (recentTouchDist > 0) {
            const newScale = scale - (recentTouchDist - dist) / 100;
            const finalScale = Math.min(Math.max(0.3, newScale), 10);
            setScale(finalScale);
          }

          setRecentTouchDist(dist);
        } else {
          setRecentTouchDist(-1);
        }
      }}
    >
      <Image
        src={imageUrl}
        className="w-full h-full object-contain drag-none"
        style={{
          transform: `scale(${scale}) translate(${position[0]}px, ${position[1]}px)`,
        }}
        alt={alt}
        fill
        sizes="100vw"
      />
    </div>
  );
}
