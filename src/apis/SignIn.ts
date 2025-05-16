import { axiosInstance } from '@/libs/axios';
import { useAuthStore } from '@/stores/useAuthStore';
import { UserAuthType } from '@/types/auth.type';
import { SignInEmailType } from '@/types/signin.type';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const signIn = async ({ email, password }: SignInEmailType) =>
  axiosInstance.post<UserAuthType>('/user/sign-in', {
    email,
    password,
  });

export const useSignInEmail = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { mutate: signInEmail, isPending } = useMutation({
    mutationFn: (payload: SignInEmailType) => signIn(payload),
    onSuccess: (data) => {
      setUser({ ...data.data, currentId: data.data.rootFolder, currentFolderName: '내 드라이브' });
      navigate('/workspace/work-sheet');
    },
  });
  return { signInEmail, isPending };
};
