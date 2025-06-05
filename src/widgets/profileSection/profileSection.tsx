import { UserCard } from '@/entities/user/ui/userCard';
import { UserAvatar } from '@/entities/user/ui/userAvatar';
import { Button } from '@/shared/ui/button';
import { User } from '@/entities/user/model/types';

interface ProfileSectionProps {
  user: User;
}

export function ProfileSection({ user }: ProfileSectionProps) {
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
