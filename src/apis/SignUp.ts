import { useMutation } from '@tanstack/react-query';
import { axiosFormDataInstance, axiosInstance } from '@/libs/axios';
import { SignUpResponseType, SignUpType } from '@/types/signup.type';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { ProfileInput, ProfileResponseType } from '@/types/profile.type';

export const useSignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { mutate: signUp, isPending: isSigning } = useMutation({
    mutationFn: async (payload: Omit<SignUpType, 'confirmPassword'>) =>
      await axiosInstance.post<SignUpResponseType>('/user/sign-up', payload),

    onSuccess: (data) => {
      setUser({ ...data.data });

      navigate('/sign/profile');
    },
  });
  return { signUp, isSigning };
};

export const useUpdateProfile = () => {
  const { user } = useAuthStore();
  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (inputData: ProfileInput) => {
      const formData = new FormData();
      formData.append('userId', user?.userId as string);
      formData.append('name', inputData.name);
      if (inputData.profileImg) {
        formData.append('profileImg', inputData.profileImg);
      }
      const response = await axiosFormDataInstance.patch<ProfileResponseType>('/user/update-user', formData);
      return response.data;
    },
    onSuccess: (data) => {
      // setUser({ name: data.name, profileImg: data.profileImg as string, accessToken: undefined, isInitialized: true });
    },
  });
  return { updateProfile, isPending };
};
