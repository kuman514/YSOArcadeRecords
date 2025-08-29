import Image from 'next/image';
import Link from 'next/link';

import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';
import NotFoundPng from '^/public/status/not-found.png';

export default function GalleryNotFoundPage() {
  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-center px-4 sm:px-8 py-32 gap-8">
      <div className="fixed left-0 top-0 w-screen h-dvh bg-[rgba(0,0,0)] z-50 touch-none flex flex-col justify-center items-center sm:text-4xl">
        <Image
          src={NotFoundPng}
          alt="관련 데이터를 찾을 수 없음"
          className="object-contain"
          priority
          sizes="37.5rem"
          unoptimized
        />
        이미지를 찾을 수 없습니다.
        <Link
          className="fixed left-0 top-0 w-12 h-12 p-2 m-2 cursor-pointer"
          href="/gallery"
        >
          <CloseSvgRepoComSvg width="100%" height="100%" />
        </Link>
      </div>
    </main>
  );
}
