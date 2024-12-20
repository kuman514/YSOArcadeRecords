'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import StackSvgRepoComSvg from '^/public/icons/stack-svgrepo-com.svg';

import { HEIGHT_AMOUNT } from './constants';

export default function AlternativeHeader() {
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    function handleOnScroll() {
      if (
        window.scrollY >=
        (HEIGHT_AMOUNT / 4) *
          parseFloat(getComputedStyle(document.documentElement).fontSize)
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
      } fixed top-0 left-0 w-full h-16 flex flex-row items-center px-2 gap-2 bg-primary`}
    >
      <button
        className="w-12 h-12 p-2"
        onClick={() => {
          /**
           * @todo
           * Add showing menu sidebar
           */
        }}
      >
        <StackSvgRepoComSvg width="100%" height="100%" fill="#ffffff" />
      </button>
      <Link href="/" className="text-white">
        YSOArcadeRecords
      </Link>
    </div>
  );
}
