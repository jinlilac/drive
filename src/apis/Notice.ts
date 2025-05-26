import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/axios';
import { AxiosError } from 'axios';
import { NoticeDetail, NoticeListResponseType } from '@/types/notice.type';

// 공지사항 무한 스크롤 훅
export const useGetNotices = (page: number) => {
  const isSignIn = !!localStorage.getItem('auth-store');

  return infiniteQueryOptions({
    queryKey: ['mypage', 'notice', 'list', page],
    queryFn: async () => {
      try {
        // page 파라미터만 전달
        return await axiosInstance.get<NoticeListResponseType>('/notice', {
          params: { page },
        });
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 400) {
          return { data: { count: -1, data: [] } }; // count와 notices 필드는 응답 구조에 맞게 수정
        }
        throw e;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam, _allPageParams) => {
      // lastPage.data.count: 전체 공지사항 개수
      // lastPageParam: 현재 페이지 번호
      // 30: 한 페이지당 불러오는 공지사항 개수(백엔드에 맞게 수정)
      if ('count' in lastPage.data) {
        return lastPage.data.count - lastPageParam * 30 > 0 ? lastPageParam + 1 : undefined;
      }
      return undefined;
    },
    enabled: isSignIn,
  });
};

export const useGetNoticeDetail = (noticeId: number) =>
  queryOptions({
    queryKey: ['mypage', 'notice', noticeId],
    queryFn: () => axiosInstance.get<NoticeDetail>(`/notice/${noticeId}`),
  });
