import { UserAuthType } from '@/types/auth.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStoreType = {
  user: UserAuthType | null;
  isLoggedIn: boolean;
  login: (user: UserAuthType) => void;
  logout: () => void;
  // setUser: (user: UserAuthType) => void;
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
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
