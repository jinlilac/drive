import { axiosInstance } from '@/libs/axios';
import { useAuthStore } from '@/stores/useAuthStore';
import { DrivePatchPayloadType } from '@/types/file.type';
import { WorkSheetListType, WorkSheetResponseType } from '@/types/worksheet.type';
import { infiniteQueryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGetQueryKey } from '@/hooks/useGetQueryKey';

export const useGetWorkSheet = (filters: WorkSheetListType) => {
  const isSignIn = !!localStorage.getItem('auth-store');
  const { user } = useAuthStore();
  const queryKey = useGetQueryKey();

  return infiniteQueryOptions({
    queryKey,
    queryFn: async ({ pageParam }) => {
      try {
        const filterParams = Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null),
        );
        // page는 항상 pageParam으로 덮어쓰기
        const params = { ...filterParams, page: pageParam };
        return await axiosInstance.get<WorkSheetResponseType>('/drive/worksheet', {
          params,
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 400) return { data: { count: -1 } };
        throw e;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam, _allPageParams) =>
      lastPage.data.count - lastPageParam * 30 > 0 ? lastPageParam + 1 : undefined,
    enabled: isSignIn,
  });
};

export const usePatchWorkSheet = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const queryKey = useGetQueryKey();
  const { user } = useAuthStore();

  const { mutate: patchWorkSheet, isPending } = useMutation({
    mutationFn: async (payload: DrivePatchPayloadType) =>
      axiosInstance.patch('/drive', payload, { headers: { Authorization: `Bearer ${user?.accessToken}` } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey }).then(() => navigate('/workspace/work-sheet'));
    },
  });
  return { patchWorkSheet, isPending };
};
