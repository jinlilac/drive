import { z } from 'zod';

export const RequestEmailVerificationPayload = z.object({
  email: z.string({ message: '이메일을 입력해주세요.' }).email('잘못된 형식의 이메일 주소입니다.'),
});

export type RequestEmailVerificationType = z.infer<typeof RequestEmailVerificationPayload>;

export const VerificationEmailPayload = RequestEmailVerificationPayload.extend({
  code: z.number().min(100000).max(999999),
});

export type VerificationEmailType = z.infer<typeof VerificationEmailPayload>;

export const PasswordValidate = z
  .string({ required_error: '비밀번호를 입력해주세요.' })
  .min(8, {
    message: '영문, 숫자, 특수기호를 포함하여 8자리 이상 입력해주세요.',
  })
  .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/, {
    message: '영문, 숫자, 특수기호를 포함하여 8자리 이상 입력해주세요.',
  });

export const SignUpPayload = RequestEmailVerificationPayload.extend({
  name: z.string().min(2, { message: '2자리 이상 입력해주세요.' }),
  password: PasswordValidate,
  confirmPassword: PasswordValidate,
  serviceAgreement: z.literal<boolean>(true),
  userAgreement: z.literal<boolean>(true),
}).refine(
  (data) => {
    console.log(data);
    return data.password === data.confirmPassword;
  },
  {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  },
);

export type SignUpType = z.infer<typeof SignUpPayload>;
