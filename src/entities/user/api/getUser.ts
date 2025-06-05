import { redirect } from 'next/navigation';
import { fetcher } from '@/shared/lib/utils';
import { User } from '../model/types';

export const getUser = async (userId: string) => {
  try {
    const data = await fetcher<User>('/api/user', {
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
    console.error('Error fetching user:', error);
    redirect('/');
  }
};
