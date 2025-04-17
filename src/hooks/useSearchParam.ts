import { useSearchParams } from 'react-router-dom';

export const useSetSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const get = (target: string) => {
    return searchParams.get(target);
  };
  const add = (add: [string, string[] | string][]) => {
    const newParams = new URLSearchParams(searchParams.toString());
    add.forEach(([key, value]) => {
      newParams.set(key, value instanceof Array ? JSON.stringify(value) : value);
    });
    setSearchParams(newParams);
  };
  const remove = (remove: string[]) => {
    const newParams = new URLSearchParams(searchParams.toString());
    remove.forEach((key) => {
      newParams.delete(key);
    });
    setSearchParams(newParams);
  };
  return { get, add, remove };
};
