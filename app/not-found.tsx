import Image from 'next/image';

import NotFoundPng from '^/public/status/not-found.png';

export default function RootNotFoundPage() {
  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-center px-4 sm:px-8 py-32 gap-8">
      <div className="w-full h-40 relative">
        <Image
          src={NotFoundPng}
          fill
          alt="페이지를 찾을 수 없음"
          className="object-contain"
          priority
        />
      </div>
      <h1 className="text-4xl font-bold">페이지를 찾을 수 없습니다.</h1>
    </main>
  );
}
