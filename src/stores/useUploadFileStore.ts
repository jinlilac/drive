// useOverlayStore.ts

import { create } from 'zustand';

type UploadFileState = {
  isOpenUploadFile: boolean;
};

type UploadFileStore = UploadFileState & {
  openUploadFile: () => void;
  closeUploadFile: () => void;
};

const useUploadFileStore = create<UploadFileStore>()((set) => ({
  isOpenUploadFile: false,

  openUploadFile: () => set({ isOpenUploadFile: true }),
  closeUploadFile: () => set({ isOpenUploadFile: false }),
}));

export default useUploadFileStore;
