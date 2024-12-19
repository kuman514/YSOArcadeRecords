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

  const className = pathName?.startsWith(href) ? 'text-hovering' : 'text-white';

  return (
    <Link href={href} className={`text-2xl ${className}`}>
      {children}
    </Link>
  );
}
