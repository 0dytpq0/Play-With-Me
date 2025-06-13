'use client';

import { useEffect, useRef } from 'react';
import { SendChatResponse } from '../model/types';
import ChatListItem from './chatListItem';

interface ChatListProps {
  chattings: SendChatResponse[];
  userId: string;
}

export default function ChatList({ chattings, userId }: ChatListProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chattings]);

  return (
    <div
      ref={chatContainerRef}
      className='flex-1 overflow-y-auto space-y-2 pr-2'
    >
      {chattings?.map((msg) => (
        <ChatListItem key={msg.id} chat={msg} userId={userId} />
      ))}
    </div>
  );
}

