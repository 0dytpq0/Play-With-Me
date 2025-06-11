export const signup = async (
  formData: FormData
): Promise<{ status: string; message: string }> => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || '회원가입에 실패했습니다.');
    }
    return result;
  } catch (error) {
    console.error('회원가입 에러 :', error);
    throw new Error(error instanceof Error ? error.message : '회원가입 에러');
  }
};
