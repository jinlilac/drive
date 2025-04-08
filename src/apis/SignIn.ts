import { axiosInstance } from '@/libs/axios';
import { useAuthStore } from '@/stores/useAuthStore';
import { UserAuthType } from '@/types/auth.type';
import { SignInEmailType } from '@/types/signin.type';
import { useMutation } from '@tanstack/react-query';

export const signIn = async ({ email, password }: SignInEmailType) =>
  axiosInstance.post<UserAuthType>('/user/sign-in', {
    email,
    password,
  });

export const useSignInEmail = () => {
  const { mutate: signInEmail, isPending } = useMutation({
    mutationFn: (payload: SignInEmailType) => signIn(payload),
    onSuccess: (data) => {
      useAuthStore.setState({
        isLoggedIn: true,
        user: data.data,
      });
    },
  });
  return { signInEmail, isPending };
};
