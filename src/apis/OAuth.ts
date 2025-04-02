import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/axios';

export const useOAuth = (social: string) => {
  const { mutate: oauth, isPending } = useMutation({
    mutationFn: async (payload: { code: string }) => {
      await axiosInstance.get(`/oauth/${social}/callback?code=${payload.code}`);
    },
  });
  return { oauth, isPending };
};
