export type UserAuthType = {
  userId: string;
  email: string;
  accessToken: string;
  accessTokenExpiresAt: string;
  social: 0 | 1 | 2 | 3;
  name: string;
  profileImg: string;
  isInitialized: boolean;
  rootFolder: string;
  currentId: string;
};

export type UserSocialType = Pick<UserAuthType, 'social'>['social'];

export const SOCIAL_LABELS: Record<UserSocialType, string> = {
  0: '이메일',
  1: '구글',
  2: '카카오',
  3: '네이버',
} as const;
