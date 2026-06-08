'use client';

import { useEffect, useRef } from 'react';

export default function SidebarOpenChecker() {
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
      id="sidebar-open-checker"
      className="hidden [&+#sidebar-overlay]:hidden checked:[&+#sidebar-overlay]:block"
      onChange={(event) => {
        document.body.style.overflowY = event.currentTarget.checked
          ? 'hidden'
          : 'auto';
      }}
    />
  );
}
