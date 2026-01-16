'use client';

import { useCallback, useEffect, useState } from 'react';

import ArrowSquareLeftSvgRepoComSvg from '^/public/icons/arrow-square-left-svgrepo-com.svg';
import ArrowSquareRightSvgRepoComSvg from '^/public/icons/arrow-square-right-svgrepo-com.svg';
import ImageZoomController from '^/src/shared/image-zoom-controller';
import { useModalStore } from '^/src/shared/modal/store';
import { ModalType } from '^/src/shared/modal/types';

export default function ImageViewer() {
  const [isShowGadget, setIsShowGadget] = useState<boolean>(true);
  const [imageAreaKey, setImageAreaKey] = useState<number>(
    new Date().getTime()
  );

  const [currentShowIndex, setCurrentShowIndex] = useState<number>(0);
  const imageUrls = useModalStore((state) => {
    if (state.type !== ModalType.IMAGE_VIEWER) {
      throw new Error('Image modal should be shown when modal type is IMAGE.');
    }
    return state.imageUrls;
  });

  const goToPrev = useCallback(() => {
    setCurrentShowIndex(
      (currentShowIndex + imageUrls.length - 1) % imageUrls.length
    );
    setImageAreaKey(new Date().getTime());
  }, [currentShowIndex, imageUrls]);

  const goToNext = useCallback(() => {
    setCurrentShowIndex((currentShowIndex + 1) % imageUrls.length);
    setImageAreaKey(new Date().getTime());
  }, [currentShowIndex, imageUrls]);

  useEffect(() => {
    function handleOnKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    }

    document.addEventListener('keydown', handleOnKeyDown);

    return () => {
      document.removeEventListener('keydown', handleOnKeyDown);
    };
  }, [goToPrev, goToNext]);

  const renderPageController =
    imageUrls.length > 1 ? (
      <div className="absolute left-0 top-0 w-full h-full flex flex-row justify-between items-center pointer-events-none">
        <button
          type="button"
          className="w-20 h-20 pointer-events-auto text-white drop-shadow-lg cursor-pointer"
          onClick={goToPrev}
        >
          <ArrowSquareLeftSvgRepoComSvg width="100%" height="100%" />
        </button>
        <button
          type="button"
          className="w-20 h-20 pointer-events-auto text-white drop-shadow-lg cursor-pointer"
          onClick={goToNext}
        >
          <ArrowSquareRightSvgRepoComSvg width="100%" height="100%" />
        </button>
      </div>
    ) : null;

  const renderCurrentPage = (
    <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-end items-center pointer-events-none pb-6">
      <div className="text-white px-4 py-2 bg-[rgba(32,32,32,0.6)] retro-rounded-2-darkonly">
        {currentShowIndex + 1} / {imageUrls.length}
      </div>
    </div>
  );

  const renderGadgets = isShowGadget ? (
    <>
      {renderPageController}
      {renderCurrentPage}
    </>
  ) : null;

  return (
    <>
      <ImageZoomController
        key={imageAreaKey}
        imageUrl={imageUrls[currentShowIndex]}
        alt="아케이드 기록 관련 사진"
        onClickImageArea={() => {
          setIsShowGadget(!isShowGadget);
        }}
      />
      {renderGadgets}
    </>
  );
}
