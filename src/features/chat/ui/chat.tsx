'use client';

import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  useState,
  MouseEvent,
  KeyboardEvent,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { sendChat } from '../api';
import { useRealtimeChat } from '../hooks/useRealtimeChat';
import { getUserClient } from '@/entities/user/api/getUserClient';
import { cn } from '@/shared/lib/utils';
import { GRADIENTS } from '../model/constants';
import { genGradient, genRoomId } from '../lib/utils';

interface ChatProps {
  userId: string;
  mateId: string;
}

export default function Chat({ userId, mateId }: ChatProps) {
  const [chatMessage, setChatMessage] = useState<string>('');
  const { chatMessages, mutate } = useRealtimeChat(userId, mateId);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { data: user } = useQuery({
    queryKey: ['user', mateId],
    queryFn: () => getUserClient({ userId: mateId }),
    select: (data) => ({
      ...data,
      game_nickname: data.game_nickname?.split('#'),
    }),
  });
  const [game_nickname, game_tag] = user?.game_nickname || [];
  const memoizedGradient = useMemo(() => genGradient(), [mateId]);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

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
      <div className='flex gap-x-2 p-2 items-end'>
        <span
          className={cn(
            'text-3xl font-bold bg-clip-text text-transparent',
            memoizedGradient
          )}
        >
          {game_nickname}
        </span>
        <span className='text-xl font-bold text-muted-foreground'>
          #{game_tag}
        </span>
      </div>
      <div
        className='flex-1 overflow-y-auto space-y-2 pr-2'
        ref={chatContainerRef}
      >
        {chatMessages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender_id === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[60%] break-words text-sm '
                ${
                  msg.sender_id === userId
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-slate-200 text-black rounded-bl-none'
                }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className='flex gap-2 mt-2 items-end'>
        <Textarea
          className='scrollbar-hide flex-1 w-0 p-3 rounded-lg text-black bg-white focus:outline-purple-500 resize-none'
          autoFocus
          value={chatMessage}
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend(e);
            }
          }}
          onChange={(e) => setChatMessage(e.target.value)}
        />
        <Button
          onClick={handleSend}
          className='bg-purple-600 hover:bg-purple-700 '
        >
          전송
        </Button>
      </div>
    </div>
  );
}
