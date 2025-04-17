'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { ImageListElementValue } from '../types';

interface Props {
  elementInfo: ImageListElementValue;
  onClickDelete: () => void;
}

export default function ImageListElement({
  elementInfo,
  onClickDelete,
}: Props) {
  if (!elementInfo.localFile && !elementInfo.sourceUrl) {
    throw new Error('Each image should have either local file or source URL.');
  }

  const [imageUrl, setImageUrl] = useState<string | null>(
    elementInfo.sourceUrl ?? null
  );
  useEffect(() => {
    const localFile = elementInfo.localFile;
    if (!localFile) {
      return;
    }
    (async () => {
      const newUrl = await new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          if (!fileReader.result) {
            reject(new Error('Unable to read file'));
            return;
          }
          resolve(fileReader.result.toString());
        };
        fileReader.readAsDataURL(localFile);
      });
      setImageUrl(newUrl);
    })();
  }, [elementInfo.localFile]);

  return (
    <div
      id={`image-list-element_${elementInfo.tmpId}`}
      className="flex flex-row gap-2"
      draggable
    >
      <div className="w-40 h-40 relative">
        {imageUrl ? (
          <Image src={imageUrl} alt="유저 선택 이미지" fill sizes="10rem" />
        ) : (
          <div className="w-full h-full" />
        )}
        <div
          id={`image-list-element_${elementInfo.tmpId}_left`}
          className="absolute left-0 top-0 w-1/2 h-full"
        />
        <div
          id={`image-list-element_${elementInfo.tmpId}_right`}
          className="absolute right-0 top-0 w-1/2 h-full"
        />
      </div>
      <button type="button" onClick={onClickDelete}>
        X
      </button>
    </div>
  );
}
