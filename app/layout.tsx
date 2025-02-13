import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';

import Modal from '^/src/entities/modal';
import SidebarCaller from '^/src/entities/modal/sidebar/caller';
import NavLink from '^/src/shared/ui/nav-link';
import AlternativeHeader from '^/src/widgets/menu/alternative-header';
import AuthLink from '^/src/widgets/menu/auth-link';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'YSOArcadeRecords',
  // prettier-ignore
  description: 'YSO(kuman514)\'s arcade records',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen min-h-dvh flex flex-col items-center`}
      >
        <header
          className={`w-full h-32 flex flex-row items-end pl-6 pr-6 sm:pl-8 sm:pr-12 pb-4 bg-primary`}
        >
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
        {children}
        <AlternativeHeader />
        <Modal />
      </body>
    </html>
  );
}
