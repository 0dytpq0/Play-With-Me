import { getUser } from '@/entities/user/api/getUser';

export default async function MePage() {
  const user = await getUser('d92d24e6-c449-44a0-b5cc-2619b627b5d8');
  console.log('user', user);
  return (
    <>
      <h1>player#kr1</h1>
      <div>티어 이미지</div>
      <div>전체 채팅 목록</div>
      <div>마이페이지</div>
      <div>자기 소개 한마디</div>
      <button>로그아웃</button>
    </>
  );
}
