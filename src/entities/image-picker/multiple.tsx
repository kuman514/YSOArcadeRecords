'use client';

import { ChangeEvent, useRef } from 'react';
import { toast } from 'react-toastify';

import { MAXIMUM_IMAGE_SIZE } from './constants';
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

    const allowedFiles = Array.from(files).filter(
      (file) => file.size <= MAXIMUM_IMAGE_SIZE
    );
    const timestamp = new Date().getTime();
    const newImages: ImageListElementValue[] = allowedFiles.map(
      (file, index): ImageListElementValue => ({
        tmpId: `${timestamp}-${index}`,
        localFile: file,
      })
    );

    if (newImages.length !== files.length) {
      toast(
        '일부 이미지의 용량이 너무 커서 등록되지 못했습니다. 더 작은 용량의 이미지를 선택해주세요.',
        { type: 'error' }
      );
    }

    onChangeImages(images.concat(newImages));
  }

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      <div className="w-full min-h-40 retro-rounded-2 flex justify-center items-center flex-wrap gap-4">
        {images.length > 0 ? (
          <ImageList images={images} onChangeImages={onChangeImages} />
        ) : (
          <span>이미지 없음</span>
        )}
      </div>
      <input
        ref={imageInputRef}
        value={[]}
        className="hidden"
        type="file"
        id={name}
        accept="image/png, image/jpeg"
        name={name}
        onChange={handleOnChange}
        multiple
      />
      <button
        className="w-full h-fit p-4 bg-primary hover:bg-hovering text-white rounded-sm cursor-pointer"
        type="button"
        onClick={handleOnClickLoad}
      >
        이미지 추가하기
      </button>
    </div>
  );
}
