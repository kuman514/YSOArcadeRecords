'use client';

import { useState } from 'react';
import Image from 'next/image';

import { ImageListElementValue } from './types';

interface Props {
  elementInfo: ImageListElementValue;
  onClickDelete: () => void;
}

export default function ImageListElement({
  elementInfo,
  onClickDelete,
}: Props) {
  const [isLeftDragEnter, setIsLeftDragEnter] = useState<boolean>(false);
  const [isRightDragEnter, setIsRightDragEnter] = useState<boolean>(false);

  return (
    <div
      id={`image-list-element_${elementInfo.tmpId}`}
      className={`flex flex-row gap-2 ${
        isLeftDragEnter ? 'border-solid border-l border-l-hovering' : ''
      } ${isRightDragEnter ? 'border-solid border-r border-r-hovering' : ''}`}
      draggable
    >
      <div className="w-40 h-40 relative">
        <Image
          src={elementInfo.sourceUrl}
          alt="유저 선택 이미지"
          fill
          sizes="10rem"
        />
        <div
          id={`image-list-element_${elementInfo.tmpId}_left`}
          className="absolute left-0 top-0 w-1/2 h-full"
          onDragEnter={() => {
            setIsLeftDragEnter(true);
          }}
          onDragLeave={() => {
            setIsLeftDragEnter(false);
          }}
        />
        <div
          id={`image-list-element_${elementInfo.tmpId}_right`}
          className="absolute right-0 top-0 w-1/2 h-full"
          onDragEnter={() => {
            setIsRightDragEnter(true);
          }}
          onDragLeave={() => {
            setIsRightDragEnter(false);
          }}
        />
      </div>
      <button type="button" onClick={onClickDelete}>
        X
      </button>
    </div>
  );
}
