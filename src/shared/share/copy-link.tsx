'use client';

import Image from 'next/image';

import LinkSvg from '^/public/icons/link.svg';

export function CopyLinkButton() {
  function handleOnClickCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다.');
  }

  return (
    <button
      type="button"
      className="flex flex-row justify-center items-center rounded-full border border-black p-2.5 hover:bg-hovering dark:hover:bg-inverted-hovering dark:invert cursor-pointer"
      onClick={handleOnClickCopyLink}
    >
      <Image
        src={LinkSvg}
        alt="링크 복사하기"
        className="w-6 h-6 color-primary"
      />
    </button>
  );
}
