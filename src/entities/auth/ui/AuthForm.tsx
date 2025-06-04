'use client';

import React from 'react';
import { Form } from '@/shared/ui/form';
import { AuthInput } from './AuthInput';
import AuthButton from './AuthButton';

export interface AuthFormProps {
  form: any;
  onSubmit: (data: any) => void;
  formType?: string;
  children?: React.ReactNode;
}

export function AuthForm({
  form,
  onSubmit,
  children,
  formType = 'login',
}: AuthFormProps) {
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
        <AuthButton formType={formType} form={form} />
      </form>
    </Form>
  );
}
