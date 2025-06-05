'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUpSchema } from '@/entities/auth/model/schema';
import { useSignup } from '../hooks/useSignup';
import { AuthForm } from '@/entities/auth/ui/AuthForm';
import { AuthInput } from '@/entities/auth/ui';
import { FormField, FormItem, FormMessage } from '@/shared/ui/form';
import GenderPopover from '@/entities/auth/ui/GenderPopover';
import CalendarPopover from '@/entities/auth/ui/CalendarPopover';
import { SignUpFormType } from '@/entities/auth/model/types';
import { BackButton } from '@/shared/ui/backButton';
import { toSignupFormData } from '@/entities/auth/lib/formData';

export function SignupForm() {
  const { mutate } = useSignup();

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
    const formData = toSignupFormData(data);
    mutate(formData);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='relative flex flex-col items-center gap-4 justify-center bg-background rounded-xl shadow-2xl p-8 min-w-[340px]'>
        <BackButton />

        <h1 className='text-2xl font-bold mt-4'>회원가입</h1>
        <AuthForm form={form} onSubmit={onSubmit} formType='signup'>
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
    </div>
  );
}
