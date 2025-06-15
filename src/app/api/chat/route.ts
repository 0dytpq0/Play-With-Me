import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/lib/supabase/server';
import { ChatListItemType } from '@/features/chat/model/types';
import { User } from '@/entities/user/model/types';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: '사용자 ID가 없습니다.' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.rpc('get_latest_chats_by_user', {
    user_id: userId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const senderIds = data.map((chat: ChatListItemType) => chat.sender_id);

  const { data: users, error: usersError } = await supabase
    .from('profiles')
    .select('*')
    .in('id', senderIds);

  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 });
  }

  const userMap: Record<string, User> = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  const chatList = data.map((chat: ChatListItemType) => {
    const sender = userMap[chat.sender_id];
    return {
      ...chat,
      sender,
    };
  });
  return NextResponse.json(chatList, { status: 200 });
}
