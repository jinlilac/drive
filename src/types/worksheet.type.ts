export type WorkSheetItems = {
  category: number;
  clothes: string;
  createdAt: string;
  fileName: string;
  filePath: string;
  fileSystemId: string;
  gender: number;
  isStarred: boolean;
  name: string;
  parentId: string;
  requester: string;
  starredAt: string | null;
  thumbImg: string | null;
  type: string;
  updatedAt: string;
  worksheetId: string;
};

export type WorkSheetResponseType = {
  count: number;
  data: WorkSheetItems[];
};

export type WorkSheetListType = {
  page: number;
  gender?: number;
  category?: number;
  clothes?: string;
  name?: string;
};
