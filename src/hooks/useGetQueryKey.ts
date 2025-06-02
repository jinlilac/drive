import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useGetQueryKey = () => {
  const location = useLocation();
  const [queryKey, setQueryKey] = useState<string[]>([]);
  useEffect(() => {
    const pathname = location.pathname.split('/').slice(1);
    const search = Object.fromEntries(
      location.search
        .slice(1)
        .split('&')
        .map((item) => item.split('='))
        .filter((v) => v[0] !== 'name'),
    );
    setQueryKey([...pathname, search]);
  }, [location]);
  return queryKey;
};
