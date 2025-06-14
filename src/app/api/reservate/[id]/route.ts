import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/lib/supabase/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { status } = await req.json();
  const { id } = params;

  const { error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const message = status === 'accepted' ? '듀오 수락 성공' : '듀오 거절 성공';
  return NextResponse.json({ message }, { status: 200 });
}
