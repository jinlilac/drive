import { UserAuthType } from '@/types/auth.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStoreType = {
  user: Partial<UserAuthType> | null;
  isLoggedIn: boolean;
  login: (user: Partial<UserAuthType>) => void;
  logout: () => void;
  setUser: (user: Partial<UserAuthType>) => void;
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) =>
        set((state) => ({
          user: { ...state.user, ...user }, // 이전 상태와 병합
        })),
      isLoggedIn: false,
      login: (user) => set({ user, isLoggedIn: true }),
      logout: () =>
        set({
          isLoggedIn: false,
          user: null,
        }),
    }),
    { name: 'auth-store' },
  ),
);
