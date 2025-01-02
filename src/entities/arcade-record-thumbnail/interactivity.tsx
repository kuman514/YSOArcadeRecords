'use client';

import { useState } from 'react';

import ImageZoomController from '^/src/shared/image-zoom-controller';
import Overlay from '^/src/shared/overlay';
import ArrowSquareLeftSvgRepoComSvg from '^/public/icons/arrow-square-left-svgrepo-com.svg';
import ArrowSquareRightSvgRepoComSvg from '^/public/icons/arrow-square-right-svgrepo-com.svg';

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
          <div className="absolute left-0 top-0 w-full h-full flex flex-row justify-between items-center pointer-events-none">
            <button
              type="button"
              className="w-20 h-20 pointer-events-auto"
              onClick={() => {
                setCurrentShowIndex(
                  (currentShowIndex + originalImageUrls.length - 1) %
                    originalImageUrls.length
                );
              }}
            >
              <ArrowSquareLeftSvgRepoComSvg
                width="100%"
                height="100%"
                stroke="#FFFFFF"
              />
            </button>
            <button
              type="button"
              className="w-20 h-20 pointer-events-auto"
              onClick={() => {
                setCurrentShowIndex(
                  (currentShowIndex + 1) % originalImageUrls.length
                );
              }}
            >
              <ArrowSquareRightSvgRepoComSvg
                width="100%"
                height="100%"
                stroke="#FFFFFF"
              />
            </button>
          </div>
        </>
      }
    >
      {null}
    </Overlay>
  );
}
