'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, MouseEvent, KeyboardEvent } from 'react';
import { useRealtimeChat } from '../hooks/useRealtimeChat';
import { getUserById } from '@/entities/user/api/getUserById';
import { genRoomId } from '../lib/utils';
import ChatHeader from './chatHeader';
import ChatList from './chatList';
import ChatInput from './chatInput';

interface ChatProps {
  userId: string;
  mateId: string;
}

export default function Chat({ userId, mateId }: ChatProps) {
  const [chatMessage, setChatMessage] = useState<string>('');
  const { chattings, mutate } = useRealtimeChat(userId, mateId);
  const { data: user } = useQuery({
    queryKey: ['user', mateId],
    queryFn: () => getUserById({ userId: mateId }),
  });

  const handleSend = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    mutate({
      roomId: genRoomId(userId, mateId),
      senderId: userId,
      content: chatMessage,
    });
    setChatMessage('');
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='relative flex flex-col w-[700px] h-[calc(100vh-100px)] my-10 gap-4 rounded-xl bg-background px-6 py-10 shadow-2xl'
    >
      <ChatHeader gameNickname={user?.game_nickname!} mateId={mateId} />
      <ChatList chattings={chattings || []} userId={userId} />
      <ChatInput
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
        handleSend={handleSend}
      />
    </div>
  );
}
