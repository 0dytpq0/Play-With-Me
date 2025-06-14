'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BackButton } from '@/shared/ui/backButton';
import { ReservateFormType } from '../model/types';
import { reservateSchema } from '../model/schema';
import { useReservate } from '../hooks/useReservate';
import { ReservateForm } from './reservateForm';

interface ReservateProps {
  mateId: string;
  userId: string;
}

export function Reservate({ mateId, userId }: ReservateProps) {
  const { mutate, mate, isPending } = useReservate({ userId, mateId });
  const [nickname, tag] = mate?.game_nickname.split('#') || [];

  const form = useForm<ReservateFormType>({
    resolver: zodResolver(reservateSchema),
    mode: 'onTouched',
    defaultValues: {
      date: undefined,
      gameType: undefined,
      duoStartHour: '',
      duoStartPeriod: 'AM',
      duoPlayPeriod: '2',
      message: '',
      status: 'pending',
    },
  });

  const onSubmit: SubmitHandler<ReservateFormType> = async (data) => {
    mutate(data);
  };

  return (
    <>
      <h2 className='text-xl font-bold'>듀오 신청</h2>
      <BackButton position='right' />
      <div className='flex items-end gap-2'>
        <span className='text-2xl font-bold'>{nickname}</span>
        <span className='text-lg font-bold'>#{tag}</span>
      </div>
      <ReservateForm form={form} onSubmit={onSubmit} isLoading={isPending} />
    </>
  );
}
