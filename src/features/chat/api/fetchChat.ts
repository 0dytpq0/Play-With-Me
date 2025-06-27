import { fetcher } from '@/shared/lib/utils';
import { SendChatResponse } from '../model/types';

export const fetchChat = async (roomId: string) => {
  try {
    const data = await fetcher<SendChatResponse[]>(`/api/chat/${roomId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : '채팅 정보를 가져오는데 실패했습니다.'
    );
  }
};
