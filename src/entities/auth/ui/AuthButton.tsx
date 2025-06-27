import { Button } from '@/shared/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';

export default function AuthButton<T extends FieldValues>({
  formType,
  form,
}: {
  formType: string;
  form: UseFormReturn<T>;
}) {
  return (
    <Button type='submit' variant='default' disabled={!form.formState.isValid}>
      {formType === 'login' ? '로그인' : '회원가입'}
    </Button>
  );
}
