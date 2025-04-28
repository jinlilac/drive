import { UserAuthType } from '@/types/auth.type';

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
