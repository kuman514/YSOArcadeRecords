export enum ModalType {
  OFF = 'off',
  IMAGE_VIEWER = 'image-viewer',
  LOADING_BLOCK = 'loading-block',
}

export interface OffModalState {
  type: ModalType.OFF;
}

export interface ImageViewerModalState {
  type: ModalType.IMAGE_VIEWER;
  imageUrls: string[];
}

export interface LoadingBlockModalState {
  type: ModalType.LOADING_BLOCK;
}

export type ModalState =
  | OffModalState
  | ImageViewerModalState
  | LoadingBlockModalState;

export interface ModalActions {
  setModal: (newModalState: ModalState) => void;
}

export type ModalStore = ModalState & ModalActions;
