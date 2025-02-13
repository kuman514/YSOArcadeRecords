'use client';

import { useModalStore } from '^/src/entities/modal/store';
import { ModalType } from '^/src/entities/modal/types';

interface Props {
  originalImageUrls: string[];
}

export default function ArcadeRecordThumbnailInteractivity({
  originalImageUrls,
}: Props) {
  const setModal = useModalStore((state) => state.setModal);

  return (
    <button
      type="button"
      className="absolute left-0 top-0 w-full h-full"
      onClick={() => {
        setModal({
          type: ModalType.IMAGE_VIEWER,
          imageUrls: originalImageUrls,
        });
      }}
    />
  );
}
