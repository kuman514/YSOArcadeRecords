'use client';

import { ChangeEvent, useRef } from 'react';
import { toast } from 'react-toastify';

import Button from '^/src/shared/ui/button';

import {
  MAXIMUM_IMAGE_LENGTH_ON_RESIZE,
  MAXIMUM_IMAGE_SIZE,
} from './constants';
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

  async function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) {
      return;
    }

    const rawFiles = Array.from(files);
    const isHaveOversizedImages = rawFiles.some(
      (rawFile) => rawFile.size > MAXIMUM_IMAGE_SIZE
    );
    const finalFiles = await Promise.all(
      rawFiles.map(
        (rawFile) =>
          new Promise<File>((resolve, reject) => {
            if (rawFile.size <= MAXIMUM_IMAGE_SIZE) {
              resolve(rawFile);
              return;
            }

            const fileReader = new FileReader();
            fileReader.onload = (event) => {
              const img = new Image();
              if (
                !event.target?.result ||
                typeof event.target.result !== 'string'
              ) {
                reject('존재하지 않거나 잘못된 파일입니다.');
                return;
              }
              img.src = event.target.result;
              img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                  reject(
                    '리사이징용 캔버스 컨텍스트 생성에 문제가 발생했습니다.'
                  );
                  return;
                }

                const scaleFactor = Math.min(
                  MAXIMUM_IMAGE_LENGTH_ON_RESIZE / img.width,
                  MAXIMUM_IMAGE_LENGTH_ON_RESIZE / img.height
                );

                canvas.width = img.width * scaleFactor;
                canvas.height = img.height * scaleFactor;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob) => {
                  if (!blob) {
                    reject('리사이징된 이미지 생성 실패');
                    return;
                  }
                  resolve(new File([blob], ''));
                });
              };
            };
            fileReader.readAsDataURL(rawFile);
          })
      )
    );

    const timestamp = new Date().getTime();
    const newImages: ImageListElementValue[] = finalFiles.map(
      (file, index): ImageListElementValue => ({
        tmpId: `${timestamp}-${index}`,
        localFile: file,
      })
    );

    if (isHaveOversizedImages) {
      toast('일부 용량이 큰 이미지를 최적화 처리했습니다.', { type: 'info' });
    }

    onChangeImages(images.concat(newImages));
  }

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      <div className="w-full min-h-46 p-2 retro-rounded-2 flex justify-center items-center flex-wrap gap-4">
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
      <Button type="button" onClick={handleOnClickLoad}>
        이미지 추가하기
      </Button>
    </div>
  );
}
