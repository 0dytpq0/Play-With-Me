'use client';

import { AuthForm } from '@/entities/auth/ui/AuthForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/entities/auth/model/schema';
import type { LoginFormType } from '@/entities/auth/model/types';
import { useLogin } from '../hooks/useLogin';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { BackButton } from '@/shared/ui/backButton';
import { toLoginFormData } from '@/entities/auth/lib/formData';

export function LoginForm() {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });

  const { mutate } = useLogin();

  const onSubmit = (data: LoginFormType) => {
    const formData = toLoginFormData(data);
    mutate(formData);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='relative flex flex-col items-center gap-4 justify-center bg-background rounded-xl shadow-2xl p-8 min-w-[340px]'>
        <BackButton />

        <Button asChild variant={'link'} className='absolute top-2 right-2'>
          <Link href={'/auth/signup'} className='flex items-center gap-1'>
            회원가입
            <ArrowRightIcon />
          </Link>
        </Button>
        <h1 className='text-2xl font-bold mt-2 mb-2'>로그인</h1>
        <AuthForm formType='login' form={form} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
