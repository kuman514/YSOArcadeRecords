'use client';

import Link from 'next/link';
import { useState } from 'react';

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
      className="cursor-pointer"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {isOpen ? '^' : 'v'}
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
