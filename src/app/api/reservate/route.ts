import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/lib/supabase/server'; // supabase server client import 필요

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json(
      { error: '사용자 ID가 없습니다.' },
      { status: 400 }
    );
  }
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('target_id', userId)
    .eq('status', 'pending');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const formData = await req.formData();
  const body = Object.fromEntries(formData.entries());

  const {
    sender_id,
    target_id,
    date,
    start_hour,
    duration,
    game_type,
    message,
    sender_nickname,
    sender_image,
    sender_tier,
  } = body;

  const { data: reservations } = await supabase
    .from('reservations')
    .select('start_hour, duration')
    .eq('target_id', target_id)
    .eq('date', date);

  const isOverlap = reservations?.some((r) => {
    const rStart = Number(r.start_hour);
    const rEnd = rStart + Number(r.duration);
    return (
      Number(start_hour) < rEnd &&
      Number(start_hour) + Number(duration) > rStart
    );
  });

  if (isOverlap) {
    return NextResponse.json(
      { message: '이미 해당 시간에 듀오 약속이 있습니다.' },
      { status: 409 }
    );
  }

  const { error } = await supabase.from('reservations').insert([
    {
      sender_id,
      target_id,
      date,
      start_hour: Number(start_hour),
      duration: Number(duration),
      game_type,
      message,
      sender_nickname,
      sender_image,
      sender_tier,
      status: 'pending',
    },
  ]);

  if (error) {
    return NextResponse.json(
      { message: '예약 생성 실패', error },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: '예약이 완료되었습니다.' },
    { status: 200 }
  );
}
