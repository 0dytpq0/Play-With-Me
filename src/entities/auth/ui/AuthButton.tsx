import { Button } from '@/shared/ui/button';

export default function AuthButton({
  formType,
  form,
}: {
  formType: string;
  form: any;
}) {
  return (
    <Button type='submit' variant='default' disabled={!form.formState.isValid}>
      {formType === 'login' ? '로그인' : '회원가입'}
    </Button>
  );
}
