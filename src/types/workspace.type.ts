export enum KorToEngDriveCategory {
  '폴더' = 'folder',
  'Type A' = 'A',
  'Type B' = 'B',
  'Type C' = 'C',
  'Type D' = 'D',
  '기타' = 'etc',
  'Type E' = 'E',
  '전체' = 'all',
}

export enum EngToKorDriveCategory {
  folder = '폴더',
  A = 'Type A',
  B = 'Type B',
  C = 'Type C',
  D = 'Type D',
  etc = '기타',
  E = 'Type E',
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
