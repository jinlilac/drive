export enum KorToEngDriveCategory {
  폴더 = 'folder',
  작업지시서 = 'worksheet',
  도식화 = 'schematic',
  인쇄 = 'print',
  패턴 = 'pattern',
  기타 = 'etc',
  원단 = 'fabric',
  WIIVE = 'wiive',
  전체 = 'all',
}

export enum EngToKorDriveCategory {
  folder = '폴더',
  worksheet = '작업지시서',
  schematic = '도식화',
  print = '인쇄',
  pattern = '패턴',
  etc = '기타',
  fabric = '원단',
  wiive = 'WIIVE',
  all = '전체',
}

export type SpecialDriveType = {
  category: KorToEngDriveCategory;
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

export type FileSystemType = {
  createdAt: string;
  deletedAt: string;
  fileSystemId: string;
  isStarred: boolean;
  mimetype?: string;
  name: string;
  path: string;
  parentId: string;
  childrenCount?: number;
  size?: number;
  starredAt: string;
  storagePath?: string;
  tag?: KorToEngDriveCategory;
  thumbImg: string;
  type: string;
  updatedAt: string;
  worksheetId: string;
};

export type FileSystemAllResponseType = {
  folders: FileSystemType[];
  files: FileSystemType[];
  idPath: string;
  path: string;
};

export type FileSystemListResponseType = {
  count: number;
  data: FileSystemType[];
};

export type MoreItemAlertType =
  | 'name'
  | 'delete'
  | 'destroy'
  | 'download'
  | 'starred'
  | 'unstarred'
  | 'restore'
  | 'moveTrash'
  | 'hardDelete';
