'use client';

import React from 'react';
import { Form } from '@/shared/ui/form';
import { AuthInput } from './AuthInput';
import AuthButton from './AuthButton';
import { Path, UseFormReturn } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';

export interface AuthFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  formType?: string;
  children?: React.ReactNode;
}

export function AuthForm<T extends FieldValues>({
  form,
  onSubmit,
  children,
  formType = 'login',
}: AuthFormProps<T>) {
  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-2 min-w-[400px]'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AuthInput<T>
          form={form}
          name={'email' as Path<T>}
          placeholder='이메일'
          type='email'
        />
        <AuthInput<T>
          form={form}
          name={'password' as Path<T>}
          placeholder='비밀번호'
          type='password'
        />

        {children}
        <AuthButton formType={formType} form={form} />
      </form>
    </Form>
  );
}
