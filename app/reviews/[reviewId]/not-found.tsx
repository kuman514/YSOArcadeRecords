import Image from 'next/image';

import NotFoundPng from '^/public/status/not-found.png';

export default function ReviewArticleNotFoundPage() {
  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-center px-4 sm:px-8 py-32 gap-8">
      <div className="w-full h-40 relative">
        <Image
          src={NotFoundPng}
          fill
          alt="관련 데이터를 찾을 수 없음"
          className="object-contain"
          priority
          sizes="37.5rem"
        />
      </div>
      <h1 className="text-4xl font-bold">리뷰가 없습니다.</h1>
    </main>
  );
}
