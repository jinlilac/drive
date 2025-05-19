import { useSetSearchParam } from '@/hooks/useSearchParam';
import { axiosFormDataInstance, axiosInstance } from '@/libs/axios';
import { useAuthStore } from '@/stores/useAuthStore';
import { GetDrivePayloadType, UploadFileResponseType } from '@/types/drive.type';
import { FileSystemAllResponseType, FileSystemListResponseType } from '@/types/workspace.type';
import { infiniteQueryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUploadFile = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { get } = useSetSearchParam();
  const workSpaceParams = {
    category: get('category'),
    path: get('path'),
    page: Number(get('page')),
  };
  const { mutate: uploadFiles, isPending: isUploading } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosFormDataInstance.post<UploadFileResponseType[]>('/drive/file', formData, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['workspace', 'list', 'drive', workSpaceParams] });
    },
  });
  return { uploadFiles, isUploading };
};

export const useGetDrive = (workSpaceParams: GetDrivePayloadType & { path?: string; search?: string }) => {
  const isSignIn = !!localStorage.getItem('auth-store');

  return infiniteQueryOptions({
    queryKey: ['workspace', 'list', 'drive', workSpaceParams],
    queryFn: async ({ pageParam }) => {
      try {
        if (workSpaceParams.category === 'all') {
          const params = workSpaceParams.search ? { search: workSpaceParams.search } : { path: workSpaceParams.path };
          return await axiosInstance.get<FileSystemAllResponseType>(
            `/drive/${workSpaceParams.search ? 'search-' : ''}all`,
            {
              params,
            },
          );
        }
        const filterParams = Object.fromEntries(
          Object.entries(workSpaceParams).filter(([_, v]) => v !== undefined && v !== null),
        );
        // page는 항상 pageParam으로 덮어쓰기
        const params = { ...filterParams, page: pageParam };
        return await axiosInstance.get<FileSystemListResponseType>(`/drive${workSpaceParams.search ? '/search' : ''}`, {
          params,
        });
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 400) return { data: { count: -1 } };
          if (e.response?.status === 404) return { data: { count: -2 } };
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
  const { get } = useSetSearchParam();
  const workSpaceParams = {
    category: get('category'),
    path: get('path'),
    page: Number(get('page')),
  };
  const { mutate: addFolder, isPending } = useMutation({
    mutationFn: async (payload: { name: string }) => {
      const response = await axiosInstance.post('/drive/folder', {
        name: payload.name,
        parentId: user?.currentId,
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['workspace', 'list', 'drive', workSpaceParams] });
    },
  });
  return { addFolder, isPending };
};
