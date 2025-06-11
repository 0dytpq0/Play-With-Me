import { User } from '@/entities/user/model/types';
import Image from 'next/image';
import { memo } from 'react';
import { useRouter } from 'next/navigation';

const UserListItem = ({ user }: { user: User }) => {
  const router = useRouter();
  const handleClick = () => {
    router.replace(`?mate=${user.id}`);
  };
  const [nickname, tag] = user.game_nickname.split('#');
  return (
    <div key={user.id} className='flex gap-2 items-center w-full max-h-24'>
      <div
        onClick={handleClick}
        className='relative min-w-24 w-24 h-24 aspect-auto rounded-lg overflow-hidden bg-white/50 cursor-pointer'
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
