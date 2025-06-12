'use client';

import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useState, MouseEvent } from 'react';
import { fetchChat, sendChat } from '../api';
import { SendChatResponse } from '../model/types';

interface ChatProps {
  userId: string;
  mateId: string;
}

export default function Chat({ userId, mateId }: ChatProps) {
  const [chatMessage, setChatMessage] = useState<string>('');
  const genRoomId = (userId: string, mateId: string) => {
    const roomId = [userId, mateId].sort().join('-');
    return roomId;
  };
  const queryClient = useQueryClient();
  const { data: chatMessages } = useQuery<SendChatResponse[]>({
    queryKey: ['chat', genRoomId(userId, mateId)],
    queryFn: () => fetchChat(genRoomId(userId, mateId)),
  });
  const { mutate } = useMutation({
    mutationFn: sendChat,
    onSuccess: () => {
      setChatMessage('');
      queryClient.invalidateQueries({
        queryKey: ['chat', genRoomId(userId, mateId)],
      });
    },
  });

  /**
   * 메시지 전송 핸들러
   */
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('123123', 123123);
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
      <h1>메이트 아이디 태그</h1>
      <div className='flex-1 overflow-y-auto space-y-2 pr-2'>
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
