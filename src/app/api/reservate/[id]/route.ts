import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/lib/supabase/server';
type Params = Promise<{ id: string }>;

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  const supabase = await createClient();
  const { status } = await req.json();
  const { id } = await params;

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
