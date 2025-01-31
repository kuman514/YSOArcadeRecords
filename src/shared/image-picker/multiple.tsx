'use client';

import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';

interface Props {
  name: string;
}

export default function MultipleImagePicker({ name }: Props) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [pickedImages, setPickedImages] = useState<
    { sourceUrl: string; tmpId: string }[]
  >([]);

  function handleOnClickLoad() {
    imageInputRef.current?.click();
  }

  // function handleOnClickDelete(index: number) {
  //   return () => {
  //     const newPickedImages = Array.from(pickedImages);
  //     newPickedImages.splice(index, 1);
  //     setPickedImages(newPickedImages);
  //   };
  // }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files) {
      return;
    }

    (async () => {
      let i = 0;
      const newPickedImages = await Promise.all<{
        sourceUrl: string;
        tmpId: string;
      }>(
        Array.from(files).map(
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
      setPickedImages(newPickedImages);
    })();
  }

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      <div className="w-full min-h-40 border border-primary rounded flex justify-center items-center flex-wrap gap-4">
        {pickedImages.length ? (
          pickedImages.map((pickedImage) => (
            <div key={pickedImage.tmpId} className="flex flex-row gap-2">
              <div className="w-40 h-40 relative">
                <Image
                  src={pickedImage.sourceUrl}
                  alt="유저 선택 이미지"
                  fill
                />
              </div>
              {/* <button type="button" onClick={handleOnClickDelete(index)}>
                X
              </button> */}
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
        required
      />
      <div className="flex flex-row gap-4 flex-wrap">
        <button
          className="h-fit p-4 bg-primary hover:bg-hovering text-white rounded"
          type="button"
          onClick={handleOnClickLoad}
        >
          이미지 추가하기
        </button>
      </div>
    </div>
  );
}
