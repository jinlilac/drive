import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/axios';
import { useSetSearchParam } from '@/hooks/useSearchParam';
import { useLocation } from 'react-router-dom';

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
  const { get } = useSetSearchParam();
  const { pathname } = useLocation();
  const workSpaceParams = {
    category: get('category'),
    page: Number(get('page')),
  };
  const { mutate: deleteWorkSpace, isPending: isDeleting } = useMutation({
    mutationFn: async (payload: DefaultMutateWorkSpaceType) => await axiosInstance.delete('/drive', { data: payload }),
    onSuccess: () => {
      if (pathname.includes('drive')) {
        queryClient.invalidateQueries({ queryKey: ['workspace', 'list', 'drive', workSpaceParams] });
      } else if (pathname.includes('starred')) {
        queryClient.invalidateQueries({ queryKey: ['workspace', 'list', 'starred', workSpaceParams] });
      }
    },
  });
  return { deleteWorkSpace, isDeleting };
};

export const useRestoreWorkSpace = () => {
  const queryClient = useQueryClient();
  const { get } = useSetSearchParam();
  const workSpaceParams = {
    category: get('category'),
    page: Number(get('page')),
  };
  const { mutate: restoreWorkSpace, isPending: isRestoring } = useMutation({
    mutationFn: async (payload: DefaultMutateWorkSpaceType) => await axiosInstance.patch('/drive/restore', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'list', 'trash', workSpaceParams] });
    },
  });
  return { restoreWorkSpace, isRestoring };
};

export const useDestroyWorkSpace = () => {
  const queryClient = useQueryClient();
  const { get } = useSetSearchParam();
  const workSpaceParams = {
    category: get('category'),
    page: Number(get('page')),
  };
  const { mutate: destroyWorkSpace, isPending: isDestroying } = useMutation({
    mutationFn: async (payload: DefaultMutateWorkSpaceType) =>
      await axiosInstance.delete('/drive/destroy', { data: payload }),
    onSuccess: (data) => {
      console.log('data .....', data);
      queryClient.invalidateQueries({ queryKey: ['workspace', 'list', 'trash', workSpaceParams] });
    },
  });
  return { destroyWorkSpace, isDestroying };
};

export const useUpdateWorkSpace = () => {
  const queryClient = useQueryClient();
  const { get } = useSetSearchParam();
  const { pathname } = useLocation();
  const workSpaceParams = {
    category: get('category'),
    path: get('path'),
    page: Number(get('page')),
  };
  const { mutate: updateWorkSpace, isPending: isUpdating } = useMutation({
    mutationFn: async (payload: UpdateWorkSpaceType) => await axiosInstance.patch('/drive', payload),
    onSuccess: () => {
      if (pathname.includes('drive')) {
        queryClient.invalidateQueries({ queryKey: ['workspace', 'list', 'drive', workSpaceParams] });
      } else if (pathname.includes('starred')) {
        queryClient.invalidateQueries({ queryKey: ['workspace', 'list', 'starred', workSpaceParams] });
      } else if (pathname.includes('trash')) {
        queryClient.invalidateQueries({ queryKey: ['workspace', 'list', 'trash', workSpaceParams] });
      }
    },
  });
  return { updateWorkSpace, isUpdating };
};
