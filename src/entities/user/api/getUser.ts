import { redirect } from 'next/navigation';
import { fetcher } from '@/shared/lib/utils';
import { User } from '../model/types';
import { createClient } from '@/shared/lib/supabase/server';

export const getUser = async () => {
  try {
    const supabase = await createClient();
    const { data: userData, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    const { user } = userData;
    const data = await fetcher<User>(`/api/user/?userId=${user?.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    redirect('/');
  }
};
