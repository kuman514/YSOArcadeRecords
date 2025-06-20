'use client';

import Image from 'next/image';

import StackSvgRepoComSvg from '^/public/icons/stack-svgrepo-com.svg';
import { useModalStore } from '^/src/shared/modal/store';
import { ModalType } from '^/src/shared/modal/types';

export default function SidebarCaller() {
  const setModal = useModalStore((state) => state.setModal);

  return (
    <button
      type="button"
      className="w-12 h-12 p-2 cursor-pointer"
      onClick={() => {
        setModal({
          type: ModalType.SIDEBAR,
        });
      }}
    >
      <Image
        src={StackSvgRepoComSvg}
        className="w-full h-full fill-white"
        alt="사이드바 열기"
      />
    </button>
  );
}
