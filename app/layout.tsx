import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';

import Contact from '^/src/features/contact';
import Sidebar from '^/src/features/sidebar';
import SidebarCaller from '^/src/features/sidebar/caller';
import { IS_PRODUCTION } from '^/src/shared/lib/is-production';
import Modal from '^/src/shared/modal';
import NavLink from '^/src/shared/ui/nav-link';
import AlternativeHeader from '^/src/widgets/menu/alternative-header';
import AuthLink from '^/src/widgets/menu/auth-link';
import { ToastContainer } from 'react-toastify';

import './globals.css';

const gyeonggiCheonnyeonJemok = localFont({
  src: [
    {
      path: './GyeonggiCheonnyeonJemok-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './GyeonggiCheonnyeonJemok-Medium.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './GyeonggiCheonnyeonJemok-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: IS_PRODUCTION ? 'YSOArcadeRecords' : 'DEV YSOArcadeRecords',
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
        className={`${gyeonggiCheonnyeonJemok.className} antialiased w-screen min-h-dvh flex flex-col items-center overflow-x-hidden`}
      >
        <header
          className={`w-full h-32 flex flex-row items-end pl-6 pr-6 sm:pl-8 sm:pr-12 pb-4 bg-primary`}
        >
          <SidebarCaller />
          <div className="w-full flex flex-col">
            <AuthLink />
            <div className="w-full h-12 flex flex-col items-center justify-end sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="text-white md:text-2xl">
                {IS_PRODUCTION ? 'YSOArcadeRecords' : 'DEV YSOArcadeRecords'}
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
        <Contact />

        <Sidebar />
        <Modal />

        <ToastContainer />
      </body>
    </html>
  );
}
