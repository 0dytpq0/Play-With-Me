import { Button } from '@/shared/ui/button';
import { createClient } from '@/shared/lib/supabase/server';
import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getSession();
  return (
    <main className='w-full mx-auto h-dvh flex flex-col md:flex-row justify-center p-8 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white'>
      <div className='w-full max-w-5xl flex items-center justify-center gap-4'>
        <div className='flex-1 flex flex-col gap-3 justify-center items-center md:items-start text-center md:text-left'>
          <h1 className='text-7xl sm:text-8xl lg:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500'>
            Play
          </h1>
          <h1 className='text-6xl sm:text-7xl lg:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-500'>
            With Me
          </h1>
          <p className='mt-4 text-lg text-slate-400 max-w-md'>
            최고의 발로란트 듀오를 찾아 완벽한 팀플레이를 경험하세요.
          </p>
        </div>
        <div className='flex-1 flex flex-col gap-5 items-center w-full md:w-auto'>
          <Button
            asChild
            size='lg'
            className='w-full bg-purple-600 hover:bg-purple-700 text-white hover:scale-105 transition-all duration-200 ease-in-out'
          >
            <Link href={session ? '/protected/home' : '/auth/login'}>
              매칭 시작하기
            </Link>
          </Button>

          <Button
            asChild
            size='lg'
            variant={'outline'}
            className='w-full border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out'
          >
            <Link href='/auth/login'>로그인</Link>
          </Button>
          <Button
            asChild
            size='lg'
            variant={'outline'}
            className='w-full border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out'
          >
            <Link href='/auth/signup'>회원가입</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
