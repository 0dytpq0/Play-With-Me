import { Reservation } from '@/features/reservate/model/types';
import { createClient } from '@/shared/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 없습니다.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: reservations, error: reservationErr } = await supabase
      .from('reservations')
      .select('*')
      .or(`sender_id.eq.${userId},target_id.eq.${userId}`)
      .eq('status', 'accepted')
      .order('created_at', { ascending: false });

    if (reservationErr) {
      return NextResponse.json(
        { error: reservationErr.message },
        { status: 500 }
      );
    }

    if (reservations.length === 0) {
      return NextResponse.json({ profiles: [] }, { status: 204 });
    }

    const duoIds = new Set<string>();
    reservations.forEach((reservation: Reservation) => {
      duoIds.add(
        reservation.sender_id === userId
          ? reservation.target_id
          : reservation.sender_id
      );
    });

    const { data: profiles, error: profileErr } = await supabase
      .from('profiles')
      .select('*')
      .in('id', Array.from(duoIds));

    if (profileErr) {
      return NextResponse.json({ error: profileErr.message }, { status: 500 });
    }
    return NextResponse.json({ profiles }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
