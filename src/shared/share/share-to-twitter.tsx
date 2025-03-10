'use client';

import Image from 'next/image';

import TwitterSvg from '^/public/icons/twitter.svg';

interface Props {
  postTitle: string;
}

export function ShareToTwitterButton({ postTitle }: Props) {
  function handleOnClickShareToTwitter() {
    const urlToUri = encodeURI(window.location.href);
    const textToUri = encodeURI(postTitle);

    const tweet = `https://twitter.com/intent/tweet?url=${urlToUri}&text=${textToUri}&hashtags=YSOArcadeRecords`;
    window.open(tweet, '_blank');
  }

  return (
    <button
      type="button"
      className="flex flex-row justify-center items-center rounded-full border border-black p-2.5 hover:bg-hovering dark:hover:bg-inverted-hovering dark:invert"
      onClick={handleOnClickShareToTwitter}
    >
      <Image
        src={TwitterSvg}
        alt="Twitter로 공유하기"
        className="w-6 h-6 color-primary"
      />
    </button>
  );
}
