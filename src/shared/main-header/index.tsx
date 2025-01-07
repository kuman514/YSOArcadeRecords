import Link from 'next/link';

import AlternativeHeader from './alternative';
import NavLink from './nav-link';

export default function MainHeader() {
  return (
    <>
      <header
        className={`w-full h-32 flex flex-col items-center justify-end sm:flex-row sm:items-end sm:justify-between px-12 pb-4 bg-primary`}
      >
        <Link href="/" className="text-white text-2xl">
          YSOArcadeRecords
        </Link>

        <nav>
          <ul className="flex flex-row gap-12">
            <li>
              <NavLink href="/introduction">Introduction</NavLink>
            </li>
            <li>
              <NavLink href="/records">Records</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <AlternativeHeader />
    </>
  );
}
