import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/axios';
import { VerificationEmailType } from '@/types/signup.type';

export const useCheckVerificationEmail = () => {
  const { mutate: checkVerificationEmail, isPending: isCheckVerificationEmail } = useMutation({
    mutationFn: async (payload: VerificationEmailType) => {
      await axiosInstance.post('/user/check-verification-email', payload);
    },
  });
  return { checkVerificationEmail, isCheckVerificationEmail };
};
