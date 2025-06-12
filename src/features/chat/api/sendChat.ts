import { fetcher } from '@/shared/lib/utils';

// src/features/chat/api/sendMessage.ts
export type SendMessageParams = {
  roomId: string;
  senderId: string;
  content: string;
};

export type SendMessageResponse = {
  chat: {
    id: string;
    room_id: string;
    sender_id: string;
    content: string;
    created_at: string;
  };
};

export async function sendChat(
  params: SendMessageParams
): Promise<SendMessageResponse> {
  const res = await fetcher('/api/chat', {
    method: 'POST',
    body: params,
  });

  return res as SendMessageResponse;
}
