'use client';

import { useState } from 'react';

import ImageZoomController from '^/src/shared/image-zoom-controller';
import Overlay from '^/src/shared/overlay';

interface Props {
  originalImageUrls: string[];
}

export default function ArcadeRecordThumbnailInteractivity({
  originalImageUrls,
}: Props) {
  const [currentShowIndex, setCurrentShowIndex] = useState<number>(0);

  return (
    <Overlay
      surfaceClassName="absolute left-0 top-0 w-full h-full"
      overlayContent={
        <>
          <ImageZoomController
            imageUrl={originalImageUrls[currentShowIndex]}
            alt="Test"
          />
          <div className="absolute left-0 top-0 w-full h-full flex flex-row justify-between items-center">
            <button
              type="button"
              onClick={() => {
                setCurrentShowIndex(
                  (currentShowIndex + originalImageUrls.length - 1) %
                    originalImageUrls.length
                );
              }}
            >
              {/**
               * @todo
               * Get & apply prev button appearance
               */}
              PREV
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentShowIndex(
                  (currentShowIndex + 1) % originalImageUrls.length
                );
              }}
            >
              {/**
               * @todo
               * Get & apply next button appearance
               */}
              NEXT
            </button>
          </div>
        </>
      }
    >
      {null}
    </Overlay>
  );
}
