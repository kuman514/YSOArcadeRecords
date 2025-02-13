'use client';

import { create } from 'zustand';

import { ModalState, ModalStore, ModalType } from './types';

const initState: ModalState = {
  type: ModalType.OFF,
};

export const useModalStore = create<ModalStore>((set) => ({
  ...initState,
  setModal: (newModalState) =>
    set(() => ({
      ...newModalState,
    })),
}));
