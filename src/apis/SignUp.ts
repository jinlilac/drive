import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/axios';
import { SignUpType } from '@/types/signup.type';
import { useNavigate } from 'react-router-dom';

export const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate: signUp, isPending: isSigning } = useMutation({
    mutationFn: async (payload: Omit<SignUpType, 'confirmPassword'>) => {
      await axiosInstance.post('/user/sign-up', payload);
    },
    onSuccess: () => {
      navigate('/sign/profile');
    },
  });
  return { signUp, isSigning };
};
