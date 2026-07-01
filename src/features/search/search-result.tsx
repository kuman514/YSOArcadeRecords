import Link from 'next/link';
import Image from 'next/image';
import { Fragment, ReactNode } from 'react';

interface Props {
  title: string;
  subheading: string;
  description: string;
  href: string;
  thumbnailUrl: string;
  emphasize: string;
}

export default function SearchResult({
  title,
  subheading,
  description,
  href,
  thumbnailUrl,
  emphasize,
}: Props) {
  const splitTitle = title.split(emphasize);
  const splitDescription = description.split(emphasize);

  const renderTitle: ReactNode[] = splitTitle.map((split, i) =>
    i < splitTitle.length - 1 ? (
      <Fragment key={`${href}-title-${i}`}>
        {split}
        <strong>{emphasize}</strong>
      </Fragment>
    ) : (
      <Fragment key={`${href}-title-${i}`}>{split}</Fragment>
    )
  );
  const renderDescription: ReactNode[] = splitDescription.map((split, i) =>
    i < splitDescription.length - 1 ? (
      <Fragment key={`${href}-description-${i}`}>
        {split}
        <strong>{emphasize}</strong>
      </Fragment>
    ) : (
      <Fragment key={`${href}-description-${i}`}>{split}</Fragment>
    )
  );

  return (
    <li className="w-full">
      <Link
        href={href}
        className="flex flex-row gap-2 w-full min-h-24 cursor-pointer transition-all hover:bg-hovering hover:[&_.post-thumbnail]:scale-125 [&_.post-thumbnail]:transition-all hover:[&_.post-thumbnail]:brightness-110"
      >
        <div className="retro-rounded w-1/4 min-w-24 min-h-24 aspect-square overflow-hidden relative post-thumbnail-wrapper">
          <Image
            fill
            className="w-full h-full aspect-square object-cover post-thumbnail"
            src={thumbnailUrl}
            alt={title}
            sizes="10rem"
          />
        </div>
        <div className="flex flex-col overflow-hidden">
          <h3 className="text-2xl overflow-hidden text-ellipsis [&_strong]:bg-primary">
            {renderTitle}
          </h3>
          <h4 className="block text-sm">{subheading}</h4>
          <span className="block overflow-hidden text-ellipsis text-sm [&_strong]:bg-primary">
            {renderDescription}
          </span>
        </div>
      </Link>
    </li>
  );
}
