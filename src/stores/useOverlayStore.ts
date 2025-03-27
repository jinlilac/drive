// useOverlayStore.ts

import { create } from 'zustand';

type OverlayState = {
  isOpen: boolean;
};

type OverlayStore = OverlayState & {
  openOverlay: () => void;
  closeOverlay: () => void;
};

const useOverlayStore = create<OverlayStore>()((set) => ({
  isOpen: false,

  openOverlay: () => set({ isOpen: true }),
  closeOverlay: () => set({ isOpen: false }),
}));

export default useOverlayStore;
