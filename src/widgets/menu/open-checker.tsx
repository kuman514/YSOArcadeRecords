'use client';

import { useEffect, useRef } from 'react';

export default function MenuDrawerOpenChecker() {
  const checkerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleOnKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'Escape':
          if (checkerRef.current?.checked) {
            checkerRef.current?.click();
          }
          break;
      }
    }

    document.addEventListener('keydown', handleOnKeyDown);

    return () => {
      document.removeEventListener('keydown', handleOnKeyDown);
    };
  }, []);

  return (
    <input
      ref={checkerRef}
      type="checkbox"
      id="menu-drawer-open-checker"
      className="hidden [&+#menu-drawer-overlay]:hidden checked:[&+#menu-drawer-overlay]:block [&~#menu-drawer-content]:translate-x-[100%] checked:[&~#menu-drawer-content]:translate-x-[0%] [&~#menu-drawer-content]:animate-slide-left-to-right checked:[&~#menu-drawer-content]:animate-slide-right-to-left"
      onChange={(event) => {
        document.body.style.overflowY = event.currentTarget.checked
          ? 'hidden'
          : 'auto';
      }}
    />
  );
}
