'use client';

import { useEffect, useState } from 'react';

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
    <div className={`${isShow ? '' : 'hidden'} fixed top-0 left-0`}>
      Alternative Header Placeholder
    </div>
  );
}
