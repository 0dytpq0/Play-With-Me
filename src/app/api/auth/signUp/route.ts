import { NextResponse } from 'next/server';
import { createClient } from '@/shared/lib/supabase/server';
import { headers } from 'next/headers';

/**
 * 회원가입 API (서버)
 * @param request - 회원가입 요청
 * @returns 회원가입 결과
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
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
        { status: 'error', message: '이메일과 비밀번호가 필요합니다.' },
        { status: 400 }
      );
    }

    const { data: profiles, error: userQueryError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email);

    if (userQueryError) {
      console.error('User query error:', userQueryError.message);
      return NextResponse.json(
        {
          status: 'error',
          message: '서버 오류로 이메일 중복 확인에 실패했습니다.',
        },
        { status: 500 }
      );
    }

    if (profiles && profiles.length > 0) {
      return NextResponse.json(
        { status: 'error', message: '이미 가입된 이메일입니다.' },
        { status: 400 }
      );
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: { nickname, game_nickname, gender, birthday, phone },
      },
    });

    if (error) {
      console.error('Supabase signup error:', error.message);

      return NextResponse.json(
        {
          status: 'error',
          message: '회원가입에 실패했습니다. 서버 오류입니다.',
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
  } catch (err) {
    console.error('Unexpected signup error:', err);
    return NextResponse.json(
      {
        status: 'error',
        message: '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      },
      { status: 500 }
    );
  }
}
