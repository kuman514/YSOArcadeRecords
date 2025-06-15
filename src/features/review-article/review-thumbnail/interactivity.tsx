'use client';

import { useModalStore } from '^/src/shared/modal/store';
import { ModalType } from '^/src/shared/modal/types';

interface Props {
  originalImageUrls: string[];
}

export default function ReviewThumbnailInteractivity({
  originalImageUrls,
}: Props) {
  const setModal = useModalStore((state) => state.setModal);

  return (
    <button
      type="button"
      className="absolute left-0 top-0 w-full h-full cursor-pointer"
      onClick={() => {
        setModal({
          type: ModalType.IMAGE_VIEWER,
          imageUrls: originalImageUrls,
        });
      }}
    />
  );
}
