'use client';

import Image from 'next/image';

import { MultipleFormValueElement } from '^/src/shared/ui/types';

interface Props {
  elementInfo: MultipleFormValueElement<string>;
  onClickDelete: () => void;
}

export default function ImageListElement({
  elementInfo,
  onClickDelete,
}: Props) {
  return (
    <div
      id={`image-list-element-${elementInfo.id}`}
      className="flex flex-row gap-2"
      draggable
    >
      <div className="w-40 h-40 relative">
        <Image
          src={elementInfo.value}
          alt="유저 선택 이미지"
          fill
          sizes="10rem"
        />
        <div
          id={`image-list-element-${elementInfo.id}-left`}
          className="absolute left-0 top-0 w-1/2 h-full"
        />
        <div
          id={`image-list-element-${elementInfo.id}-right`}
          className="absolute right-0 top-0 w-1/2 h-full"
        />
      </div>
      <button type="button" onClick={onClickDelete}>
        X
      </button>
    </div>
  );
}
