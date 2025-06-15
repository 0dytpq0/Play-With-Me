'use client';

import { useEffect, useRef } from 'react';
import { SendChatResponse } from '../model/types';
import ChattingItem from './chattingItem';

interface ChatListProps {
  chattings: SendChatResponse[];
  userId: string;
}

export default function Chattings({ chattings, userId }: ChatListProps) {
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
        <ChattingItem key={msg.id} chat={msg} userId={userId} />
      ))}
    </div>
  );
}
