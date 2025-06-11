/**
 * 회원가입 API 요청 함수 (클라이언트)
 * @param formData - FormData 객체 (email, password 포함)
 * @returns 서버에서 반환한 결과(status, message)
 */
export const login = async (
  formData: FormData
): Promise<{ status: string; message: string }> => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error(error instanceof Error ? error.message : '로그인 에러');
  }
};
