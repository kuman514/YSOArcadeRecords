'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function AuthLinkArea({ children }: Props) {
  return (
    <div
      className="w-full h-full flex flex-row justify-end items-center text-white pr-8 gap-2 text-sm"
      onClick={(event) => {
        if (
          !(event.target instanceof HTMLElement) ||
          (event.target.nodeName !== 'A' && event.target.nodeName !== 'BUTTON')
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
      {children}
    </div>
  );
}
