import Link from 'next/link';

export default function MainHeader() {
  return (
    <header className="w-full flex flex-row items-center justify-between">
      <Link href="/">YSOArcadeRecords</Link>

      <nav>
        <ul className="flex flex-row">
          <li>
            <Link href="/introduction">Introduction</Link>
          </li>
          <li>
            <Link href="/records">Records</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
