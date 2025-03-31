export type UserAuthType = {
  userId: string;
  email: string;
  accessToken: string;
  expiresAt: string;
  social: 0 | 1 | 2 | 3;
  name: string;
  profile: string;
  isInitialized: boolean;
};
