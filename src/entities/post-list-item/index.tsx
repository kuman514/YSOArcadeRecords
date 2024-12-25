import Image from 'next/image';
import Link from 'next/link';

import YouTubeMarkSvg from '^/public/icons/youtube-mark.svg';

import { PostListItemProps } from './props';

export default function PostListItem({
  title,
  memo,
  dateToDisplay,
  tags,
  isHaveYouTube,
  href,
  thumbnailUrl,
}: PostListItemProps) {
  const renderDate = (() => {
    const year = dateToDisplay.getFullYear();
    const month = dateToDisplay.getMonth();
    const date = dateToDisplay.getDate();

    return (
      <span className="w-fit text-xs text-white px-3 py-1.5 rounded-2xl bg-[rgba(32,32,32,0.6)]">
        {year}년 {month + 1}월 {date}일
      </span>
    );
  })();

  const renderTags =
    tags.length > 0 ? (
      <div className="flex flex-row flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span
            key={`post-tag-${index}`}
            className="text-xs text-white px-1.5 py-1 rounded bg-[rgba(32,32,32,0.6)]"
          >
            {tag}
          </span>
        ))}
      </div>
    ) : null;

  const renderYouTubeMark = isHaveYouTube ? (
    <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-start items-end z-1 px-4 py-3">
      <YouTubeMarkSvg />
    </div>
  ) : null;

  return (
    <li className="w-full h-80 rounded-2xl overflow-hidden [&_img]:hover:scale-125 [&_img]:transition-all [&_img]:hover:brightness-110">
      <Link href={href} className="w-full h-full relative flex">
        <div className="absolute left-0 top-0 w-full h-full z-0">
          <Image
            className="object-cover"
            src={thumbnailUrl}
            alt={`${title} ${memo}`}
            fill
          />
        </div>

        <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between z-1 px-4 py-3 gap-2 bg-vertical-gradient from-transparent from-55% to-[rgba(0,0,0,0.9)] to-97%">
          {renderDate}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-xl text-white font-bold drop-shadow-[0_0_12px_rgba(32,32,32,1)] sm:text-2xl">
                {title}
              </span>
              <span className="text-white">{memo}</span>
            </div>
            {renderTags}
          </div>
        </div>

        {renderYouTubeMark}
      </Link>
    </li>
  );
}
