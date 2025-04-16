'use client';

import { useRef } from 'react';

import ImageListElement from './element';
import { ImageListElementValue } from './types';

interface Props {
  images: ImageListElementValue[];
  onChangeImages: (newImages: ImageListElementValue[]) => void;
}

export default function ImageList({ images, onChangeImages }: Props) {
  const draggedItemRef = useRef<HTMLDivElement>(null);

  function handleOnChange(index: number, spliceOnIndex: number) {
    const newImages = Array.from(images);

    newImages.splice(spliceOnIndex, 0, newImages[index]);
    if (index >= spliceOnIndex) {
      newImages.splice(index + 1, 1);
    } else {
      newImages.splice(index, 1);
    }

    onChangeImages(newImages);
  }

  function handleOnClickDelete(index: number) {
    const newImages = Array.from(images);
    newImages.splice(index, 1);
    onChangeImages(newImages);
  }

  return (
    <div
      className="w-full min-h-40 border border-primary rounded flex justify-center items-center flex-wrap gap-4"
      onDragStart={(event) => {
        if (!(event.target instanceof HTMLDivElement)) {
          return;
        }
        draggedItemRef.current = event.target;
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();

        if (
          !(event.target instanceof HTMLDivElement) ||
          !draggedItemRef.current
        ) {
          return;
        }

        const [, targetId, direction] = event.target.id.split('_');
        const [, draggedItemId] = draggedItemRef.current.id.split('_');

        const draggedItemIndex = images.findIndex(
          (image) => draggedItemId === image.tmpId
        );
        const primaryTargetIndex = images.findIndex(
          (image) => targetId === image.tmpId
        );

        if (draggedItemIndex === -1 || primaryTargetIndex === -1) {
          return;
        }

        const finalTargetIndex =
          direction === 'right' ? primaryTargetIndex + 1 : primaryTargetIndex;

        handleOnChange(draggedItemIndex, finalTargetIndex);
      }}
    >
      {images.map((image, index) => (
        <ImageListElement
          key={image.tmpId}
          elementInfo={image}
          onClickDelete={() => {
            handleOnClickDelete(index);
          }}
        />
      ))}
    </div>
  );
}
