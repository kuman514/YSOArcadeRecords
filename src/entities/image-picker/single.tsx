'use client';

import NextImage from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import {
  MAXIMUM_IMAGE_LENGTH_ON_RESIZE,
  MAXIMUM_IMAGE_SIZE,
} from './constants';

interface Props {
  name: string;
  remoteImageUrl?: string;
  currentFile: File | null;
  onSelectFile: (newFile: File) => void;
}

export default function SingleImagePicker({
  name,
  remoteImageUrl,
  currentFile,
  onSelectFile,
}: Props) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    remoteImageUrl ?? null
  );

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

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > MAXIMUM_IMAGE_SIZE) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const img = new Image();
        if (!event.target?.result || typeof event.target.result !== 'string') {
          toast(`${file.name} 파일은 존재하지 않거나 잘못되었습니다.`, {
            type: 'error',
          });
          return;
        }
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            toast(
              `${file.name} 파일 리사이징에 쓰일 캔버스 컨텍스트 생성에 문제가 발생했습니다.`,
              {
                type: 'error',
              }
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
              toast(
                `${file.name} 파일을 리사이징한 이미지 생성에 실패했습니다.`,
                { type: 'error' }
              );
              return;
            }
            onSelectFile(new File([blob], ''));
            toast(`용량이 큰 ${file.name} 파일을 최적화 처리했습니다.`, {
              type: 'info',
            });
          });
        };
      };
      fileReader.readAsDataURL(file);
    } else {
      onSelectFile(file);
    }
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <label
        htmlFor={name}
        className="cursor-pointer w-full aspect-square retro-rounded relative flex justify-center items-center overflow-hidden"
      >
        {imageUrl ? (
          <NextImage
            className="object-contain"
            src={imageUrl}
            alt="유저 선택 이미지"
            fill
            unoptimized
          />
        ) : (
          <span>클릭하여 등록하기</span>
        )}
      </label>
      <input
        className="hidden"
        ref={imageInputRef}
        type="file"
        id={name}
        accept="image/png, image/jpeg"
        name={name}
        onChange={handleOnChange}
      />
    </div>
  );
}
