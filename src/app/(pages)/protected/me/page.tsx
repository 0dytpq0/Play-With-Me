import { getUser } from '@/entities/user/api/getUser';
import MeForm from '@/features/user/me/ui/meForm';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

// 닉네임, one_line, 사진, 티어 수정가능
// 비어있는 하단은 추후 그래프같은걸 넣어도 될듯?

export default async function MeModal() {
  const user = await getUser();
  const queryClient = new QueryClient();
  queryClient.setQueryData(['user', user.id], user);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MeForm userId={user.id} />
    </HydrationBoundary>
  );
}
