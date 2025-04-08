import { useMutation } from '@tanstack/react-query';
import { axiosFormDataInstance, axiosInstance } from '@/libs/axios';
import { SignUpResponseType, SignUpType } from '@/types/signup.type';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { ProfileInputType } from '@/types/profile.type';

export const useSignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { mutate: signUp, isPending: isSigning } = useMutation({
    mutationFn: async (payload: Omit<SignUpType, 'confirmPassword'>) =>
      await axiosInstance.post<SignUpResponseType>('/user/sign-up', payload),

    onSuccess: (data) => {
      login({ ...data.data });

      navigate('/sign/profile');
    },
  });
  return { signUp, isSigning };
};

export const useUpdateProfile = () => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (inputData: Omit<ProfileInputType, 'userId'>) => {
      const formData = new FormData();
      formData.append('userId', user?.userId as string);
      formData.append('name', inputData.name);
      formData.append('profileImg', inputData.profileImg);
      const response = await axiosFormDataInstance.patch<Omit<ProfileInputType, 'userId'>>(
        '/user/update-user',
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      setUser({ name: data.name, accessToken: undefined, isInitialized: true });
      navigate('sign/outro');
    },
  });
  return { updateProfile, isPending };
};
