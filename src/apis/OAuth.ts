import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/axios';
import { UserAuthType } from '@/types/auth.type';
import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import useOverlayStore from '@/stores/useOverlayStore';

export const useOAuth = (social: string) => {
  const { setUser, login, user } = useAuthStore();
  const { closeOverlay } = useOverlayStore();
  const navigate = useNavigate();
  const { mutate: oauth, isPending } = useMutation({
    mutationFn: async (payload: { code: string }) => {
      const response = await axiosInstance.get<UserAuthType>(`/oauth/${social}/callback?code=${payload.code}`);
      return response.data;
    },
    onSuccess: (data) => {
      login({ ...data });
      closeOverlay();

      if (!user?.isInitialized) {
        navigate('/sign/profile');
      }
    },
  });

  return { oauth, isPending };
};
