import Link from 'next/link';

import { LinkTreeNode } from './types';

interface Props {
  node: LinkTreeNode;
}

export default function LinkTree({ node }: Props) {
  const renderSubnode = node.children
    ? node.children.map((subnode, index) => (
        <LinkTree key={`subnode-${index}`} node={subnode} />
      ))
    : null;

  return (
    <div className="w-full max-w-[18rem] pl-4 flex flex-col gap-2">
      <Link href={node.href}>{node.label}</Link>
      {renderSubnode}
    </div>
  );
}
