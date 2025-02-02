'use client';

import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';

interface Props {
  name: string;
}

export default function SingleImagePicker({ name }: Props) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [pickedImage, setPickedImage] = useState<string | null>(null);

  function handleOnClickLoad() {
    imageInputRef.current?.click();
  }

  function handleOnClickClear() {
    setPickedImage(null);
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result ? fileReader.result.toString() : null);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      <div className="w-40 h-40 border border-primary rounded relative flex justify-center items-center overflow-hidden">
        {pickedImage ? (
          <Image src={pickedImage} alt="유저 선택 이미지" fill />
        ) : (
          <span>이미지 없음</span>
        )}
      </div>
      <input
        className="hidden"
        ref={imageInputRef}
        type="file"
        id={name}
        accept="image/png, image/jpeg"
        name={name}
        onChange={handleOnChange}
      />
      <div className="flex flex-row gap-4 flex-wrap">
        <button
          className="h-fit p-4 bg-primary hover:bg-hovering text-white rounded"
          type="button"
          onClick={handleOnClickLoad}
        >
          이미지 불러오기
        </button>
        <button
          className="h-fit p-4 bg-primary hover:bg-hovering text-white rounded"
          type="button"
          onClick={handleOnClickClear}
        >
          이미지 삭제하기
        </button>
      </div>
    </div>
  );
}
