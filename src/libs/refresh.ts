import { UserAuthType } from '@/types/auth.type';
import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';
import { router } from '@/Router';

const refreshTokenFn = async (user: UserAuthType) => {
  try {
    if (user.social !== null && user.social !== undefined) {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/refresh`,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      // 새로운 토큰 저장
      const { accessToken: newAccessToken, accessTokenExpiresAt: newExpiresAt } = data;
      user.accessToken = newAccessToken;
      user.accessTokenExpiresAt = newExpiresAt;
      useAuthStore.setState((prev) => ({ ...prev, user }));
    }
  } catch (error) {
    const refreshTokenError = error as AxiosError;
    if (refreshTokenError?.response?.status === 401) {
      localStorage.removeItem('auth-store');
      await router.navigate('/sign/in');
    }
  }
};

export const RefreshManager = {
  currentPromise: null as Promise<void> | null, // 현재 Promise를 저장

  // Promise 실행
  async execute(user: UserAuthType): Promise<void> {
    if (!this.currentPromise) {
      this.currentPromise = refreshTokenFn(user).finally(() => {
        this.currentPromise = null; // 작업 완료 후 초기화
      });
    }
    return this.currentPromise;
  },
};
