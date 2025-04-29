'use client';

import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface Props {
  name: string;
  currentFile: File | null;
  onSelectFile: (newFile: File) => void;
}

export default function SingleImagePicker({
  name,
  currentFile,
  onSelectFile,
}: Props) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!currentFile) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageUrl(fileReader.result ? fileReader.result.toString() : null);
    };
    fileReader.readAsDataURL(currentFile);
  }, [currentFile]);

  function handleOnClickLoad() {
    imageInputRef.current?.click();
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    onSelectFile(file);
  }

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      <div className="w-40 h-40 border border-primary rounded-sm relative flex justify-center items-center overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt="유저 선택 이미지" fill unoptimized />
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
      <button
        className="h-fit p-4 bg-primary hover:bg-hovering text-white rounded-sm"
        type="button"
        onClick={handleOnClickLoad}
      >
        이미지 불러오기
      </button>
    </div>
  );
}
