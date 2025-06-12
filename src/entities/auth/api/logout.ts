import { fetcher } from '@/shared/lib/utils';

export const logout = async () => {
  try {
    const res = await fetcher('/api/auth/logout', {
      method: 'POST',
    });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error(error instanceof Error ? error.message : '로그아웃 에러');
  }
};
