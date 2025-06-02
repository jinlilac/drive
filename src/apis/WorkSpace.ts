import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/axios';
import { useGetQueryKey } from '@/hooks/useGetQueryKey';

type DefaultMutateWorkSpaceType = {
  ids: string[];
};

type UpdateWorkSpaceType = {
  id: string[];
  isStarred?: boolean;
  parentId?: string;
  name?: string;
  currentId?: string;
};

export const useDeleteWorkSpace = () => {
  const queryClient = useQueryClient();
  const queryKey = useGetQueryKey();
  const { mutate: deleteWorkSpace, isPending: isDeleting } = useMutation({
    mutationFn: async (payload: DefaultMutateWorkSpaceType) => await axiosInstance.delete('/drive', { data: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return { deleteWorkSpace, isDeleting };
};

export const useRestoreWorkSpace = () => {
  const queryClient = useQueryClient();
  const queryKey = useGetQueryKey();
  const { mutate: restoreWorkSpace, isPending: isRestoring } = useMutation({
    mutationFn: async (payload: DefaultMutateWorkSpaceType & { isUndo?: boolean }) =>
      await axiosInstance.patch('/drive/restore', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return { restoreWorkSpace, isRestoring };
};

export const useDestroyWorkSpace = () => {
  const queryClient = useQueryClient();
  const queryKey = useGetQueryKey();

  const { mutate: destroyWorkSpace, isPending: isDestroying } = useMutation({
    mutationFn: async (payload: DefaultMutateWorkSpaceType) =>
      await axiosInstance.delete('/drive/destroy', { data: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return { destroyWorkSpace, isDestroying };
};

export const useUpdateWorkSpace = () => {
  const queryClient = useQueryClient();
  const queryKey = useGetQueryKey();
  const { mutate: updateWorkSpace, isPending: isUpdating } = useMutation({
    mutationFn: async (payload: UpdateWorkSpaceType) => await axiosInstance.patch('/drive', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return { updateWorkSpace, isUpdating };
};
