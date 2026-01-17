'use client';

import BlueskySvg from '^/public/icons/bluesky.svg';

interface Props {
  postTitle: string;
  additionalClassName?: string;
}

export function ShareToBlueskyButton({
  postTitle,
  additionalClassName,
}: Props) {
  function handleOnClickShareToBluesky() {
    const textToUri = encodeURIComponent(
      `${postTitle} #YSOArcadeRecords ${window.location.href}`
    );
    console.log(textToUri);
    const post = `https://bsky.app/intent/compose?text=${textToUri}`;
    window.open(post, '_blank');
  }

  return (
    <button
      type="button"
      className={`w-11 h-11 p-2.5 flex flex-row justify-center items-center rounded-full border cursor-pointer hover:bg-hovering ${
        additionalClassName ??
        'border-black fill-black stroke-black dark:border-white dark:stroke-white dark:fill-white'
      }`}
      onClick={handleOnClickShareToBluesky}
    >
      <BlueskySvg fill="inherit" width="100%" height="100%" />
    </button>
  );
}
