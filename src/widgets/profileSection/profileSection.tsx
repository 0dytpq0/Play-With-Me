'use client';

import { UserCard } from '@/entities/user/ui/userCard';
import { UserAvatar } from '@/entities/user/ui/userAvatar';
import { Button } from '@/shared/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/entities/user/api/getUserById';
import { useLogout } from '@/features/auth/login/hooks';
import { useSearchParams } from 'next/navigation';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { getReservations } from '@/features/reservate/api';
import { ReservationResponse } from '@/features/reservate/model/types';
import Image from 'next/image';

interface ProfileSectionProps {
  userId: string;
}

export function ProfileSection({ userId }: ProfileSectionProps) {
  const params = useSearchParams();
  const mateId = params.get('mate');
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById({ userId }),
  });
  const { data: reservations } = useQuery<ReservationResponse[]>({
    queryKey: ['reservations', userId],
    queryFn: () => getReservations({ userId }),
    enabled: !!userId,
  });
  console.log('reservations', reservations);
  //TODO chatList bottomSheet 만들어서 띄우고 클릭 시 해당 챗 주소로 이동
  // const { data: chatList } = useQuery({
  //   queryKey: ['chatList', userId],
  //   queryFn: () => getChatList({ userId }),
  // });
  if (!user || isLoading) {
    return <div>Loading...</div>;
  }

  const { mutate: logout } = useLogout();

  return (
    <div className='h-full flex flex-col gap-2'>
      <UserCard user={user} />
      <div className='flex flex-1 gap-3 items-center justify-between'>
        <UserAvatar
          user={user}
          mateId={mateId || null}
          className='flex-1 h-full'
        />
        <div className='h-full flex-1 flex flex-col justify-center gap-6'>
          <Button className='w-full bg-purple-600 hover:bg-purple-700'>
            전체 채팅 목록
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='w-full bg-purple-600 hover:bg-purple-700'>
                듀오 신청 목록
              </Button>
            </DialogTrigger>
            <DialogContent className='bg-gradient-to-br from-violet-700/80 via-violet-900/80 to-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border-none p-8'>
              <DialogHeader>
                <DialogTitle className='text-2xl text-white mb-4'>
                  듀오 신청 목록
                </DialogTitle>
              </DialogHeader>
              <div className='flex flex-col gap-6 max-h-[60vh] scrollbar pr-2 overflow-y-auto'>
                {reservations ? (
                  reservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className='flex flex-col gap-3 bg-violet-800/50 rounded-xl p-5 shadow-lg border border-violet-500/30'
                    >
                      <div className='flex items-center gap-4'>
                        <div className='relative w-12 h-12 rounded-full aspect-auto bg-gradient-to-br from-violet-400 to-violet-900 flex items-center justify-center text-white font-bold text-lg shadow-inner'>
                          <Image
                            src={reservation.sender_image || '/Icon/avatar.png'}
                            alt='Sender Avatar'
                            fill
                            className='object-cover rounded-full'
                          />
                        </div>
                        <div className='flex flex-col'>
                          <span className='font-semibold text-lg text-white'>
                            {reservation.sender_nickname}
                          </span>
                          <span className='inline-block px-2 py-0.5 mt-1 text-xs font-medium rounded bg-violet-600 text-white/90 shadow'>
                            {reservation.sender_tier}
                          </span>
                        </div>
                        <div className='flex flex-1 flex-col items-end gap-3 text-sm text-violet-100/90'>
                          <span className='font-medium'>
                            {reservation.date}
                          </span>
                          <span>
                            {reservation.start_hour}시부터{' '}
                            {reservation.duration}
                            시간
                          </span>
                        </div>
                      </div>

                      <div className='text-white/90 text-base bg-violet-900/30 rounded p-3'>
                        {reservation.message}
                      </div>
                      <div className='flex gap-3 justify-end mt-2'>
                        <Button
                          variant='outline'
                          className='border-red-500 text-red-500 hover:bg-red-500/20'
                          size='sm'
                        >
                          거절
                        </Button>
                        <Button
                          className='bg-violet-600 hover:bg-violet-700 text-white'
                          size='sm'
                        >
                          수락
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center text-white/70 py-8'>
                    듀오 신청이 없습니다.
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Button
            className='w-full bg-purple-600 hover:bg-purple-700'
            onClick={() => logout()}
          >
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
}
