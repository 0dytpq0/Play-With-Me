import { fetcher } from '@/shared/lib/utils';
import { User } from '../model/types';

export const getUsersByTier = async (tier: string): Promise<User[]> => {
  try {
    const data = await fetcher<User[]>(`/api/user/?tier=${tier}`, {
      method: 'GET',
    });
    return data;
  } catch (error) {
    console.error('티어별 유저 데이터 호출 에러 :', error);
    throw new Error(
      error instanceof Error ? error.message : '티어별 유저 데이터 호출 에러'
    );
  }
};
