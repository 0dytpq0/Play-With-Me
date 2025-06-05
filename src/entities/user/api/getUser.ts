import { redirect } from 'next/navigation';
import { fetcher } from '@/shared/lib/utils';

export const getUser = async (userId: string) => {
  try {
    const data = await fetcher('/api/user', {
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
