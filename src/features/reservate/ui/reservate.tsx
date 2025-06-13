'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { BackButton } from '@/shared/ui/backButton';
import CalendarPopover from '@/entities/auth/ui/CalendarPopover';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { useSearchParams } from 'next/navigation';
import { ReservateFormType } from '../model/types';
import { reservateSchema } from '../model/schema';
import { useReservate } from '../hooks/useReservate';
import { ReservateForm } from './reservateForm';

export default function Reservate() {
  const searchParams = useSearchParams();
  const mateId = searchParams.get('mate');
  const userId = 'a52012cd-6318-4796-a3c2-12abad64c6be';
  const { mutate, mate, isPending } = useReservate({ userId, mateId: mateId! });
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

