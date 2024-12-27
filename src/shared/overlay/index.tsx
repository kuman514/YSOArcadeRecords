'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';

interface Props {
  children: ReactNode;
  overlayContent: ReactNode;
}

export default function Overlay({ children, overlayContent }: Props) {
  const [isShowOverlay, setIsShowOverlay] = useState<boolean>(false);

  useEffect(() => {
    if (isShowOverlay) {
      document.body.style.overflowY = 'hidden';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isShowOverlay]);

  return (
    <>
      <button
        onClick={() => {
          setIsShowOverlay(true);
        }}
      >
        {children}
      </button>
      {isShowOverlay
        ? createPortal(
            <div className="fixed left-0 top-0 w-screen h-dvh bg-[rgba(0,0,0,0.4)] z-50">
              {overlayContent}
              <button
                className="fixed left-0 top-0 w-12 h-12 p-2 m-2"
                onClick={() => {
                  setIsShowOverlay(false);
                }}
              >
                <CloseSvgRepoComSvg width="100%" height="100%" fill="#ffffff" />
              </button>
            </div>,
            document.querySelector('main') ?? document.body
          )
        : null}
    </>
  );
}
