'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function AuthLinkArea({ children }: Props) {
  return (
    <div
      className="h-full flex flex-row justify-end items-center text-white gap-2 text-sm"
      onClick={(event) => {
        if (
          !(event.target instanceof HTMLElement) ||
          (event.target.nodeName !== 'A' && event.target.nodeName !== 'BUTTON')
        ) {
          return;
        }

        const sidebarOpenChecker = document.querySelector(
          'input#side-drawer-open-checker'
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
      {children}
    </div>
  );
}
