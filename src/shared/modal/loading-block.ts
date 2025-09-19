import { useEffect } from 'react';

import { useModalStore } from './store';
import { ModalType } from './types';

export function useLoadingBlockModal(isLoading: boolean) {
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
}
