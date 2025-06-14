'use client';

import { useModalStore } from '^/src/shared/modal/store';
import { ModalType } from '^/src/shared/modal/types';
import LinkTree from '^/src/shared/ui/link-tree';
import { LinkTreeNode } from '^/src/shared/ui/types';

interface Props {
  linkTrees: LinkTreeNode[];
}

export default function SidebarLinkTree({ linkTrees }: Props) {
  const setModal = useModalStore((state) => state.setModal);

  return (
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
      {linkTrees.map((linkTree, index) => (
        <LinkTree key={`link-tree-${index}`} node={linkTree} />
      ))}
    </div>
  );
}
