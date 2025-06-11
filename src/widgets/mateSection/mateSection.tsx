'use client';

import { UserCard } from '@/entities/user/ui/userCard';
import { UserAvatar } from '@/entities/user/ui/userAvatar';
import { Button } from '@/shared/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getUserClient } from '@/entities/user/api/getUserClient';

interface MateSectionProps {
  userId: string;
}
{
  /* <div>
                <h1>player#kr1</h1>
                <div>티어 이미지</div>
              </div>
              <div>자기 소개 한마디</div>
              <div>채팅 걸기</div>
              <div>듀오 신청</div> */
}
export function MateSection({ userId }: MateSectionProps) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['mate', userId],
    queryFn: () => getUserClient({ userId }),
  });
  if (!user || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-full flex flex-col gap-2'>
      <UserCard user={user} />
      <div className='flex flex-1 gap-3 items-center justify-between'>
        <UserAvatar user={user} className='flex-1 h-full' />
        <div className='h-full flex-1 flex flex-col justify-center gap-6'>
          <Button className='w-full bg-purple-600 hover:bg-purple-700'>
            전체 채팅 목록
          </Button>
          <Button className='w-full bg-purple-600 hover:bg-purple-700'>
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
}
