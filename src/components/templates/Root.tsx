import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Root() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  if (user?.userId) navigate('/workspace/drive');
  else navigate('/sign/in');
  return null;
}
