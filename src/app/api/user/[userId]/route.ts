import { NextResponse } from 'next/server';
import { createClient } from '@/shared/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'userId is not found' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: user, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(user, { status: 200 });
}

export async function PATCH(request: Request) {
  const formData = await request.formData();
  const userId = formData.get('userId');
  const game_nickname = formData.get('game_nickname');
  const tier = formData.get('tier');
  const one_line = formData.get('one_line');
  const profile_image = formData.get('profile_image');
  const supabase = await createClient();
  let profile_image_url: string = '';

  if (!userId) {
    return NextResponse.json({ error: 'userId is not found' }, { status: 400 });
  }

  if (profile_image && profile_image instanceof File) {
    const ext = profile_image.name.split('.').pop() || 'png';
    const fileName = `${userId}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from('profile')
      .upload(fileName, await profile_image.arrayBuffer(), {
        contentType: profile_image.type,
        upsert: true,
      });
    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }
    const { data } = supabase.storage.from('profile').getPublicUrl(fileName);
    profile_image_url = data.publicUrl;
  }

  const { data: user, error } = await supabase
    .from('profiles')
    .update({
      game_nickname,
      tier,
      one_line,
      profile_image: profile_image_url || profile_image,
    })
    .eq('id', userId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(user, { status: 200 });
}
