import { getUser } from '@/entities/user/api/getUser';
import { UserAvatar, UserCard } from '@/entities/user/ui';
import { Button } from '@/shared/ui/button';

export default async function MePage() {
  const user = await getUser('d92d24e6-c449-44a0-b5cc-2619b627b5d8');
  console.log(user.profile_image || '/Icon/avatar.png');
  return (
    <div className='h-full flex flex-col gap-2'>
      <UserCard user={user} />
      <div className='flex flex-1 gap-3 items-center justify-between'>
        <UserAvatar user={user} className='w-1/2 h-full' />
        <div className='h-full flex flex-col justify-center gap-6 flex-1'>
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
