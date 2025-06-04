import { RefreshManager } from '@/libs/refresh';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { router } from '@/Router';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const axiosFormDataInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true,
});

axiosFormDataInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message) {
      return Promise.reject(error.response.data.message);
    }
    return Promise.reject(error.message || '서버 에러가 발생하였습니다.');
  },
);

const interceptorRequest = (config: InternalAxiosRequestConfig) => {
  const userLocal = JSON.parse(localStorage.getItem('auth-store') ?? '{}');
  const newConfig = config;
  if (userLocal.state?.user?.accessToken) {
    newConfig.headers.Authorization = `Bearer ${userLocal.state.user.accessToken}`;
  }
  return newConfig;
};
axiosFormDataInstance.interceptors.request.use(interceptorRequest, (error) => Promise.reject(error));

axiosInstance.interceptors.request.use(interceptorRequest, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const userLocal = JSON.parse(localStorage.getItem('auth-store') ?? '{}');
    if (!userLocal.state?.user?.userId) {
      return Promise.reject(error);
    }
    const user = userLocal.state.user;
    const status = error.response?.status;
    if (status === 401 || status === 400) {
      const originalRequest = error.config;
      try {
        await RefreshManager.execute(user); // RefreshManager 사용
        if (originalRequest) {
          const newAccessToken = user.accessToken; // 업데이트된 토큰 사용
          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers.social = user.social;
            return axios(originalRequest); // 원래 요청을 재시도
          }
        }
        return null;
      } catch (refreshError) {
        await router.navigate('/sign/in');
      }
    }
    return Promise.reject(error);
  },
);
