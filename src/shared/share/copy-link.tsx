'use client';

import LinkSvg from '^/public/icons/link.svg';

export function CopyLinkButton() {
  function handleOnClickCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다.');
  }

  return (
    <button
      type="button"
      className="w-11 h-11 p-2.5 flex flex-row justify-center items-center rounded-full border border-black hover:bg-hovering dark:hover:bg-inverted-hovering dark:invert cursor-pointer"
      onClick={handleOnClickCopyLink}
    >
      <LinkSvg width="100%" height="100%" stroke="#000000" />
    </button>
  );
}
