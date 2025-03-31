import { useMutation } from '@tanstack/react-query';
import { RequestEmailVerificationType } from '@/types/signup.type';
import { axiosInstance } from '@/libs/axios';

export const useEmailVerification = () => {
  const { mutate: emailVerification, isPending: isVerifying } = useMutation({
    mutationFn: async (payload: RequestEmailVerificationType) =>
      await axiosInstance.post('/user/email-verification', payload),
  });
  return { emailVerification, isVerifying };
};
