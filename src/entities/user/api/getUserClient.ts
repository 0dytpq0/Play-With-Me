import { fetcher } from '@/shared/lib/utils';
import { User } from '../model/types';

export const getUserById = async ({ userId }: { userId: string }) => {
  try {
    if (!userId || userId.length <= 0) {
      throw new Error('유저 ID가 없습니다.');
    }
    const data = await fetcher<User>(`/api/user/${userId}`, {
      method: 'GET',
    });

    return data;
  } catch (error) {
    console.error('클라이언트 유저 호출 에러 :', error);
    throw new Error(
      error instanceof Error ? error.message : '클라이언트 유저 호출 에러'
    );
  }
};
