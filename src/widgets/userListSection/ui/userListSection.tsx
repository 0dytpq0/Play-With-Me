'use client';

import { getUsersByTier } from '@/entities/user/api/getAllUsers';
import GlazeBox from '@/shared/ui/glazeBox';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/entities/user/model/types';
import { ApiResponse } from '@/shared/types/apiTypes';
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

  const { data: users, isLoading } = useQuery<ApiResponse<User[]>>({
    queryKey: ['tierUsers', watch('tier')],
    queryFn: () => getUsersByTier(watch('tier')),
    refetchInterval: 10000 * 60 * 5,
  });

  const fakeUsers = [
    {
      id: '1',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line: '자기 소개 한마디',
    },
    {
      id: '2',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line: '자기 소개 한마디',
    },
    {
      id: '3',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line:
        '자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디',
    },
    {
      id: '4',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line:
        '자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디',
    },
    {
      id: '5',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line:
        '자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디',
    },
    {
      id: '7',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line:
        '자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기紹介 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디',
    },
    {
      id: '8',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line:
        '자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기紹介 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디',
    },
    {
      id: '9',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line:
        '자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기紹介 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디',
    },
    {
      id: '10',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line:
        '자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기紹介 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디',
    },
    {
      id: '11',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line:
        '자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기紹介 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디',
    },
    {
      id: '12',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line:
        '자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기소개 한마디자기 소개 한마디자기 소개 한마디자기 소개 한마디자기紹介 한마디자기 소개 한마디자기 소개 한마디자기소개 한마디',
    },
    {
      id: '13',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line:
        '자기 소개 한마디자기 소개 한마디자기소개 한마디자기 소개 한마디자기 소개 한마디자기소개 한마디자기 소개 한마디자기 소개 한마디자기소개 한마디자기소개 한마디',
    },
    {
      id: '14',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line:
        '자기 소개 한마디자기 소개 한마디자기소개 한마디자기 소개 한마디자기소개 한마디자기 소개 한마디자기소개 한마디자기소개 한마디',
    },
    {
      id: '15',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line:
        '자기 소개 한마디자기 소개 한마디자기소개 한마디자기소개 한마디자기소개 한마디',
    },
    {
      id: '16',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line: '자기 소개 한마디자기소개 한마디자기소개 한마디',
    },
    {
      id: '17',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line: '자기 소개 한마디',
    },
    {
      id: '18',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line: '자기 소개 한마디',
    },
    {
      id: '19',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line: '자기 소개 한마디',
    },
    {
      id: '20',
      game_nickname: '유저 닉네임#1234',
      profile_image: '/Icon/avatar.png',
      one_line: '자기 소개 한마디',
    },
  ];

  if (!users || isLoading) {
    return <div>Loading...</div>;
  }
  if ('status' in users) {
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
  return (
    <GlazeBox className='w-full flex-1 flex flex-col min-h-0'>
      <UserListSectionHeader control={control} />
      <UserList users={users} />
    </GlazeBox>
  );
}
