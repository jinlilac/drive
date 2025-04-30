import { STARRED_MORE_ITEMS, TRASH_MORE_ITEMS } from '@/constants/workspace';
import { MORE_ITEMS } from '@/constants/worksheet';
import { useLocation } from 'react-router-dom';

const useGetMoreItems = () => {
  const { pathname } = useLocation();

  let MORE_ITEMS_TARGET;
  if (pathname.includes('trash')) MORE_ITEMS_TARGET = TRASH_MORE_ITEMS;
  else if (pathname.includes('starred')) MORE_ITEMS_TARGET = STARRED_MORE_ITEMS;
  else MORE_ITEMS_TARGET = MORE_ITEMS;
  return MORE_ITEMS_TARGET;
};

export default useGetMoreItems;
