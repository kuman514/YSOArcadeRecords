'use client';

import { useEffect } from 'react';

import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';
import LoadingSvg from '^/public/icons/loading.svg';
import ImageViewer from '^/src/features/image-viewer';
import { useModalStore } from '^/src/shared/modal/store';
import { ModalType } from '^/src/shared/modal/types';

export default function Modal() {
  const { type, setModal } = useModalStore();

  useEffect(() => {
    if (type !== ModalType.OFF) {
      document.body.style.overflowY = 'hidden';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [type]);

  const renderModalContent = (() => {
    switch (type) {
      case ModalType.IMAGE_VIEWER:
        return <ImageViewer />;
      case ModalType.LOADING_BLOCK:
        return (
          <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center pointer-events-none animate-spin fill-hovering">
            <LoadingSvg fill="interit" />
          </div>
        );
      default:
        return null;
    }
  })();

  const renderCloseModalButton = (() => {
    switch (type) {
      case ModalType.IMAGE_VIEWER:
        return (
          <button
            className="fixed left-0 top-0 w-12 h-12 p-2 m-2 cursor-pointer"
            onClick={() => {
              setModal({ type: ModalType.OFF });
            }}
          >
            <CloseSvgRepoComSvg width="100%" height="100%" />
          </button>
        );
      default:
        return null;
    }
  })();

  return type !== ModalType.OFF ? (
    <div className="fixed left-0 top-0 w-screen h-dvh bg-[rgba(0,0,0,0.4)] z-50 touch-none">
      {renderModalContent}
      {renderCloseModalButton}
    </div>
  ) : null;
}
