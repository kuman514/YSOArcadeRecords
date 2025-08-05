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

  const renderMemo =
    memo.length > 0 ? <span className="text-white">{memo}</span> : null;

  const renderTags =
    tags.length > 0 ? (
      <div className="flex flex-row flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span
            key={`post-tag-${index}`}
            className="text-xs text-white px-1.5 py-1 rounded-sm bg-[rgba(32,32,32,0.6)]"
          >
            {tag}
          </span>
        ))}
      </div>
    ) : null;

  const renderYouTubeMark = isHaveYouTube ? (
    <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-start items-end z-1 px-4 py-3">
      <Image unoptimized src={YouTubeMarkSvg} alt="YouTube 영상 포함" />
    </div>
  ) : null;

  return (
    <li className="w-full h-80 rounded-2xl overflow-hidden hover:[&_.post-thumbnail]:scale-125 [&_.post-thumbnail]:transition-all hover:[&_.post-thumbnail]:brightness-110">
      <Link href={href} className="w-full h-full relative flex">
        <div className="absolute left-0 top-0 w-full h-full z-0">
          <Image
            className="object-cover post-thumbnail"
            src={thumbnailUrl}
            alt={`${title} ${memo}`}
            fill
            sizes="37.5rem"
          />
        </div>

        <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between z-1 px-4 py-3 gap-2 bg-linear-180 from-transparent from-55% to-[rgba(0,0,0,0.9)] to-97%">
          {renderDate}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-xl text-white font-bold drop-shadow-[0_0_12px_rgba(32,32,32,1)] sm:text-2xl">
                {title}
              </span>
              {renderMemo}
            </div>
            {renderTags}
          </div>
        </div>

        {renderYouTubeMark}
      </Link>
    </li>
  );
}
