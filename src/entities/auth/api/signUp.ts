/**
 * 회원가입 API 요청 함수 (클라이언트)
 * @param formData - FormData 객체 (email, password, nickname, game_nickname, gender, birthday 포함)
 * @returns 서버에서 반환한 결과(status, message)
 */
export const signUp = async (
  formData: FormData
): Promise<{ status: string; message: string }> => {
  console.log('formData', formData);
  try {
    const res = await fetch('http://localhost:3000/api/auth/signUp', {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(123124124);
    console.error(error as Error);
    return {
      status: 'error',
      message: (error as Error).message,
    };
  }
};
