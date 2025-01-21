'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
}

export default function NavLink({ href, children }: Props) {
  const pathName = usePathname();

  const className = pathName?.startsWith(href)
    ? 'text-hovering drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]'
    : 'text-white';

  return (
    <Link href={href} className={`sm:text-2xl ${className}`}>
      {children}
    </Link>
  );
}
