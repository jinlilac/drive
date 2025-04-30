import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/axios';

type DefaultMutateWorkSpaceType = {
  ids: string[];
};

type UpdateWorkSpaceType = DefaultMutateWorkSpaceType & {
  isStarred?: boolean[];
  parentId?: string[];
  name?: string[];
};

export const useDeleteWorkSpace = () => {
  const { mutate: deleteWorkSpace, isPending: isDeleting } = useMutation({
    mutationFn: async (payload: DefaultMutateWorkSpaceType) => {
      axiosInstance.delete('/drive', { data: payload });
    },
  });
  return { deleteWorkSpace, isDeleting };
};

export const useRestoreWorkSpace = () => {
  const { mutate: restoreWorkSpace, isPending: isRestoring } = useMutation({
    mutationFn: async (payload: DefaultMutateWorkSpaceType) => {
      axiosInstance.patch('/drive/restore', { data: payload });
    },
  });
  return { restoreWorkSpace, isRestoring };
};

export const useDestroyWorkSpace = () => {
  const { mutate: destroyWorkSpace, isPending: isDestroying } = useMutation({
    mutationFn: async (payload: DefaultMutateWorkSpaceType) => {
      axiosInstance.delete('/drive/destroy', { data: payload });
    },
  });
  return { destroyWorkSpace, isDestroying };
};

export const useUpdateWorkSpace = () => {
  const { mutate: updateWorkSpace, isPending: isUpdating } = useMutation({
    mutationFn: async (payload: UpdateWorkSpaceType) => {
      axiosInstance.patch('/drive', { data: payload });
    },
  });
  return { updateWorkSpace, isUpdating };
};
