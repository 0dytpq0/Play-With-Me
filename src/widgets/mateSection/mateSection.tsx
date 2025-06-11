'use client';

import { UserCard } from '@/entities/user/ui/userCard';
import { UserAvatar } from '@/entities/user/ui/userAvatar';
import { Button } from '@/shared/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getUserClient } from '@/entities/user/api/getUserClient';
import { useRouter, useSearchParams } from 'next/navigation';

interface MateSectionProps {
  userId: string;
}

export function MateSection({ userId }: MateSectionProps) {
  const searchParams = useSearchParams();
  const mateId = searchParams.get('mate');
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['mate', mateId],
    queryFn: () => getUserClient({ userId: mateId || '' }),
  });

  if (!user || isLoading || isError) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserCard user={user} />
      <div className='relative flex flex-1 gap-3 items-center justify-between'>
        <UserAvatar user={user} className='fixed inset-0 -z-10' />
        <div className='fixed inset-0 -z-10 bg-black/20' />
        <div className='flex items-end flex-1 h-full'>
          <p className='text-xl truncate w-0 flex-1'>{user.one_line}</p>
        </div>
      </div>
      <div className='flex items-end gap-6'>
        <Button className='w-full bg-purple-600 hover:bg-purple-700'>
          채팅 시작
        </Button>
        <Button className='w-full bg-purple-600 hover:bg-purple-700'>
          듀오 신청
        </Button>
      </div>
    </>
  );
}
