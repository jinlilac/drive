import { UserAuthType } from '@/types/auth.type';
import { KorToEngDriveCategory } from '@/types/workspace.type';

export type UploadFilePayloadType = {
  tags: string[];
  files: File[];
} & Pick<UserAuthType, 'userId' | 'rootFolder'>;

export type Result = {
  id: string;
  mimetype: string;
  name: string;
  path: string;
  size: string;
  storagePath: string;
  tag: string;
  type: string;
};

export type UploadFileResponseType = {
  index: number;
  orignalName?: string;
  result?: Result;
  success: boolean;
};

export type CreateFolderPayloadType = {
  name: string;
} & Pick<UserAuthType, 'rootFolder'>;

export type GetDrivePayloadType = {
  page: number;
  category: KorToEngDriveCategory;
};
