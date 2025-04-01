import { PasswordValidate } from '@/types/signup.type';
import { z } from 'zod';

export const EmailAuth = z.object({
  email: z.string({ required_error: '이메일을 입력해주세요.' }).email({ message: '잘못된 형식의 이메일 주소입니다.' }),
  password: PasswordValidate,
  saveId: z.boolean().optional(),
});

export type SignInEmailType = z.infer<typeof EmailAuth>;
