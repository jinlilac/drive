export enum DriveCategory {
  폴더 = 'folder',
  작업지시서 = 'worksheet',
  도식화 = 'schematic',
  인쇄 = 'print',
  패턴 = 'pattern',
  기타 = 'etc',
  원단 = 'fabric',
  WIIVE = 'wiive',
  ALL = 'all',
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

export type FileSystemType = {
  createdAt: string;
  deletedAt: string;
  fileSystemId: string;
  isStarred: boolean;
  mimetype?: string;
  name: string;
  path: string;
  parentId: string;
  size?: number;
  starredAt: string;
  storagePath?: string;
  tag?: string;
  thumbImg: string;
  type: string;
  updatedAt: string;
  worksheetId: string;
};

export type FileSystemAllResponseType = {
  folders: FileSystemType[];
  files: FileSystemType[];
};

export type FileSystemListResponseType = {
  count: number;
  data: FileSystemType[];
};
