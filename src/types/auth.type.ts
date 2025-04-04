export type UserAuthType = {
  userId: string;
  email: string;
  accessToken: string;
  accessTokenExpiresAt: string;
  social: 0 | 1 | 2 | 3;
  name: string;
  profileImg: string;
  isInitialized: boolean;
};
