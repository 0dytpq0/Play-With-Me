'use client';

import { SignUpFormType, signUpSchema } from '@/entities/auth/model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthForm } from '@/entities/auth/ui/AuthForm';
import { FormField, FormItem, FormMessage } from '@/shared/ui/form';
import { useForm } from 'react-hook-form';
import GenderPopover from './GenderPopover';
import CalendarPopover from './CalendarPopover';
import { AuthInput } from '@/entities/auth/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '@/entities/auth/api';

export default function SignupForm() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.resetQueries();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      phone: '',
      confirmPassword: '',
      game_nickname: '',
      gender: undefined,
      birthday: undefined,
    },
  });

  const onSubmit = (data: SignUpFormType) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'confirmPassword') {
        // birthday는 YYYY-MM-DD로 변환
        if (key === 'birthday' && value instanceof Date) {
          formData.append(key, value.toISOString().slice(0, 10));
        } else {
          formData.append(
            key,
            value instanceof Date ? value.toISOString() : String(value)
          );
        }
      }
    });
    mutate(formData);
  };

  return (
    <div className='flex flex-col items-center gap-4 justify-center '>
      <h1 className='text-2xl font-bold mt-4'>회원가입</h1>
      <AuthForm form={form} onSubmit={onSubmit}>
        <AuthInput
          form={form}
          name='confirmPassword'
          placeholder='비밀번호 확인'
          type='password'
        />
        <AuthInput form={form} name='nickname' placeholder='닉네임' />
        <AuthInput
          form={form}
          name='game_nickname'
          placeholder='게임 닉네임(ex. player#KR1)'
        />
        <AuthInput form={form} name='phone' placeholder='전화번호' />
        <div className='flex gap-4'>
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <GenderPopover field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='birthday'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <CalendarPopover field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </AuthForm>
    </div>
  );
}

