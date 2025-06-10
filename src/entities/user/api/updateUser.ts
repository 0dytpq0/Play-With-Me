import { fetcher } from '@/shared/lib/utils';
import type { User } from '@/entities/user/model/types';

export const updateUser = async ({ formData }: { formData: FormData }) => {
  try {
    const data = await fetcher<User>(
      `/api/user/?userId=${formData.get('userId')}`,
      {
        method: 'PATCH',
        body: formData,
      }
    );
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
