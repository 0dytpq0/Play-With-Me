import { createClient } from '@/shared/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: email!,
      password: password!,
    });

    if (error) {
      return NextResponse.json(
        {
          status: 'error',
          message: '로그인에 실패했습니다. 서버 오류입니다.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        message: '로그인에 성공했습니다.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected login error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      },
      { status: 500 }
    );
  }
}
