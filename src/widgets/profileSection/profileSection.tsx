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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { getReservations } from '@/features/reservate/api';
import { ReservationResponse } from '@/features/reservate/model/types';

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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>듀오 신청 목록</DialogTitle>
              </DialogHeader>
              {reservations?.map((reservation) => (
                <div key={reservation.id}>
                  <h1>유저 이름</h1>
                  <span>날짜</span>
                  <span>시간</span>
                  <span>기간</span>
                  <span>메세지</span>
                  <span>거절 수락</span>
                </div>
              ))}
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
