import { NextResponse } from 'next/server';
import { createClient } from '@/shared/lib/supabase/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  const formData = await request.formData();
  console.log('formData', formData);
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const nickname = formData.get('nickname')?.toString();
  const game_nickname = formData.get('game_nickname')?.toString() || null;
  const gender = formData.get('gender')?.toString();
  const birthday = formData.get('birthday');
  const phone = formData.get('phone')?.toString();

  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email || !password) {
    return NextResponse.json(
      {
        status: 'error',
        message: '이메일과 비밀번호가 필요합니다.',
      },
      { status: 400 }
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/api/auth/callback`,
      data: {
        nickname,
        game_nickname,
        gender,
        birthday,
        phone,
      },
    },
  });

  if (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        status: 'error',
        message: error.message,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      status: 'success',
      message: '가입이 완료되었습니다! 이메일을 확인해주세요.',
    },
    { status: 200 }
  );
}
