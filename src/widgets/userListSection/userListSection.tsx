'use client';

import { getUsersByTier } from '@/entities/user/api/getAllUsers';
import { TierSelect } from '@/features/user/me/ui/tierSelect';
import GlazeBox from '@/shared/ui/glazeBox';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/entities/user/model/types';
import { ApiResponse } from '@/shared/types/apiTypes';
import Image from 'next/image';

interface UserListSectionProps {
  userId: string;
}

type UserListSectionFormData = {
  tier: string;
};

export function UserListSection({ userId }: UserListSectionProps) {
  const { control, watch } = useForm<UserListSectionFormData>({
    defaultValues: { tier: '' },
  });
  const { data: users, isLoading } = useQuery<ApiResponse<User[]>>({
    queryKey: ['tierUsers', watch('tier')],
    queryFn: () => getUsersByTier(watch('tier')),
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
  // 에러 객체일 경우 처리
  if ('status' in users) {
    return <div>{users.message}</div>;
  }
  return (
    <GlazeBox className='w-full flex-1 flex flex-col min-h-0'>
      <div className='flex justify-between items-center h-9'>
        <h2 className='text-2xl font-bold'>티어별 유저 목록</h2>
        <TierSelect<UserListSectionFormData>
          control={control}
          name='tier'
          placeholder='티어 선택'
          triggerClassName='data-[placeholder]:text-white'
          isMessage={false}
        />
      </div>
      <div className='flex-1 min-h-0 overflow-y-auto mt-4 w-full grid lg:grid-cols-3 md:grid-cols-2 gap-3 h-full'>
        {users?.map((user: User) => {
          const [nickname, tag] = user.game_nickname.split('#');
          return (
            <div
              key={user.id}
              className='flex gap-2 items-center w-full max-h-24'
            >
              <div className='relative min-w-24 w-24 h-24 aspect-auto rounded-lg overflow-hidden bg-white/50'>
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
        })}
      </div>
    </GlazeBox>
  );
}
