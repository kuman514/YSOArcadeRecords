'use client';

import LinkTree from '^/src/shared/ui/link-tree';

import { useModalStore } from '../store';
import { ModalType } from '../types';
import { LINK_TREES } from './constants';

export default function Sidebar() {
  const setModal = useModalStore((state) => state.setModal);

  return (
    <div className="w-full h-full bg-primary text-white max-w-[40rem] grid grid-rows-[4rem_1fr_4rem]">
      <div />
      <div
        className="flex flex-col justify-start items-center gap-4 overflow-y-scroll"
        onClick={(event) => {
          if (
            event.target instanceof HTMLAnchorElement &&
            event.target.nodeName === 'A'
          ) {
            setModal({
              type: ModalType.OFF,
            });
          }
        }}
      >
        {LINK_TREES.map((linkTree, index) => (
          <LinkTree key={`link-tree-${index}`} node={linkTree} />
        ))}
      </div>
      <div className="w-full h-full flex justify-center items-center">
        YSO as kuman514
      </div>
    </div>
  );
}
