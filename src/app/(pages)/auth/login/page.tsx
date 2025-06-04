'use client';

import { AuthForm } from '@/entities/auth/ui/AuthForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginFormType } from '@/entities/auth/model/schema';
import { login } from '@/entities/auth/api/login';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export default function LoginPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.resetQueries();
      router.push('/');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: LoginFormType) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    mutate(formData);
  };

  return (
    <div className='relative flex flex-col items-center gap-4 justify-center'>
      <Button asChild variant={'link'} className='absolute top-1 right-1'>
        <Link href={'/auth/signup'} className='flex items-center gap-1'>
          회원가입
          <ArrowRightIcon />{' '}
        </Link>
      </Button>
      <h1 className='text-2xl font-bold mt-4'>로그인</h1>
      <AuthForm formType='login' form={form} onSubmit={onSubmit} />
    </div>
  );
}
