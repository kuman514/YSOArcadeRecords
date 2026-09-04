import Image from 'next/image';
import Link from 'next/link';
import { Fragment, ReactNode } from 'react';

import { SearchResultProps } from '^/src/entities/search/types';

export default function SearchResult({
  title,
  subheading,
  description,
  href,
  thumbnailUrl,
  emphasize,
}: SearchResultProps) {
  const matchesWithTitle = [...title.matchAll(new RegExp(emphasize, 'gi'))];
  const matchesWithDescription = [
    ...description.matchAll(new RegExp(emphasize, 'gi')),
  ];

  const renderTitle: ReactNode[] = matchesWithTitle.map((matchInfo, i) => {
    if (i === 0) {
      return (
        <Fragment key={`${href}-title-${i}`}>
          {title.slice(0, matchInfo.index)}
          <strong>{matchInfo[0]}</strong>
          {matchesWithTitle.length === 1
            ? title.slice(matchInfo.index + matchInfo[0].length)
            : null}
        </Fragment>
      );
    }

    if (i === matchesWithTitle.length - 1) {
      return (
        <Fragment key={`${href}-title-${i}`}>
          {title.slice(
            matchesWithTitle[i - 1].index + matchesWithTitle[i - 1][0].length,
            matchInfo.index
          )}
          <strong>{matchInfo[0]}</strong>
          {title.slice(matchInfo.index + matchInfo[0].length)}
        </Fragment>
      );
    }

    return (
      <Fragment key={`${href}-title-${i}`}>
        {title.slice(
          matchesWithTitle[i - 1].index + matchesWithTitle[i - 1][0].length,
          matchInfo.index
        )}
        <strong>{matchInfo[0]}</strong>
      </Fragment>
    );
  });

  const renderDescription: ReactNode[] = matchesWithDescription.map(
    (matchInfo, i) => {
      if (i === 0) {
        return (
          <Fragment key={`${href}-description-${i}`}>
            {description.slice(0, matchInfo.index)}
            <strong>{matchInfo[0]}</strong>
            {matchesWithDescription.length === 1
              ? description.slice(matchInfo.index + matchInfo[0].length)
              : null}
          </Fragment>
        );
      }

      if (i === matchesWithDescription.length - 1) {
        return (
          <Fragment key={`${href}-description-${i}`}>
            {description.slice(
              matchesWithDescription[i - 1].index +
                matchesWithDescription[i - 1][0].length,
              matchInfo.index
            )}
            <strong>{matchInfo[0]}</strong>
            {description.slice(matchInfo.index + matchInfo[0].length)}
          </Fragment>
        );
      }

      return (
        <Fragment key={`${href}-description-${i}`}>
          {description.slice(
            matchesWithDescription[i - 1].index +
              matchesWithDescription[i - 1][0].length,
            matchInfo.index
          )}
          <strong>{matchInfo[0]}</strong>
        </Fragment>
      );
    }
  );

  return (
    <li className="w-full">
      <Link
        href={href}
        className="grid grid-cols-[1fr_3fr] gap-2 w-full min-h-24 cursor-pointer transition-all hover:bg-hovering hover:[&_.post-thumbnail]:scale-125 [&_.post-thumbnail]:transition-all hover:[&_.post-thumbnail]:brightness-110"
      >
        <div className="retro-rounded w-full aspect-square overflow-hidden relative post-thumbnail-wrapper">
          <Image
            fill
            className="w-full h-full aspect-square object-cover post-thumbnail"
            src={thumbnailUrl}
            alt={title}
            sizes="10rem"
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          <h3 className="text-2xl overflow-hidden text-ellipsis [&_strong]:bg-primary [&_strong]:text-white">
            {renderTitle}
          </h3>
          {subheading && <h4 className="block text-sm">{subheading}</h4>}
          <span className="block overflow-hidden text-ellipsis text-sm [&_strong]:bg-primary [&_strong]:text-white">
            {renderDescription}
          </span>
        </div>
      </Link>
    </li>
  );
}
