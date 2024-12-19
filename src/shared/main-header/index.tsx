import Link from 'next/link';

import NavLink from './nav-link';

export default function MainHeader() {
  return (
    <header className="w-full h-32 flex flex-row items-center justify-between px-12 bg-primary">
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
  );
}
