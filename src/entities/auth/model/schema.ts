'use client';

import { z } from 'zod';

export const GENDER_OPTIONS = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' },
] as const;

export const signUpSchema = z
  .object({
    email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
    nickname: z
      .string()
      .min(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' }),
    password: z
      .string()
      .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }),
    confirmPassword: z.string(),
    game_nickname: z.string().refine((val) => /^[^#]+#[^#]+$/.test(val), {
      message:
        '발로란트 닉네임은 "이름#태그" 형식이어야 합니다. 예: player#KR1',
    }),
    phone: z
      .string()
      .min(10, { message: '전화번호는 최소 10자 이상이어야 합니다.' }),
    gender: z.enum(
      [...GENDER_OPTIONS.map((g) => g.value)] as [string, ...string[]],
      { required_error: '성별을 선택해주세요.' }
    ),
    birthday: z.date({ required_error: '생년월일을 선택해주세요.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignUpFormType = z.infer<typeof signUpSchema>;

