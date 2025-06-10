import { Input } from '@/shared/ui/Input';
import { cn } from '@/shared/lib/utils';
import { User } from '@/entities/user/model/types';
import Image from 'next/image';
import { useRef } from 'react';

export default function MeFormAvatar({
  isEdit,
  avatarPreview,
  user,
  handleAvatarChange,
}: {
  isEdit: boolean;
  avatarPreview: string | null;
  user: User;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const avatarInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='flex items-center justify-center'>
      <Input
        type='file'
        accept='image/*'
        ref={avatarInputRef}
        className='hidden'
        onChange={handleAvatarChange}
      />
      <div
        className={cn(
          'relative h-full w-[250px] rounded-md bg-muted overflow-hidden cursor-default',
          isEdit && 'cursor-pointer hover:scale-105 transition-transform'
        )}
        onClick={() => {
          if (isEdit && avatarInputRef.current) {
            avatarInputRef.current.click();
          }
        }}
        aria-label={isEdit ? '프로필 이미지 변경' : undefined}
        tabIndex={isEdit ? 0 : -1}
        role='button'
      >
        <Image
          src={avatarPreview || user.profile_image || '/Icon/avatar.png'}
          alt='avatar'
          fill
          className='object-cover'
        />
      </div>
    </div>
  );
}
