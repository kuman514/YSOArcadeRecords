'use client';

import Link from 'next/link';
import { useRef } from 'react';

import PenSvgRepoComSvg from '^/public/icons/pen-svgrepo-com.svg';

import MenuDrawerOpenChecker from './open-checker';

export default function MenuDrawer() {
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <>
      <MenuDrawerOpenChecker />
      <div
        id="menu-drawer-overlay"
        className="fixed left-0 top-0 w-screen h-dvh z-50 touch-none"
        onClick={() => {
          labelRef.current?.click();
        }}
      />
      <div
        id="menu-drawer-content"
        onClick={(event) => {
          if (
            !(event.target instanceof HTMLElement) ||
            (event.target.nodeName !== 'A' &&
              event.target.nodeName !== 'BUTTON')
          ) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          labelRef.current?.click();
        }}
        className="fixed top-[4rem] right-0 w-full max-w-72 bg-primary flex flex-col px-4 py-4 gap-4 z-51 overflow-hidden"
      >
        <Link href="/editor">정보편집</Link>
        <Link href="/create/records">새기록</Link>
        <Link href="/create/reviews">새리뷰</Link>
        <Link href="/create/gallery">새갤러리</Link>
      </div>
      <label
        ref={labelRef}
        htmlFor="menu-drawer-open-checker"
        className="w-16 h-16 flex flex-row justify-center items-center cursor-pointer"
      >
        <PenSvgRepoComSvg width="1.7rem" height="1.7rem" />
      </label>
    </>
  );
}
