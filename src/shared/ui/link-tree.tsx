'use client';

import Link from 'next/link';
import { useState } from 'react';

import DownArrowBackup2SvgRepoComSvg from '^/public/icons/down-arrow-backup-2-svgrepo-com.svg';
import DownArrowBackup3SvgRepoComSvg from '^/public/icons/down-arrow-backup-3-svgrepo-com.svg';

import { LinkTreeNode } from './types';

interface Props {
  node: LinkTreeNode;
}

export default function LinkTree({ node }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const renderSubnode =
    node.children && isOpen ? (
      <ul className="flex flex-col gap-2">
        {node.children.map((subnode, index) => (
          <LinkTree key={`subnode-${index}`} node={subnode} />
        ))}
      </ul>
    ) : null;

  const renderOpenSubnodeButton = node.children ? (
    <button
      className="cursor-pointer fill-white"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {isOpen ? (
        <DownArrowBackup3SvgRepoComSvg width={12} height={12} />
      ) : (
        <DownArrowBackup2SvgRepoComSvg width={12} height={12} />
      )}
    </button>
  ) : null;

  return (
    <li className="w-full max-w-[18rem] pl-4 flex flex-col gap-2">
      <div className="w-full flex flex-row justify-between items-center">
        <Link href={node.href}>{node.label}</Link>
        {renderOpenSubnodeButton}
      </div>
      {renderSubnode}
    </li>
  );
}
