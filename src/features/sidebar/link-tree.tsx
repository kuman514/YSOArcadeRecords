'use client';

import { useEffect, useState } from 'react';

import LinkTree from '^/src/shared/ui/link-tree';
import { LinkTreeNode } from '^/src/shared/ui/types';

import {
  getArcadeRecordTypeCount,
  getGalleryCount,
  getReviewCount,
} from './data';

export default function SidebarLinkTree() {
  const [arcadeRecordTypeCount, setArcadeRecordTypeCount] =
    useState<LinkTreeNode>({
      href: '/records',
      label: '아케이드 게임 기록',
    });

  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [galleryCount, setGalleryCount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getArcadeRecordTypeCount();
      const total = data.reduce((prev, current) => prev + current.length, 0);
      setArcadeRecordTypeCount({
        ...arcadeRecordTypeCount,
        label: `아케이드 게임 기록 (${total})`,
        children: data.map((item) => ({
          href: `/records/${item.arcadeId}`,
          label: `${item.label} (${item.length})`,
        })),
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setReviewCount(await getReviewCount());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setGalleryCount(await getGalleryCount());
    })();
  }, []);

  const totalLinkTrees: LinkTreeNode[][] = [
    [
      {
        href: '/',
        label: 'YSOArcadeRecords',
      },
      arcadeRecordTypeCount,
    ],
    [
      {
        href: '/reviews',
        label: `아케이드 관련 리뷰${
          reviewCount !== null ? ` (${reviewCount})` : ''
        }`,
      },
      {
        href: '/gallery',
        label: `아케이드 관련 갤러리${
          galleryCount !== null ? ` (${galleryCount})` : ''
        }`,
      },
    ],
  ];

  return (
    <nav
      className="overflow-y-auto flex flex-row flex-wrap justify-center items-start gap-y-4"
      onClick={(event) => {
        if (
          !(event.target instanceof HTMLAnchorElement) ||
          event.target.nodeName !== 'A'
        ) {
          return;
        }

        const sidebarOpenChecker = document.querySelector(
          'input#sidebar-open-checker'
        );

        if (
          !(sidebarOpenChecker instanceof HTMLInputElement) ||
          !sidebarOpenChecker.checked
        ) {
          return;
        }

        sidebarOpenChecker.click();
      }}
    >
      {totalLinkTrees.map((linkTrees, i) => (
        <ul
          key={i}
          className="w-full max-w-[18rem] flex flex-col justify-start items-center gap-4"
        >
          {linkTrees.map((linkTree, j) => (
            <LinkTree key={`link-tree-${j}`} node={linkTree} />
          ))}
        </ul>
      ))}
    </nav>
  );
}
