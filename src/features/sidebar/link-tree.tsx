'use client';

import { useEffect, useState } from 'react';

import LinkTree from '^/src/shared/ui/link-tree';
import { LinkTreeNode } from '^/src/shared/ui/types';

import { getArcadeRecordTypeCount } from './data';

export default function SidebarLinkTree() {
  const [arcadeRecordTypeCount, setArcadeRecordTypeCount] = useState<
    LinkTreeNode[]
  >([]);

  useEffect(() => {
    (async () => {
      const data = await getArcadeRecordTypeCount();
      setArcadeRecordTypeCount(
        data.map((item) => ({
          href: `/records/${item.arcadeId}`,
          label: `${item.label} (${item.length})`,
        }))
      );
    })();
  }, []);

  const totalLinkTrees: LinkTreeNode[] = [
    {
      href: '/',
      label: 'YSOArcadeRecords',
    },
    {
      href: '/records',
      label: '아케이드 게임 기록',
      children: arcadeRecordTypeCount,
    },
    {
      href: '/reviews',
      label: '아케이드 관련 리뷰',
    },
    {
      href: '/gallery',
      label: '아케이드 관련 갤러리',
    },
  ];

  return (
    <div
      className="flex flex-col justify-start items-center gap-4 overflow-y-auto"
      onClick={(event) => {
        if (
          event.target instanceof HTMLAnchorElement &&
          event.target.nodeName === 'A'
        ) {
          const sidebarOpenChecker = document.querySelector(
            'input#sidebar-open-checker'
          );
          if (
            sidebarOpenChecker instanceof HTMLInputElement &&
            sidebarOpenChecker.checked
          ) {
            sidebarOpenChecker.click();
          }
        }
      }}
    >
      {totalLinkTrees.map((linkTree, index) => (
        <LinkTree key={`link-tree-${index}`} node={linkTree} />
      ))}
    </div>
  );
}
