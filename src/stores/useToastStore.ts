import { create } from 'zustand';
import { ReactNode } from 'react';

type ToastState = {
  active: boolean;
  text: ReactNode | null;
  center?: boolean;
  bottomLocation?: number;
  button?: ReactNode | null;
  timeoutId?: NodeJS.Timeout | null;
};

type ToastActions = {
  showToast: (options: Omit<ToastState, 'active' | 'timeoutId'>) => void;
  resetToast: () => void;
};

const useToastStore = create<ToastState & ToastActions>((set, get) => ({
  active: false,
  text: null,
  center: false,
  bottomLocation: 16,
  button: true,
  timeoutId: null,

  showToast: (options) => {
    // Clear existing timeout
    if (get().timeoutId) {
      clearTimeout(get().timeoutId!);
    }

    // Set new timeout
    const newTimeoutId = setTimeout(() => {
      get().resetToast();
    }, 5000);

    // Update state
    set({
      active: true,
      ...options,
      bottomLocation: options.bottomLocation ?? 16,
      timeoutId: newTimeoutId,
    });
  },

  resetToast: () => {
    if (get().timeoutId) {
      clearTimeout(get().timeoutId!);
    }
    set({
      active: false,
      text: null,
      center: false,
      bottomLocation: 16,
      button: true,
      timeoutId: null,
    });
  },
}));

// 사용 예시
// useToastStore.getState().showToast({ text: '메시지', center: true });
// useToastStore.getState().resetToast();

export default useToastStore;
