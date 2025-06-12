import { fetcher } from '@/shared/lib/utils';
import { SendChatParams, SendChatResponse } from '../model/types';

export async function sendChat(
  params: SendChatParams
): Promise<SendChatResponse[]> {
  const res = await fetcher('/api/chat', {
    method: 'POST',
    body: params,
  });

  return res as SendChatResponse[];
}
