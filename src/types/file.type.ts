export type WorkSheetUpdatePayload = {
  id: string[];
  name?: string[];
  parentId?: string[];
  isStarred?: boolean[];
};

export type FolderListResponse = {
  children: string[];
  createdAt: string;
  deletedAt: null | string;
  discriminator: string;
  id: string;
  isStarred: boolean;
  mimetype: string; // 확장자
  name: string;
  path: string;
  size: number;
  starredAt: null | string;
  storagePath: string;
  tag: string;
  type: string;
  updatedAt: null | string;
};
