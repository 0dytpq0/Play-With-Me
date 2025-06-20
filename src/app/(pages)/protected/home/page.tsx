import GlazeBox from '@/shared/ui/glazeBox';
import { getUser } from '@/entities/user/api/getUser';
import { ProfileSection } from '@/widgets/profileSection/profileSection';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { UserListSection } from '@/widgets/userListSection/ui/userListSection';
import { MateSection } from '@/widgets/mateSection/mateSection';

export default async function HomePage() {
  const user = await getUser();
  const queryClient = new QueryClient();
  queryClient.setQueryData(['user', user?.id], user);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <main className='w-full mx-auto h-dvh flex flex-col justify-center p-8 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white'>
        <div className='h-full w-full mx-auto flex justify-center gap-8'>
          <div className='w-[70%] max-w-[70%] h-full max-h-dvh  flex flex-col gap-4 items-center'>
            <GlazeBox className='w-full h-[20%] min-h-[150px]'>
              <h2 className='text-2xl font-bold mb-4'>
                최근 함께 플레이한 유저
              </h2>
              <div className='flex items-center flex-1 gap-2'>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <div className='bg-black w-10 h-10 rounded-full'></div>
                  <p className='text-xs'>유저 닉네임</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <div className='bg-black w-10 h-10 rounded-full'></div>
                  <p className='text-xs'>유저 닉네임</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <div className='bg-black w-10 h-10 rounded-full'></div>
                  <p className='text-xs'>유저 닉네임</p>
                </div>
              </div>
            </GlazeBox>
            <UserListSection userId={user?.id} />

            <GlazeBox className='w-full h-[20%] min-h-[150px]'>
              <h2 className='text-2xl font-bold mb-4'>최근 대화 목록</h2>
              <div className='flex items-center flex-1 gap-2'>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <div className='bg-black w-10 h-10 rounded-full'></div>
                  <p className='text-xs'>유저 닉네임</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <div className='bg-black w-10 h-10 rounded-full'></div>
                  <p className='text-xs'>유저 닉네임</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <div className='bg-black w-10 h-10 rounded-full'></div>
                  <p className='text-xs'>유저 닉네임</p>
                </div>
              </div>
            </GlazeBox>
          </div>
          <div className='flex-1 flex flex-col gap-4 items-center'>
            <GlazeBox className='w-full flex-1 '>
              <ProfileSection userId={user?.id} />
            </GlazeBox>
            <GlazeBox className='w-full flex-1 flex flex-col gap-2'>
              <MateSection />
            </GlazeBox>
          </div>
        </div>
      </main>
    </HydrationBoundary>
  );
}
