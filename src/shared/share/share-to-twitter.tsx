'use client';

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
      className="w-11 h-11 p-2.5 flex flex-row justify-center items-center rounded-full border border-black hover:bg-hovering dark:border-white dark:stroke-white dark:fill-white cursor-pointer"
      onClick={handleOnClickShareToTwitter}
    >
      <TwitterSvg width="100%" height="100%" />
    </button>
  );
}
