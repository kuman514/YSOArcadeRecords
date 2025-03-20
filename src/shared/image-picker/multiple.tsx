'use client';

import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface Props {
  name: string;
  currentFiles: File[];
  onSelectFiles: (newFiles: File[]) => void;
}

export default function MultipleImagePicker({
  name,
  currentFiles,
  onSelectFiles,
}: Props) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [imageInfos, setImageInfos] = useState<
    { sourceUrl: string; tmpId: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      let i = 0;
      const newImageInfo = await Promise.all<{
        sourceUrl: string;
        tmpId: string;
      }>(
        Array.from(currentFiles).map(
          (file) =>
            new Promise((resolve, reject) => {
              const fileReader = new FileReader();
              fileReader.onload = () => {
                if (!fileReader.result) {
                  reject(new Error('Unable to read file'));
                  return;
                }
                resolve({
                  sourceUrl: fileReader.result.toString(),
                  tmpId: `${new Date().getTime()}-${i++}`,
                });
              };
              fileReader.readAsDataURL(file);
            })
        )
      );
      setImageInfos(newImageInfo);
    })();
  }, [currentFiles]);

  function handleOnClickLoad() {
    imageInputRef.current?.click();
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) {
      return;
    }
    onSelectFiles(Array.from(files));
  }

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      <div className="w-full min-h-40 border border-primary rounded flex justify-center items-center flex-wrap gap-4">
        {imageInfos.length ? (
          imageInfos.map((imageInfo) => (
            <div key={imageInfo.tmpId} className="flex flex-row gap-2">
              <div className="w-40 h-40 relative">
                <Image
                  src={imageInfo.sourceUrl}
                  alt="유저 선택 이미지"
                  fill
                  unoptimized
                />
              </div>
            </div>
          ))
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
