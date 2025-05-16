import { BAR_ITEMS, STARRED_BAR_ITEMS, TRASH_BAR_ITEMS } from '@/constants/workspace';
import { useLocation } from 'react-router-dom';

const useGetActionBarItem = () => {
  const { pathname } = useLocation();

  let BAR_ITEMS_TARGET;
  if (pathname.includes('trash')) BAR_ITEMS_TARGET = TRASH_BAR_ITEMS;
  else if (pathname.includes('starred')) BAR_ITEMS_TARGET = STARRED_BAR_ITEMS;
  else if (pathname.includes('drive')) BAR_ITEMS_TARGET = BAR_ITEMS;
  else BAR_ITEMS_TARGET = BAR_ITEMS;
  return BAR_ITEMS_TARGET;
};

export default useGetActionBarItem;
