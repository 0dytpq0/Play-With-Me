import { fetcher } from '@/shared/lib/utils';
import { User } from '../model/types';
import { ApiResponse } from '@/shared/types/apiTypes';

export const getUsersByTier = async (
  tier: string
): Promise<ApiResponse<User[]>> => {
  try {
    const data = await fetcher<User[]>(`/api/user/?tier=${tier}`, {
      method: 'GET',
    });
    return data;
  } catch (error) {
    console.error('유저 정보 업데이트 에러 :', error);
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.',
    };
  }
};
