'use client';

import { useEffect, useState } from 'react';

import { LinkTreeNode } from '^/src/shared/ui/types';

import { getArcadeRecordTypeCount } from './data';
import SidebarLinkTree from './link-tree';

export default function Sidebar() {
  const [arcadeRecordTypeCount, setArcadeRecordTypeCount] = useState<
    LinkTreeNode[]
  >([]);

  useEffect(() => {
    (async () => {
      const data = await getArcadeRecordTypeCount();
      setArcadeRecordTypeCount(
        data.map((item) => ({
          href: `/records/${item.arcadeId}`,
          label: `${item.arcadeId} (${item.length})`,
        }))
      );
    })();
  }, []);

  const arcadeRecordTypeLinkTree: LinkTreeNode[] = [
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
    <div className="w-full h-full bg-primary text-white max-w-[40rem] grid grid-rows-[4rem_1fr_4rem]">
      <div />
      <SidebarLinkTree linkTrees={arcadeRecordTypeLinkTree} />
      <div className="w-full h-full flex justify-center items-center">
        YSO as kuman514
      </div>
    </div>
  );
}
