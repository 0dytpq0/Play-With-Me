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
    const data = await fetcher<User>(`/api/user/${user?.id}`, {
      method: 'GET',
    });

    return data;
  } catch (error) {
    // 후에 throw new Error로 수정하고 redirect는 클라이언트에서 해줘야 할듯
    console.error('Error fetching user:', error);
    redirect('/');
  }
};
