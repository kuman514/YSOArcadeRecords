'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import NoteEditSvgRepoComSvg from '^/public/icons/note-edit-svgrepo-com.svg';
import PictureSvgRepoComSvg from '^/public/icons/picture-svgrepo-com.svg';
import TrophySvgRepoComSvg from '^/public/icons/trophy-svgrepo-com.svg';

export default function SimplifiedSidebar() {
  const pathName = usePathname();

  return (
    <div className="overflow-y-auto w-full h-full flex flex-col justify-start items-center">
      <Link
        href="/records"
        className="w-16 h-16 flex flex-col justify-center items-center cursor-pointer gap-1 hover:bg-hovering"
        style={
          pathName.startsWith('/records')
            ? {
                backgroundColor: 'var(--hovering-color)',
              }
            : undefined
        }
      >
        <TrophySvgRepoComSvg width="2rem" height="2rem" />
        <span className="text-xs">기록</span>
      </Link>
      <Link
        href="/reviews"
        className="w-16 h-16 flex flex-col justify-center items-center cursor-pointer gap-1 hover:bg-hovering"
        style={
          pathName.startsWith('/reviews')
            ? {
                backgroundColor: 'var(--hovering-color)',
              }
            : undefined
        }
      >
        <NoteEditSvgRepoComSvg width="2rem" height="2rem" />
        <span className="text-xs">리뷰</span>
      </Link>
      <Link
        href="/gallery"
        className="w-16 h-16 flex flex-col justify-center items-center cursor-pointer gap-1 hover:bg-hovering"
        style={
          pathName.startsWith('/gallery')
            ? {
                backgroundColor: 'var(--hovering-color)',
              }
            : undefined
        }
      >
        <PictureSvgRepoComSvg width="2rem" height="2rem" />
        <span className="text-xs">갤러리</span>
      </Link>
    </div>
  );
}
