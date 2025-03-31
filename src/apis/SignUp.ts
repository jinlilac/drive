import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/axios';
import { SignUpType } from '@/types/signup.type';

export const useSignUp = () => {
  const { mutate: signUp, isPending: isSigning } = useMutation({
    mutationFn: async (payload: Omit<SignUpType, 'confirmPassword'>) => {
      await axiosInstance.post('/user/sign-up', payload);
    },
  });
  return { signUp, isSigning };
};
