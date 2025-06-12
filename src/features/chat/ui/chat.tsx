'use client';

import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useState, MouseEvent, KeyboardEvent, useRef, useEffect } from 'react';
import { sendChat } from '../api';
import { useRealtimeChat } from '../hooks/useRealtimeChat';
import { getUserClient } from '@/entities/user/api/getUserClient';
import { cn } from '@/shared/lib/utils';

interface ChatProps {
  userId: string;
  mateId: string;
}

export default function Chat({ userId, mateId }: ChatProps) {
  const [chatMessage, setChatMessage] = useState<string>('');
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', mateId],
    queryFn: () => getUserClient({ userId: mateId }),
    select: (data) => ({
      ...data,
      game_nickname: data.game_nickname?.split('#'),
    }),
  });
  const [game_nickname, game_tag] = user?.game_nickname || [];
  console.log('user', user);
  const genRoomId = (userId: string, mateId: string) => {
    const roomId = [userId, mateId].sort().join('-');
    return roomId;
  };
  const { data: chatMessages } = useRealtimeChat(userId, mateId);
  const queryClient = useQueryClient();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);
  const { mutate } = useMutation({
    mutationFn: sendChat,
    onSuccess: () => {
      setChatMessage('');
      queryClient.invalidateQueries({
        queryKey: ['chat', genRoomId(userId, mateId)],
      });
    },
  });

  const GRADIENTS = [
    'bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500',
    'bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400',
    'bg-gradient-to-r from-red-400 via-yellow-400 to-green-400',
    'bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400',
    'bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400',
    'bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400',
    'bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-500',
    'bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400',
    'bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400',
    'bg-gradient-to-r from-blue-400 via-sky-400 to-emerald-400',
  ];

  const handleSend = (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    mutate({
      roomId: genRoomId(userId, mateId),
      senderId: userId,
      content: chatMessage,
    });
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
            GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]
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
