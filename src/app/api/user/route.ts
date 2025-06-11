import { createClient } from '@/shared/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tier = searchParams.get('tier');
  console.log('tier', tier);
  const supabase = await createClient();
  if (tier === '') {
    const { data: user, error } = await supabase.from('profiles').select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(user, { status: 200 });
  }

  const { data: user, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('tier', Number(tier));
  console.log('user,error', user, error);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(user, { status: 200 });
}
