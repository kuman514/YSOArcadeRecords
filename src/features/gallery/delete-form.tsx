'use client';

import { useActionState, useEffect } from 'react';

import { GalleryPost } from '^/src/entities/types/post';
import { useModalStore } from '^/src/shared/modal/store';
import { ModalType } from '^/src/shared/modal/types';

import { deleteGalleryAction } from './delete-gallery-action';

interface Props {
  galleryId: GalleryPost['galleryId'];
}

export default function DeleteGalleryForm({ galleryId }: Props) {
  const [, formAction, isLoading] = useActionState(deleteGalleryAction, null);
  const setModal = useModalStore((state) => state.setModal);

  useEffect(() => {
    if (isLoading) {
      setModal({
        type: ModalType.LOADING_BLOCK,
      });
    } else {
      setModal({
        type: ModalType.OFF,
      });
    }

    return () => {
      setModal({
        type: ModalType.OFF,
      });
    };
  }, [isLoading, setModal]);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!confirm('삭제하시겠습니까?')) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" id="galleryId" name="galleryId" value={galleryId} />
      <button
        className="px-4 py-2 bg-red-500 hover:bg-red-300 disabled:bg-gray-300 text-white rounded-sm cursor-pointer disabled:cursor-auto"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? '삭제 중' : '삭제하기'}
      </button>
    </form>
  );
}
