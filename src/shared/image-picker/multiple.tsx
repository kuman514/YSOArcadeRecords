'use client';

import { ChangeEvent, useRef } from 'react';

import ImageList from './image-list';
import { ImageListElementValue } from './types';

interface Props {
  name: string;
  images: ImageListElementValue[];
  onChangeImages: (newImages: ImageListElementValue[]) => void;
}

export default function MultipleImagePicker({
  name,
  images,
  onChangeImages,
}: Props) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  function handleOnClickLoad() {
    imageInputRef.current?.click();
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) {
      return;
    }
    const timestamp = new Date().getTime();
    const newImages: ImageListElementValue[] = Array.from(files).map(
      (file, index): ImageListElementValue => ({
        tmpId: `${timestamp}-${index}`,
        localFile: file,
      })
    );
    onChangeImages(images.concat(newImages));
  }

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      <div className="w-full min-h-40 border border-primary rounded flex justify-center items-center flex-wrap gap-4">
        {images.length > 0 ? (
          <ImageList images={images} onChangeImages={onChangeImages} />
        ) : (
          <span>이미지 없음</span>
        )}
      </div>
      <input
        ref={imageInputRef}
        className="hidden"
        type="file"
        id={name}
        accept="image/png, image/jpeg"
        name={name}
        onChange={handleOnChange}
        multiple
      />
      <button
        className="h-fit p-4 bg-primary hover:bg-hovering text-white rounded"
        type="button"
        onClick={handleOnClickLoad}
      >
        이미지 추가하기
      </button>
    </div>
  );
}
