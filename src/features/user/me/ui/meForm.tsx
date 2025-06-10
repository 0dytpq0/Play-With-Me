'use client';

import type { JSX } from 'react';
import { BackButton } from '@/shared/ui/backButton';
import { Button } from '@/shared/ui/button';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { User } from '@/entities/user/model/types';
import { UserCard } from '@/entities/user/ui/userCard';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/shared/ui/Input';
import { ErrorMessage } from '@/shared/ui/errorMessage';

import { Textarea } from '@/shared/ui/textarea';
import { TierSelect } from './tierSelect';
import { OneLineArea } from './oneLineArea';
import UserEditCard from './userEditCard';
import { cn } from '@/shared/lib/utils';
import MeFormAvatar from './meFormAvatar';
import { MeFormData } from '../model/type';
import { meFormSchema } from '../model/schema';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '@/entities/user/api/updateUser';
import { useUpdateUser } from '../hooks/useUpdate';

export default function MeForm({ user }: { user: User }): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
  } = useForm<MeFormData>({
    resolver: zodResolver(meFormSchema),
    defaultValues: {
      profile_image: user.profile_image,
      game_nickname: user.game_nickname,
      tier: user.tier ? String(user.tier) : '',
      one_line: user.one_line ?? '',
    },
    mode: 'onChange',
  });

  const { mutate } = useUpdateUser({
    onSuccess: () => {
      setIsEdit(false);
      setAvatarPreview(null);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue('profile_image', file, { shouldDirty: true });

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setAvatarPreview(result);
      }
    };
    reader.readAsDataURL(file);

    e.target.value = '';
  };
  /**
   * 폼 제출 시 호출 (API 연결 X)
   */
  const onSubmit: SubmitHandler<MeFormData> = (data) => {
    // TODO: API 연동 예정
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'profile_image') {
          if (value instanceof File) {
            formData.append(key, value);
          }
        } else {
          formData.append(key, String(value));
        }
      }
    });
    formData.append('userId', user.id);
    mutate(formData);
  };

  /**
   * 수정 취소
   */
  const handleCancel = () => {
    reset();
    setIsEdit(false);
    setAvatarPreview(null);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <form
        className='relative flex min-w-[750px] min-h-[500px] gap-8 rounded-xl bg-background px-6 py-10 shadow-2xl'
        onSubmit={handleSubmit(onSubmit)}
      >
        <BackButton />

        {isEdit ? (
          <div className='absolute top-2 right-2 flex gap-2'>
            <Button
              type='submit'
              variant='outline'
              size='icon'
              disabled={!isDirty}
            >
              저장
            </Button>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={handleCancel}
            >
              취소
            </Button>
          </div>
        ) : (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute top-2 right-2'
            onClick={() => setIsEdit(true)}
          >
            <Pencil2Icon />
          </Button>
        )}

        {/* 왼쪽: 아바타 */}
        <MeFormAvatar
          isEdit={isEdit}
          avatarPreview={avatarPreview}
          user={user}
          handleAvatarChange={handleAvatarChange}
        />

        {/* 오른쪽: 정보 */}
        <div className='flex flex-1 flex-col justify-between'>
          <div className='flex flex-col gap-4'>
            {/* 닉네임 */}
            <div>
              {isEdit ? (
                <UserEditCard
                  user={user}
                  register={register}
                  errors={errors.game_nickname}
                />
              ) : (
                <UserCard user={user} />
              )}
            </div>

            {/* 티어 선택 */}
            {isEdit && (
              <TierSelect
                control={control}
                name='tier'
                disabled={!isEdit}
                error={errors.tier}
              />
            )}
          </div>

          {/* 한마디 소개 */}
          <OneLineArea
            isEdit={isEdit}
            register={register}
            errors={errors.one_line}
            user={user}
          />
        </div>
      </form>
    </div>
  );
}

