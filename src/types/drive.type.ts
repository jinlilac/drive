import { UserAuthType } from '@/types/auth.type';

export type UploadFilePayloadType = {
  tags: string[];
  files: File[];
} & Pick<UserAuthType, 'userId' | 'rootFolder'>;
