import { z } from 'zod';
import type { LoginFormType, SignUpFormType } from './types';

export const GENDER_OPTIONS = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' },
] as const;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
}) satisfies z.ZodType<LoginFormType>;

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  nickname: z.string().min(2),
  game_nickname: z.string().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  birthday: z.date().optional(),
}) satisfies z.ZodType<SignUpFormType>;

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
