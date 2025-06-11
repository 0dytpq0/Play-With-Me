import { fetcher } from '@/shared/lib/utils';
import type { User } from '@/entities/user/model/types';

export const updateUser = async ({ formData }: { formData: FormData }) => {
  try {
    const data = await fetcher<User>(`/api/user/${formData.get('userId')}`, {
      method: 'PATCH',
      body: formData,
    });
    return data;
  } catch (error) {
    console.error('유저 정보 업데이트 에러 :', error);
    throw new Error(
      error instanceof Error ? error.message : '유저 정보 업데이트 에러'
    );
  }
};
