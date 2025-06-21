import SliderBackground from '@/shared/ui/sliderBackground';
import { HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { getUser } from '@/entities/user/api/getUser';
import { getUserById } from '@/entities/user/api/getUserById';
import { Reservate } from '@/features/reservate/ui';

interface Props {
  searchParams: Promise<{
    mate: string;
  }>;
}

export default async function ReservateSlider({ searchParams }: Props) {
  const queryClient = new QueryClient();
  const { mate: mateId } = await searchParams;
  const mate = await getUserById({ userId: mateId! });
  const user = await getUser();

  queryClient.setQueryData(['mate', mateId], mate);
  queryClient.setQueryData(['user', user.id], user);

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <SliderBackground>
        <Reservate mateId={mateId} userId={user.id} />
      </SliderBackground>
    </HydrationBoundary>
  );
}
