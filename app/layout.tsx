import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';

import Contact from '^/src/features/contact';
import { getHealth } from '^/src/features/health/api';
import Sidebar from '^/src/features/sidebar';
import SidebarCaller from '^/src/features/sidebar/caller';
import { IS_PRODUCTION } from '^/src/shared/lib/is-production';
import NavLink from '^/src/shared/ui/nav-link';
import AuthLink from '^/src/widgets/menu/auth-link';
import Modal from '^/src/widgets/modal';

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

export default async function RootLayout({ children }: Readonly<Props>) {
  const health = await getHealth();

  if (health.status === 'closed') {
    return (
      <html lang="ko-kr">
        <body
          className={`${gyeonggiCheonnyeonJemok.className} antialiased w-screen min-h-dvh flex flex-col justify-center items-center overflow-x-hidden text-center gap-8`}
        >
          <h1 className="w-full text-4xl font-bold text-center px-8">
            YSOArcadeRecords에 접속할 수 없습니다.
          </h1>
          {health.maintenanceMessage && (
            <p className="w-full max-w-4xl text-center px-8">
              {health.maintenanceMessage}
            </p>
          )}
          <p className="flex flex-col justify-center items-center px-8">
            <Link
              target="_blank"
              href="https://open.kakao.com/me/kuman514"
              className="text-xl hover:text-hovering"
            >
              카카오톡 kuman514 오픈채팅방으로 문의하기
            </Link>
          </p>
        </body>
      </html>
    );
  }

  return (
    <html lang="ko-kr">
      <body
        className={`${gyeonggiCheonnyeonJemok.className} antialiased w-screen min-h-dvh flex flex-col items-center overflow-x-hidden`}
      >
        <header className="sticky top-0 left-0 w-full h-16 flex flex-row items-center pl-2 pr-6 gap-2 bg-primary z-50">
          <SidebarCaller />
          <div className="w-full flex flex-col">
            <div className="w-full h-12 flex flex-row items-center justify-between">
              <Link href="/" className="text-white">
                {IS_PRODUCTION ? 'YSOArcadeRecords' : 'YSOArcadeRecords'}
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

        {children}

        <Contact />

        <Sidebar />
        <Modal />

        <ToastContainer toastClassName={gyeonggiCheonnyeonJemok.className} />
      </body>
    </html>
  );
}
