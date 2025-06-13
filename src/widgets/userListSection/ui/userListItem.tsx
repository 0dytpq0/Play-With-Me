import { User } from '@/entities/user/model/types';
import Image from 'next/image';
import { memo } from 'react';
import { useRouter } from 'next/navigation';

const UserListItem = ({ user, userId }: { user: User; userId: string }) => {
  const router = useRouter();
  const handleClick = () => {
    if (user.id === userId) {
      return;
    }
    router.replace(`?mate=${user.id}`);
  };
  console.log('user.id, userId', user.id, userId);
  const [nickname, tag] = user.game_nickname.split('#');
  return (
    <div
      key={user.id}
      className='flex gap-2 items-center w-full max-h-24 hover:backdrop-blur-md hover:rounded-2xl hover:pl-4 transition-all'
    >
      <div
        onClick={handleClick}
        className={`relative min-w-24 w-24 h-24 aspect-auto rounded-lg overflow-hidden bg-white/50 cursor-pointer ${user.id === userId && 'cursor-not-allowed'}`}
      >
        <Image
          src={user.profile_image || '/Icon/avatar.png'}
          alt={user.game_nickname}
          fill
          className='object-cover'
        />
      </div>
      <div className='flex flex-1 flex-col h-full gap-1'>
        <div className='flex gap-1 items-center'>
          <p className='font-bold text-lg'>{nickname}</p>
          <p className='text-sm'>#{tag}</p>
        </div>
        <p className='text-sm line-clamp-3'>{user.one_line}</p>
      </div>
    </div>
  );
};

export default memo(UserListItem);
