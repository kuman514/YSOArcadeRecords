'use client';

import Link from 'next/link';

import { IS_PRODUCTION } from '^/src/shared/util/is-production';

export default function TitleLink() {
  return (
    <Link
      onClick={() => {
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
      href="/"
      className="text-white"
    >
      {IS_PRODUCTION ? 'YSOArcadeRecords' : 'DEV YSOARs'}
    </Link>
  );
}
