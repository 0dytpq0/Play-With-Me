import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/lib/supabase/server'; // supabase server client import 필요

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const formData = await req.formData();
  console.log('123123123', formData);
  const body = Object.fromEntries(formData.entries());

  const {
    sender_id,
    target_id,
    date,
    start_hour,
    duration,
    game_type,
    message,
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
