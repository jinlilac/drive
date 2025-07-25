import { useGetQueryKey } from '@/hooks/useGetQueryKey';
import { axiosFormDataInstance, axiosInstance } from '@/libs/axios';
import { useAuthStore } from '@/stores/useAuthStore';
import { UserAuthType } from '@/types/auth.type';
import { GetDrivePayloadType, UploadFileResponseType } from '@/types/drive.type';
import { FileSystemAllResponseType, FileSystemListResponseType } from '@/types/workspace.type';
import { infiniteQueryOptions, queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const useUploadFile = () => {
  const { user } = useAuthStore();
  const queryKey = useGetQueryKey();
  const queryClient = useQueryClient();
  const { mutate: uploadFiles, isPending: isUploading } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosFormDataInstance.post<
        { result: UploadFileResponseType[] } & Pick<UserAuthType, 'storageLimit' | 'storageUsed'>
      >('/drive/file', formData, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });
  return { uploadFiles, isUploading };
};
export const useGetDrive = <T extends FileSystemAllResponseType | FileSystemListResponseType>(
  workSpaceParams: GetDrivePayloadType & { path?: string; search?: string; ignoreQueryKey?: boolean },
) => {
  const isSignIn = !!localStorage.getItem('auth-store');
  const queryKey = useGetQueryKey();
  const { ignoreQueryKey, ...workSpaceParamsValue } = workSpaceParams;

  return infiniteQueryOptions({
    queryKey: ignoreQueryKey ? ['workspace', 'drive', workSpaceParamsValue] : queryKey,
    queryFn: async ({ pageParam }): Promise<AxiosResponse<T>> => {
      try {
        if (workSpaceParamsValue.category === 'all') {
          const params = workSpaceParamsValue.search
            ? { search: workSpaceParamsValue.search }
            : { path: workSpaceParamsValue.path };
          return (await axiosInstance.get<FileSystemAllResponseType>(
            `/drive/${workSpaceParamsValue.search ? 'search-' : ''}all`,
            {
              params,
            },
          )) as AxiosResponse<T>;
        }
        const filterParams = Object.fromEntries(
          Object.entries(workSpaceParamsValue).filter(([_, v]) => v !== undefined && v !== null),
        );
        // page는 항상 pageParam으로 덮어쓰기
        const params = { ...filterParams, page: pageParam };
        return (await axiosInstance.get<FileSystemListResponseType>(
          `/drive${workSpaceParamsValue.search ? '/search' : ''}`,
          {
            params,
          },
        )) as AxiosResponse<T>;
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 400) return { data: { count: -1 } } as AxiosResponse<T>;
          if (e.response?.status === 404) return { data: { count: -2 } } as AxiosResponse<T>;
        }
        throw e;
      }
    },
    retry: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam, _allPageParams) => {
      if ('count' in lastPage.data) {
        return lastPage.data.count - lastPageParam * 30 > 0 ? lastPageParam + 1 : undefined;
      }
      return undefined;
    },
    enabled: isSignIn,
  });
};

export const usePostFolder = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const queryKey = useGetQueryKey();
  const { mutate: addFolder, isPending } = useMutation({
    mutationFn: async (payload: { name: string }) => {
      const response = await axiosInstance.post('/drive/folder', {
        name: payload.name,
        parentId: user?.currentId,
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });
  return { addFolder, isPending };
};

export const useDownLoad = (fileSystemId: string, enabled: boolean) => {
  return queryOptions({
    queryKey: ['download', fileSystemId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/drive/download/${fileSystemId}`);
      return response.data;
    },
    enabled: enabled && !!fileSystemId,
  });
};

// 다운로드 상태 폴링 (jobId로 상태 확인)
export const useDownloadStatus = (jobId: string, enabled = false) => {
  return queryOptions({
    queryKey: ['downloadStatus', jobId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/drive/status/${jobId}`);
      return response.data;
    },
    enabled: enabled && !!jobId,
    refetchInterval: 2000, // 진행중이면 2초마다 폴링
  });
};
