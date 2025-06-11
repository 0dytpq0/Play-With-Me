import Image from 'next/image';
import { User } from '../model/types';
import { ComponentProps } from 'react';
import { cn } from '@/shared/lib/utils';

type UserCardProps = {
  user: Pick<User, 'id' | 'game_nickname' | 'tier' | 'one_line'>;
} & ComponentProps<'div'>;

export function UserCard({ user, className, ...props }: UserCardProps) {
  const [nickname, tag] = user.game_nickname.split('#');
  return (
    <>
      <div className={cn('flex items-center gap-2', className)} {...props}>
        <div className='relative aspect-auto w-12 h-12'>
          <Image
            src={`/tier/${user.tier}.png`}
            alt='tier'
            fill
            className='object-contain'
          />
        </div>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl font-bold'>{nickname}</h1>
          <h2 className='text-lg font-semibold'>#{tag}</h2>
        </div>
      </div>
    </>
  );
}
