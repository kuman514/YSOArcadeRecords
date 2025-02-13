'use client';

import { useEffect } from 'react';

import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';

import ImageViewer from './image-viewer';
import Sidebar from './sidebar';
import { useModalStore } from './store';
import { ModalType } from './types';

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
      case ModalType.SIDEBAR:
        return <Sidebar />;
      default:
        return null;
    }
  })();

  return type !== ModalType.OFF ? (
    <div className="fixed left-0 top-0 w-screen h-dvh bg-[rgba(0,0,0,0.4)] z-50">
      {renderModalContent}
      <button
        className="fixed left-0 top-0 w-12 h-12 p-2 m-2"
        onClick={() => {
          setModal({ type: ModalType.OFF });
        }}
      >
        <CloseSvgRepoComSvg width="100%" height="100%" fill="#ffffff" />
      </button>
    </div>
  ) : null;
}
