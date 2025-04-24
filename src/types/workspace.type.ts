export enum DriveCategory {
  폴더 = 'folder',
  작업지시서 = 'worksheet',
  도식화 = 'schematic',
  인쇄 = 'print',
  패턴 = 'pattern',
  기타 = 'etc',
  WIIVE = 'wiive',
}

export type SpecialDriveType = {
  category: DriveCategory;
  page: number;
  target: 'starred' | 'trash';
  name?: string;
};

export type StarredType = SpecialDriveType & {
  target: 'starred';
};

export type TrashType = SpecialDriveType & {
  target: 'trash';
};

export type StarredAllType = Omit<StarredType, 'category' | 'page'>;
export type TrashAllType = Omit<TrashType, 'category' | 'page'>;
