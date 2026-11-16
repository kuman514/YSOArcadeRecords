export enum ModalType {
  OFF = 'off',
  IMAGE_VIEWER = 'image-viewer',
  LOADING_BLOCK = 'loading-block',
  IMAGE_EDITOR = 'image-editor',
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

export interface ImageEditorModalState {
  type: ModalType.IMAGE_EDITOR;
  imageUrl: string;
  onSave: (editedImage: File) => void;
}

export type ModalState =
  | OffModalState
  | ImageViewerModalState
  | LoadingBlockModalState
  | ImageEditorModalState;

export interface ModalActions {
  setModal: (newModalState: ModalState) => void;
}

export type ModalStore = ModalState & ModalActions;
