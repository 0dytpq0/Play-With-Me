'use client';

import { getUsersByTier } from '@/entities/user/api/getAllUsers';
import GlazeBox from '@/shared/ui/glazeBox';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/entities/user/model/types';
import { UserListSectionFormData } from '../model/types';
import UserListSectionHeader from './userListSectionHeader';
import UserList from './userList';

interface UserListSectionProps {
  userId: string;
}

export function UserListSection({ userId }: UserListSectionProps) {
  const { control, watch } = useForm<UserListSectionFormData>({
    defaultValues: { tier: '' },
  });

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ['tierUsers', watch('tier')],
    queryFn: () => getUsersByTier(watch('tier')),
    refetchInterval: 10000 * 60 * 5,
  });

  if (isError) {
    return (
      <GlazeBox className='w-full flex-1 flex flex-col min-h-0'>
        <div className='w-full h-full flex items-center justify-center'>
          <span className='text-2xl font-bold text-white'>
            유저 목록 호출에 실패하였습니다.
          </span>
        </div>
      </GlazeBox>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <GlazeBox className='w-full flex-1 flex flex-col min-h-0'>
      <UserListSectionHeader control={control} />
      <UserList users={users!} userId={userId} />
    </GlazeBox>
  );
}
