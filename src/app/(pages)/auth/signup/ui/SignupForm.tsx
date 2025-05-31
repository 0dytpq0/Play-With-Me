'use client';

import { SignUpFormType, signUpSchema } from '@/entities/auth/model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthForm } from '@/entities/auth/ui/AuthForm';
import { FormField, FormItem, FormMessage } from '@/shared/ui/form';
import { useForm } from 'react-hook-form';
import GenderPopover from './GenderPopover';
import CalendarPopover from './CalendarPopover';
import { AuthInput } from '@/entities/auth/ui';

export default function SignupForm() {
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      valorantNickname: '',
      gender: undefined,
      birthday: undefined,
    },
  });

  const onSubmit = (data: SignUpFormType) => {
    // TODO: 실제 회원가입 처리 로직
    // eslint-disable-next-line no-console
    console.log(data);
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
        <AuthInput
          form={form}
          name='nickname'
          placeholder='닉네임'
          type='text'
        />
        <AuthInput
          form={form}
          name='valorantNickname'
          placeholder='발로란트 닉네임'
          type='text'
        />

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

