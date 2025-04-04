import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message) {
      return Promise.reject(error.response.data.message);
    }
    return Promise.reject(error.message || '서버 에러가 발생하였습니다.');
  },
);
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
