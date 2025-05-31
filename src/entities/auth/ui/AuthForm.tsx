'use client';

import React from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/button';
import { SignUpFormType } from '../model/schema';
import { AuthInput } from './AuthInput';

/**
 * 인증 공통 폼 UI (이메일, 비밀번호, 성별, 생년월일)
 * @param props - react-hook-form methods, children(특화 필드)
 */
export interface AuthFormProps {
  form: any;
  onSubmit: (data: any) => void;
  children?: React.ReactNode;
}

export function AuthForm({ form, onSubmit, children }: AuthFormProps) {
  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-2 min-w-[400px]'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AuthInput form={form} name='email' placeholder='이메일' type='email' />
        <AuthInput
          form={form}
          name='password'
          placeholder='비밀번호'
          type='password'
        />

        {children}
        <Button type='submit' variant='default'>
          확인
        </Button>
      </form>
    </Form>
  );
}

