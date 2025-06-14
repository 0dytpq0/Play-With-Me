import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { roomId, senderId, content } = await request.json();
  if (!roomId || !senderId || !content) {
    return NextResponse.json(
      { error: '채팅 정보가 잘못 입력되었습니다.' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.from('chat').insert({
    room_id: roomId,
    sender_id: senderId,
    content,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const roomId = await params.id;

  if (!roomId) {
    return NextResponse.json(
      { error: '채팅방 ID가 없습니다.' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('chat')
    .select('*')
    .eq('room_id', roomId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
