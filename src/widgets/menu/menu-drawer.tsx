'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MenuDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const renderMenu = isDrawerOpen ? (
    <div
      onClick={() => {
        setIsDrawerOpen(false);
      }}
      className="fixed left-0 top-0 w-screen h-dvh z-50 touch-none"
    >
      <div
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
        }}
        className="absolute top-[4rem] right-0 w-full max-w-72 bg-primary flex flex-col px-4 pb-4 gap-4"
      >
        <Link href="/editor">정보편집</Link>
        <Link href="/create/records">새기록</Link>
        <Link href="/create/reviews">새리뷰</Link>
        <Link href="/create/gallery">새갤러리</Link>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsDrawerOpen(true);
        }}
        className="cursor-pointer"
      >
        관리자 메뉴
      </button>
      {renderMenu}
    </>
  );
}
