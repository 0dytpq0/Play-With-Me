import { createClient } from '@/shared/lib/supabase/client';
import { fetcher } from '@/shared/lib/utils';
import { User } from '../model/types';

export const getUserClient = async ({ userId }: { userId: string }) => {
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
};
