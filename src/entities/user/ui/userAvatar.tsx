import Image from 'next/image';
import Link from 'next/link';
import { User } from '../model/types';
import { ComponentProps } from 'react';
import { cn } from '@/shared/lib/utils';

/**
 * 유저 프로필 아바타(마우스 오버시 마이페이지 이동 오버레이)
 * @param user 유저 객체 (profile_image, id)
 * @param className 추가 클래스
 * @param props div props
 */

export function UserAvatar({
  user,
  className,
  ...props
}: {
  user: Pick<User, 'profile_image' | 'id'>;
} & ComponentProps<'div'>) {
  return (
    <Link href='/protected/me' className={cn('group', className)} tabIndex={-1}>
      <div
        className={cn(
          'relative aspect-auto cursor-pointer overflow-hidden w-full h-full rounded-lg'
        )}
        {...props}
      >
        <Image
          src={user.profile_image || '/Icon/avatar.png'}
          alt='avatar'
          fill
          className='object-cover transition-all duration-300'
        />
        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10`}
        >
          <span className='text-white font-bold select-none'>
            유저 페이지로 이동
          </span>
        </div>
      </div>
    </Link>
  );
}
