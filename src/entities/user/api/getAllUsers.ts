import { fetcher } from '@/shared/lib/utils';
import { User } from '../model/types';

export const getAllUsers = async () => {
  try {
    const data = await fetcher<User[]>(`/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
