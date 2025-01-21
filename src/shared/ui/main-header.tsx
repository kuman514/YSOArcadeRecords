import Link from 'next/link';

import AlternativeHeader from './alternative-header';
import NavLink from './nav-link';
import SidebarCaller from './sidebar-caller';

export default function MainHeader() {
  return (
    <>
      <header
        className={`w-full h-32 flex flex-row items-end pl-6 pr-6 sm:pl-8 sm:pr-12 pb-4 bg-primary`}
      >
        <SidebarCaller />
        <div className="w-full h-12 flex flex-col items-center justify-end md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-white sm:text-2xl">
            YSOArcadeRecords
          </Link>

          <nav>
            <ul className="flex flex-row gap-6">
              <li>
                <NavLink href="/records">Records</NavLink>
              </li>
              <li>
                <NavLink href="/reviews">Reviews</NavLink>
              </li>
              <li>
                <NavLink href="/gallery">Gallery</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <AlternativeHeader />
    </>
  );
}
