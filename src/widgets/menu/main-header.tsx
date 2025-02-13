import Link from 'next/link';

import NavLink from '^/src/shared/ui/nav-link';

import AlternativeHeader from './alternative-header';
import AuthLink from './auth-link';
import SidebarCaller from './sidebar-caller';

export default function MainHeader() {
  return (
    <>
      <header
        className={`w-full h-32 flex flex-row items-end pl-6 pr-6 sm:pl-8 sm:pr-12 pb-4 bg-primary`}
      >
        {/**
         * @todo
         * Resolve prerender error for sidebar caller.
         */}
        <SidebarCaller />
        <div className="w-full flex flex-col">
          <AuthLink />
          <div className="w-full h-12 flex flex-col items-center justify-end sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="text-white md:text-2xl">
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
        </div>
      </header>
      {/**
       * @todo
       * Resolve prerender error for alternative header.
       */}
      <AlternativeHeader />
    </>
  );
}
