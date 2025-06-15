import { fetcher } from '@/shared/lib/utils';
import { ChatListItemType } from '../model/types';

export const getChatList = async ({ userId }: { userId: string }) => {
  try {
    const res = await fetcher<ChatListItemType[]>(
      `/api/chat?userId=${userId}`,
      {
        method: 'GET',
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : '채팅 목록을 가져오는데 실패했습니다.'
    );
  }
};
