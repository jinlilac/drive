import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { RefreshManager } from '@/libs/refresh';
import { UserAuthType } from '@/types/auth.type';

export default function Root() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (typeof user?.userId === 'string') {
        await RefreshManager.execute(user as UserAuthType);
        navigate('/workspace/drive');
      } else navigate('/sign/in');
    })();
  }, [navigate, user]);
  return null;
}
