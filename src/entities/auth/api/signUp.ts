import { fetcher } from '@/shared/lib/utils';

export const signup = async (
  formData: FormData
): Promise<{ status: string; message: string }> => {
  try {
    const res = await fetcher<{ status: string; message: string }>(
      '/api/auth/signup',
      {
        method: 'POST',
        body: formData,
      }
    );

    return res;
  } catch (error) {
    console.error('회원가입 에러 :', error);
    throw new Error(error instanceof Error ? error.message : '회원가입 에러');
  }
};
