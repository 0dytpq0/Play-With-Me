import { Textarea } from '@/shared/ui/textarea';
import { ErrorMessage } from '@/shared/ui/errorMessage';
import { User } from '@/entities/user/model/types';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { MeFormData } from '../model/type';

export function OneLineArea({
  isEdit,
  register,
  errors,
  user,
}: {
  isEdit: boolean;
  register: UseFormRegister<MeFormData>;
  errors?: FieldError;
  user: User;
}) {
  return (
    <div className='w-full grid gap-3'>
      {isEdit ? (
        <>
          <Textarea
            {...register('one_line')}
            className='text-muted-foreground p-2 max-w-[400px] h-40'
            placeholder='한마디 소개'
            aria-invalid={!!errors}
          />

          <ErrorMessage
            message={
              errors?.message || '한마디 소개는 50자 이하로 입력해주세요.'
            }
            isError={!!errors}
            className='text-xs text-muted-foreground'
          />
        </>
      ) : (
        <p className='text-muted-foreground p-2 max-w-[400px] h-40'>
          {user.one_line}
        </p>
      )}
    </div>
  );
}
