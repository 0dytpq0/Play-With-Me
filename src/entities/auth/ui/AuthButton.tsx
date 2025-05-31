import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import Link from 'next/link';
export default function AuthButton({
  formType,
  form,
}: {
  formType: string;
  form: any;
}) {
  return formType === 'login' ? (
    <Button type='submit' variant='default' disabled={!form.formState.isValid}>
      로그인
    </Button>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type='submit'
          variant='default'
          disabled={!form.formState.isValid}
        >
          회원가입
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>이메일을 확인해주세요!</DialogTitle>
        <DialogDescription>
          <Button asChild>
            <Link href='/'>홈으로 이동</Link>
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
