import { createClient } from '@/shared/lib/supabase/client';
import { fetcher } from '@/shared/lib/utils';
import { User } from '../model/types';

export const getUserClient = async ({ userId }: { userId: string }) => {
  try {
    const data = await fetcher<User>(`/api/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      query: {
        userId,
      },
    });

    return data;
  } catch (error) {
    console.error('클라이언트 유저 호출 에러 :', error);
    throw new Error(
      error instanceof Error ? error.message : '클라이언트 유저 호출 에러'
    );
  }
};
