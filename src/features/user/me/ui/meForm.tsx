'use client';

import type { JSX } from 'react';
import { BackButton } from '@/shared/ui/backButton';
import { UserCard } from '@/entities/user/ui/userCard';
import { TierSelect } from './tierSelect';
import { OneLineArea } from './oneLineArea';
import UserEditCard from './userEditCard';
import MeFormAvatar from './meFormAvatar';
import { useMeForm } from '../hooks';
import MeFormSubmitButton from './meFormSubmitButton';
import { useRouter } from 'next/navigation';
import ModalBackground from '@/shared/ui/modalBackground';
import { MeFormData } from '../model/type';

export default function MeForm({ userId }: { userId: string }): JSX.Element {
  const {
    user,
    isLoading,
    handleSubmit,
    onSubmit,
    isEdit,
    isDirty,
    handleCancel,
    avatarPreview,
    register,
    control,
    errors,
    handleAvatarChange,
    setIsEdit,
  } = useMeForm({
    userId,
  });
  if (!user || isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <ModalBackground>
      <form
        className='relative flex min-w-[750px] min-h-[500px] gap-8 rounded-xl bg-background px-6 py-10 shadow-2xl'
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <BackButton position='left' />

        <MeFormSubmitButton
          isEdit={isEdit}
          isDirty={isDirty}
          setIsEdit={setIsEdit}
          handleCancel={handleCancel}
        />

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
              <TierSelect<MeFormData>
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
    </ModalBackground>
  );
}
