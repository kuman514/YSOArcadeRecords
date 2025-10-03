'use client';

import { toast } from 'react-toastify';

import LinkSvg from '^/public/icons/link.svg';

interface Props {
  additionalClassName?: string;
}

export function CopyLinkButton({ additionalClassName }: Props) {
  function handleOnClickCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    toast('링크가 복사되었습니다.', {
      type: 'success',
    });
  }

  return (
    <button
      type="button"
      className={`w-11 h-11 p-2.5 flex flex-row justify-center items-center rounded-full border cursor-pointer hover:bg-hovering ${
        additionalClassName ??
        'border-black fill-black stroke-black dark:border-white dark:stroke-white dark:fill-white'
      }`}
      onClick={handleOnClickCopyLink}
    >
      <LinkSvg stroke="inherit" width="100%" height="100%" />
    </button>
  );
}
