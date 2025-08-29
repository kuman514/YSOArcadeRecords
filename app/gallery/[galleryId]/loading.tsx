import Link from 'next/link';

import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';

export default async function GalleryPostLoadingPage() {
  return (
    <main className="w-full h-full max-w-3xl px-4 sm:px-8 py-32">
      <div className="fixed left-0 top-0 w-screen h-dvh bg-[rgba(0,0,0)] z-50 touch-none flex flex-col justify-center items-center sm:text-4xl">
        갤러리 이미지 로딩중...
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
