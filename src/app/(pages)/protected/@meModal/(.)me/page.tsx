import { getUser } from '@/entities/user/api/getUser';
import MeForm from '@/features/user/me/ui/meForm';

// 닉네임, one_line, 사진, 티어 수정가능
// 비어있는 하단은 추후 그래프같은걸 넣어도 될듯?

export default async function MeModal() {
  const user = await getUser();
  return <MeForm user={user} />;
}
