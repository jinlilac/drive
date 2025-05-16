import { STARRED_MORE_ITEMS, TRASH_MORE_ITEMS, WORKSHEET_MORE_ITEMS, DRIVE_MORE_ITEMS } from '@/constants/workspace';
import { useLocation } from 'react-router-dom';

const useGetMoreItems = (isStarred: boolean) => {
  const { pathname } = useLocation();

  let MORE_ITEMS_TARGET;
  if (pathname.includes('trash')) MORE_ITEMS_TARGET = TRASH_MORE_ITEMS;
  else if (pathname.includes('starred')) MORE_ITEMS_TARGET = STARRED_MORE_ITEMS;
  else if (pathname.includes('drive')) MORE_ITEMS_TARGET = DRIVE_MORE_ITEMS(isStarred);
  else MORE_ITEMS_TARGET = WORKSHEET_MORE_ITEMS(isStarred);
  return MORE_ITEMS_TARGET;
};

export default useGetMoreItems;
