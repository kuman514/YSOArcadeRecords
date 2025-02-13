'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import SidebarCaller from '^/src/entities/modal/sidebar/caller';

export default function AlternativeHeader() {
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    function handleOnScroll() {
      if (
        window.scrollY >=
        4 * parseFloat(getComputedStyle(document.documentElement).fontSize)
      ) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    }

    window.addEventListener('scroll', handleOnScroll);

    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <div
      className={`${
        isShow ? '' : 'hidden'
      } fixed top-0 left-0 w-full h-16 flex flex-row items-center px-2 gap-2 bg-primary z-50`}
    >
      <SidebarCaller />
      <Link href="/" className="text-white">
        YSOArcadeRecords
      </Link>
    </div>
  );
}
