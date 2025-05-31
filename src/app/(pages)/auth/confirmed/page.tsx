import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export default function ConfirmedPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <h1 className='text-2xl font-bold'>이메일 인증 성공!</h1>
      <p>이제 서비스를 이용하실 수 있습니다.</p>
      <Button asChild variant='outline'>
        <Link href='/'>홈으로 가기</Link>
      </Button>
    </div>
  );
}
