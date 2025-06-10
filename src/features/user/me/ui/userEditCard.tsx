import Image from 'next/image';
import { ErrorMessage } from '@/shared/ui/errorMessage';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { Input } from '@/shared/ui/Input';
import { User } from '@/entities/user/model/types';
import { MeFormData } from '../model/type';

export default function UserEditCard({
  user,
  register,
  errors,
}: {
  user: User;
  register: UseFormRegister<MeFormData>;
  errors?: FieldError;
}) {
  return (
    <div className='flex gap-2'>
      <div className='w-12 h-12 relative aspect-auto'>
        <Image
          src={`/tier/${user.tier}.png`}
          alt='avatar'
          fill
          className='object-cover'
        />
      </div>
      <div className='flex flex-col w-full'>
        <Input
          type='text'
          {...register('game_nickname')}
          className='w-40'
          placeholder='닉네임 변경'
          aria-invalid={!!errors}
          autoFocus
        />

        <ErrorMessage
          message={
            errors?.message ||
            '발로란트 닉네임은 "이름#태그" 형식이어야 합니다. 예: player#KR1'
          }
          isError={!!errors}
          className='mt-3 text-xs text-muted-foreground'
        />
      </div>
    </div>
  );
}
