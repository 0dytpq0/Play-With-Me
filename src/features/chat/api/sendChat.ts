import { fetcher } from '@/shared/lib/utils';
import { SendChatParams, SendChatResponse } from '../model/types';

export async function sendChat(
  params: SendChatParams
): Promise<SendChatResponse[]> {
  try {
    const res = await fetcher(`/api/chat/${params.roomId}`, {
      method: 'POST',
      body: params,
    });

    return res as SendChatResponse[];
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : '채팅 정보를 가져오는데 실패했습니다.'
    );
  }
}
