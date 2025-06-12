'use client';

import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
/**
 * Simple Chat UI (local state only)
 * @returns {JSX.Element}
 */
import { useState, FormEvent } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { sendChat } from '../api/sendChat';

/**
 * 메시지 타입
 */
type Message = {
  id: number;
  sender: 'me' | 'other';
  content: string;
};

interface ChatProps {
  userId: string;
  mateId: string;
}
type ChatForm = {
  message: string;
};
export default function Chat({ userId, mateId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'other', content: '안녕하세요!' },
    {
      id: 2,
      sender: 'me',
      content:
        '안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?',
    },
  ]);
  const [chat, setChat] = useState<string>('');

  const { mutate } = useMutation({
    mutationFn: sendChat,
    onSuccess: () => {
      setChat('');
    },
  });

  const genRoomId = (userId: string, mateId: string) => {
    const roomId = [userId, mateId].sort().join('-');
    return roomId;
  };

  /**
   * 메시지 전송 핸들러
   */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('onSubmit', chat);
    mutate({
      roomId: genRoomId(userId, mateId),
      senderId: userId,
      content: chat,
    });
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='relative flex flex-col w-[700px] h-[calc(100vh-100px)] my-10 gap-4 rounded-xl bg-background px-6 py-10 shadow-2xl'
    >
      <h1>메이트 아이디 태그</h1>
      <div className='flex-1 overflow-y-auto space-y-2 pr-2'>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[60%] break-words text-sm '
                ${
                  msg.sender === 'me'
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-slate-200 text-black rounded-bl-none'
                }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} className='flex gap-2 mt-2 items-end'>
        <Textarea
          className='scrollbar-hide flex-1 w-0 p-3 rounded-lg text-black bg-white focus:outline-purple-500 resize-none'
          autoFocus
          value={chat}
          onChange={(e) => setChat(e.target.value)}
        />
        <Button type='submit' className='bg-purple-600 hover:bg-purple-700 '>
          전송
        </Button>
      </form>
    </div>
  );
}
