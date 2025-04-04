// src/schemas/profile.ts
import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, '이름은 필수 항목입니다').max(50, '이름은 50자 이내로 입력해주세요'),
  profileImg: z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, {
    message: '이미지는 5MB 이하만 업로드 가능합니다.',
  }),
});

export type ProfileInput = z.infer<typeof profileSchema>;

export type ProfileInputType = {
  userId: string;
  name: string;
  profileImg: File;
};
