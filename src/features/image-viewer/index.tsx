'use client';

import Image from 'next/image';
import { useState } from 'react';

import ArrowSquareLeftSvgRepoComSvg from '^/public/icons/arrow-square-left-svgrepo-com.svg';
import ArrowSquareRightSvgRepoComSvg from '^/public/icons/arrow-square-right-svgrepo-com.svg';
import ImageZoomController from '^/src/shared/image-zoom-controller';
import { useModalStore } from '^/src/shared/modal/store';
import { ModalType } from '^/src/shared/modal/types';

export default function ImageViewer() {
  const [currentShowIndex, setCurrentShowIndex] = useState<number>(0);
  const imageUrls = useModalStore((state) => {
    if (state.type !== ModalType.IMAGE_VIEWER) {
      throw new Error('Image modal should be shown when modal type is IMAGE.');
    }
    return state.imageUrls;
  });

  const renderPageController =
    imageUrls.length > 1 ? (
      <div className="absolute left-0 top-0 w-full h-full flex flex-row justify-between items-center pointer-events-none">
        <button
          type="button"
          className="w-20 h-20 pointer-events-auto text-white drop-shadow-lg cursor-pointer"
          onClick={() => {
            setCurrentShowIndex(
              (currentShowIndex + imageUrls.length - 1) % imageUrls.length
            );
          }}
        >
          <Image
            src={ArrowSquareLeftSvgRepoComSvg}
            className="w-full h-full fill-white"
            alt="이전 이미지"
            unoptimized
          />
        </button>
        <button
          type="button"
          className="w-20 h-20 pointer-events-auto text-white drop-shadow-lg cursor-pointer"
          onClick={() => {
            setCurrentShowIndex((currentShowIndex + 1) % imageUrls.length);
          }}
        >
          <Image
            src={ArrowSquareRightSvgRepoComSvg}
            className="w-full h-full fill-white"
            alt="다음 이미지"
            unoptimized
          />
        </button>
      </div>
    ) : null;

  const renderCurrentPage = (
    <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-end items-center pointer-events-none pb-6">
      <div className="text-white px-4 py-2 bg-[rgba(32,32,32,0.6)] rounded-lg">
        {currentShowIndex + 1} / {imageUrls.length}
      </div>
    </div>
  );

  return (
    <>
      <ImageZoomController
        imageUrl={imageUrls[currentShowIndex]}
        alt="아케이드 기록 관련 사진"
      />
      {renderPageController}
      {renderCurrentPage}
    </>
  );
}
