import { useLocation } from 'react-router-dom';

export const useGetQueryKey = () => {
  const location = useLocation();
  const pathname = location.pathname.split('/').slice(1);
  const search = Object.fromEntries(
    location.search
      .slice(1)
      .split('&')
      .map((item) => item.split('='))
      .filter((v) => v[0] !== 'name'),
  );
  return [...pathname, search];
};
