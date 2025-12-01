import Link from 'next/link';

import SidebarCaller from '^/src/features/sidebar/caller';
import { IS_PRODUCTION } from '^/src/shared/lib/is-production';
import NavLink from '^/src/shared/ui/nav-link';

export default function Header() {
  return (
    <header className="sticky top-0 left-0 w-full h-16 flex flex-row items-center pl-2 pr-6 gap-2 bg-primary z-50">
      <SidebarCaller />
      <div className="w-full flex flex-col">
        <div className="w-full h-12 flex flex-row items-center justify-between">
          <Link href="/" className="text-white">
            {IS_PRODUCTION ? 'YSOArcadeRecords' : 'DEV YSOARs'}
          </Link>

          <nav>
            <ul className="flex flex-row gap-2 sm:gap-6">
              <li>
                <NavLink href="/records">기록</NavLink>
              </li>
              <li>
                <NavLink href="/reviews">리뷰</NavLink>
              </li>
              <li>
                <NavLink href="/gallery">갤러리</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
