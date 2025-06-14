export enum ModalType {
  OFF = 'off',
  IMAGE_VIEWER = 'image-viewer',
  SIDEBAR = 'sidebar',
}

export interface OffModalState {
  type: ModalType.OFF;
}

export interface ImageViewerModalState {
  type: ModalType.IMAGE_VIEWER;
  imageUrls: string[];
}

export interface SidebarModalState {
  type: ModalType.SIDEBAR;
}

export type ModalState =
  | OffModalState
  | ImageViewerModalState
  | SidebarModalState;

export interface ModalActions {
  setModal: (newModalState: ModalState) => void;
}

export type ModalStore = ModalState & ModalActions;
