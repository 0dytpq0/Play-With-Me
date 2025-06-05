import Image from 'next/image';
import { User } from '../model/types';
import { ComponentProps } from 'react';
import { cn } from '@/shared/lib/utils';

type UserAvatarProps = {
  user: Pick<User, 'profile_image' | 'id'>;
} & ComponentProps<'div'>;

export function UserAvatar({ user, className, ...props }: UserAvatarProps) {
  return (
    <div className={cn('relative aspect-auto', className)} {...props}>
      <Image
        src={user.profile_image || '/Icon/avatar.png'}
        alt='avatar'
        fill
        className='object-contain'
      />
    </div>
  );
}
