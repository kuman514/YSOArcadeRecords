import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';

import Contact from '^/src/features/contact';
import { getHealth } from '^/src/features/health/api';
import Sidebar from '^/src/features/sidebar';
import { APP_NAME } from '^/src/shared/lib/is-production';
import Footer from '^/src/shared/ui/footer';
import Header from '^/src/widgets/menu/header';
import Modal from '^/src/widgets/modal';

import './globals.css';

const neoDgm = localFont({
  src: [
    {
      path: './neodgm.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './neodgm.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './neodgm.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

const pressStart2p = localFont({
  src: [
    {
      path: './PressStart2P.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-press-start-2p',
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'YSO(kuman514)의 다양한 아케이드 게임 경험 공유',
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
          className={`${neoDgm.className} antialiased w-screen min-h-dvh flex flex-col justify-center items-center overflow-x-hidden text-center gap-8`}
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
        className={`${neoDgm.className} ${pressStart2p.variable} antialiased w-screen min-h-dvh flex flex-col items-center overflow-x-hidden`}
      >
        <Header />
        <section className="w-full bg-background flex flex-col items-center">
          {children}
        </section>
        <Footer />
        <Contact />
        <Sidebar />
        <Modal />
        <ToastContainer toastClassName={neoDgm.className} />
      </body>
    </html>
  );
}
