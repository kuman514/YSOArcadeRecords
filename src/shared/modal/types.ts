export enum ModalType {
  OFF = 'off',
  IMAGE_VIEWER = 'image-viewer',
}

export interface OffModalState {
  type: ModalType.OFF;
}

export interface ImageViewerModalState {
  type: ModalType.IMAGE_VIEWER;
  imageUrls: string[];
}

export type ModalState = OffModalState | ImageViewerModalState;

export interface ModalActions {
  setModal: (newModalState: ModalState) => void;
}

export type ModalStore = ModalState & ModalActions;
