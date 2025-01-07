import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import MainHeader from '^/src/shared/ui/main-header';

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
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
