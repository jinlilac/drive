import { infiniteQueryOptions } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/axios';
import { AxiosError } from 'axios';
import { FileSystemAllResponseType, FileSystemListResponseType } from '@/types/workspace.type';
import { GetDrivePayloadType } from '@/types/drive.type';
import { useGetQueryKey } from '@/hooks/useGetQueryKey';

export const useGetStarred = (workSpaceParams: GetDrivePayloadType) => {
  const isSignIn = !!localStorage.getItem('auth-store');
  const queryKey = useGetQueryKey();

  return infiniteQueryOptions({
    queryKey,
    queryFn: async ({ pageParam }) => {
      try {
        if (workSpaceParams.category === 'all')
          return await axiosInstance.get<FileSystemAllResponseType>('/drive/starred-all?target=starred');
        const filterParams = Object.fromEntries(
          Object.entries(workSpaceParams).filter(([_, v]) => v !== undefined && v !== null),
        );
        // page는 항상 pageParam으로 덮어쓰기
        const params = { ...filterParams, page: pageParam };
        return await axiosInstance.get<FileSystemListResponseType>('/drive/starred', {
          params,
        });
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 400) return { data: { count: -1 } };
        throw e;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam, _allPageParams) => {
      if ('count' in lastPage.data) return lastPage.data.count - lastPageParam * 30 > 0 ? lastPageParam + 1 : undefined;
      return undefined;
    },
    enabled: isSignIn,
  });
};
