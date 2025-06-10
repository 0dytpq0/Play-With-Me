'use client';

import type { JSX } from 'react';
import { BackButton } from '@/shared/ui/backButton';
import { Button } from '@/shared/ui/button';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useState } from 'react';
import { User } from '@/entities/user/model/types';
import { UserCard } from '@/entities/user/ui/userCard';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/shared/ui/Input';
import { InvisiblePlaceholder } from '@/shared/ui/InvisiblePlaceholder';

/**
 * 유저 정보 수정 폼의 필드 타입
 */
const meFormSchema = z.object({
  game_nickname: z.string().refine((val) => /^[^#]+#[^#]+$/.test(val), {
    message: '발로란트 닉네임은 "이름#태그" 형식이어야 합니다. 예: player#KR1',
  }),
  tier: z.string().min(1, '티어를 선택해주세요.'),
  oneLine: z.string().max(50, '한마디 소개는 50자 이하로 입력해주세요.'),
});

export type MeFormData = z.infer<typeof meFormSchema>;

/**
 * MeForm - 유저 정보 수정 폼 (레이아웃 및 상태/검증만, 제출/통신 X)
 * @param user - 현재 유저 정보
 */
export default function MeForm({ user }: { user: User }): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<MeFormData>({
    resolver: zodResolver(meFormSchema),
    defaultValues: {
      game_nickname: user.game_nickname,
      tier: user.tier ? String(user.tier) : '',
      oneLine: user.one_line ?? '',
    },
    mode: 'onChange',
  });

  /**
   * 폼 제출 시 호출 (API 연결 X)
   */
  const onSubmit: SubmitHandler<MeFormData> = (_data) => {
    // TODO: API 연동 예정
    setIsEdit(false);
  };

  /**
   * 수정 취소
   */
  const handleCancel = () => {
    reset();
    setIsEdit(false);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <form
        className='relative flex min-w-[750px] min-h-[500px] gap-8 rounded-xl bg-background px-6 py-10 shadow-2xl'
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
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
        <div className='flex items-center justify-center'>
          <div className='relative h-full w-[250px] rounded-md bg-muted overflow-hidden'>
            <Image
              src={user.profile_image || '/Icon/avatar.png'}
              alt='avatar'
              fill
              className='object-cover'
              sizes='250px'
            />
          </div>
        </div>

        {/* 오른쪽: 정보 */}
        <div className='flex flex-1 flex-col gap-4'>
          {/* 닉네임 */}
          <div>
            {isEdit ? (
              <div className='flex gap-2'>
                <div className='w-12 h-12 relative aspect-auto'>
                  <Image
                    src={`/tier/${user.tier}.png`}
                    alt='avatar'
                    fill
                    className='object-cover'
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <Input
                    type='text'
                    {...register('game_nickname')}
                    className='w-40'
                    placeholder='닉네임 변경'
                    aria-invalid={!!errors.game_nickname}
                    autoFocus
                  />

                  <InvisiblePlaceholder
                    message={errors.game_nickname?.message}
                    className='mt-1 text-xs text-red-500'
                  />
                </div>
              </div>
            ) : (
              <UserCard user={user} />
            )}
          </div>

          {/* 티어 선택 */}
          <div>
            <select
              className='w-24 rounded border mx-2 px-2 py-1 text-sm'
              disabled={!isEdit}
              {...register('tier')}
              aria-invalid={!!errors.tier}
            >
              <option value=''>티어 선택</option>
              <option value='BRONZE'>BRONZE</option>
              <option value='SILVER'>SILVER</option>
              <option value='GOLD'>GOLD</option>
              <option value='PLATINUM'>PLATINUM</option>
              <option value='DIAMOND'>DIAMOND</option>
              <option value='MASTER'>MASTER</option>
              <option value='GRANDMASTER'>GRANDMASTER</option>
              <option value='CHALLENGER'>CHALLENGER</option>
            </select>
            {errors.tier && (
              <p className='mt-1 text-xs text-red-500'>{errors.tier.message}</p>
            )}
          </div>

          {/* 한마디 소개 */}
          <div className='w-full max-w-[250px]'>
            {isEdit ? (
              <>
                <Input
                  type='text'
                  {...register('oneLine')}
                  placeholder='한마디 소개'
                  aria-invalid={!!errors.oneLine}
                />
                <InvisiblePlaceholder
                  message={errors.oneLine?.message}
                  className='mt-1 text-xs text-red-500'
                />
              </>
            ) : (
              <p className='truncate text-muted-foreground p-2'>
                {user.one_line}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

