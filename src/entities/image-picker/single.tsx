'use client';

import NextImage from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useShallow } from 'zustand/shallow';

import { useModalStore } from '^/src/shared/modal/store';
import { ModalType } from '^/src/shared/modal/types';
import Button from '^/src/shared/ui/button';

import {
  MAXIMUM_IMAGE_LENGTH_ON_RESIZE,
  MAXIMUM_IMAGE_SIZE,
} from './constants';

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

  const setModal = useModalStore(useShallow((state) => state.setModal));

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

    if (file.size > MAXIMUM_IMAGE_SIZE) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const img = new Image();
        if (!event.target?.result || typeof event.target.result !== 'string') {
          toast('존재하지 않거나 잘못된 파일입니다.', { type: 'error' });
          return;
        }
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            toast('리사이징용 캔버스 컨텍스트 생성에 문제가 발생했습니다.', {
              type: 'error',
            });
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
              toast('리사이징된 이미지 생성 실패', { type: 'error' });
              return;
            }
            onSelectFile(new File([blob], ''));
            toast('용량이 큰 이미지를 최적화 처리했습니다.', { type: 'info' });
          });
        };
      };
      fileReader.readAsDataURL(file);
    } else {
      onSelectFile(file);
    }
  }

  return (
    <div className="w-40 flex flex-col gap-2">
      <div
        className="w-40 h-40 retro-rounded relative flex justify-center items-center overflow-hidden"
        style={{
          borderRadius: 0,
        }}
      >
        {imageUrl ? (
          <NextImage
            className="cursor-pointer"
            onClick={() => {
              setModal({
                type: ModalType.IMAGE_VIEWER,
                imageUrls: [imageUrl],
              });
            }}
            src={imageUrl}
            alt="유저 선택 이미지"
            fill
            unoptimized
          />
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
      <Button type="button" onClick={handleOnClickLoad}>
        이미지 불러오기
      </Button>
    </div>
  );
}
