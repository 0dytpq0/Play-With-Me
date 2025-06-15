'use client';

import { UserCard } from '@/entities/user/ui/userCard';
import { UserAvatar } from '@/entities/user/ui/userAvatar';
import { Button } from '@/shared/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/entities/user/api/getUserById';
import { useLogout } from '@/features/auth/login/hooks';
import { useSearchParams } from 'next/navigation';

import { ReservationListModal } from '@/features/reservate/ui';
import { getChatList } from '@/features/chat/api/getChatList';
import CustomModal from '@/shared/ui/customModal';
import ChatList from '@/features/chat/ui/chatList';

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

  //TODO chatList bottomSheet 만들어서 띄우고 클릭 시 해당 챗 주소로 이동
  // chatList 호출 했으니 유아이 구현하고 라우팅 구현할것
  const { data: chatList } = useQuery({
    queryKey: ['chatList', userId],
    queryFn: () => getChatList({ userId }),
  });
  console.log('chatList', chatList);
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
          <CustomModal title='전체 채팅 목록' triggerName='전체 채팅 목록'>
            <ChatList chatList={chatList!} mateId={mateId!} />
          </CustomModal>
          <ReservationListModal userId={user.id} />
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
