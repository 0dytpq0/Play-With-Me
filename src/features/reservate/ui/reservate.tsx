'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/Input';
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
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getUserClient } from '@/entities/user/api/getUserClient';
import { createReservation } from '../api/createReservation';

const reservateSchema = z.object({
  date: z.date({ required_error: '날짜를 선택하세요.' }),
  gameType: z.enum(['competitive', 'unrated', 'swift'], {
    required_error: '게임 종류를 선택하세요.',
  }),
  duoStartHour: z.string().regex(/^(1[0-2]|[1-9])$/, '1~12시를 선택하세요.'),
  duoStartPeriod: z.enum(['AM', 'PM']),
  duoPlayPeriod: z.enum(['2', '4', '6', 'fulltime'], {
    required_error: '플레이 시간을 선택하세요.',
  }),
  message: z.string().max(40, '최대 40자까지 입력 가능합니다.').optional(),
  status: z.enum(['pending', 'accepted', 'rejected']),
});

type ReservateFormType = z.infer<typeof reservateSchema>;

export default function Reservate() {
  const searchParams = useSearchParams();
  const mateId = searchParams.get('mate');

  const { data: mate } = useQuery({
    queryKey: ['mate', mateId],
    queryFn: () => getUserClient({ userId: mateId! }),
    enabled: !!mateId,
  });

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

  const { mutate } = useMutation({
    mutationFn: createReservation,
  });

  const onSubmit: SubmitHandler<ReservateFormType> = async (data) => {
    const formData = new FormData();
    const startHour =
      data.duoStartPeriod === 'AM'
        ? Number(data.duoStartHour)
        : Number(data.duoStartHour) + 12;
    const duration =
      data.duoPlayPeriod === 'fulltime' ? 24 : Number(data.duoPlayPeriod);
    formData.append('sender_id', 'a52012cd-6318-4796-a3c2-12abad64c6be');
    formData.append('target_id', mateId!);
    formData.append('date', data.date.toISOString().slice(0, 10));
    formData.append('start_hour', startHour.toString());
    formData.append('duration', duration.toString());
    formData.append('game_type', data.gameType);
    formData.append('message', data.message || '');
    mutate(formData);
  };

  return (
    <>
      <h2 className='text-xl font-bold'>듀오 신청</h2>
      <BackButton position='right' />
      <div className='flex items-end gap-2'>
        <span className='text-2xl font-bold'>{nickname}</span>
        <span className='text-lg font-bold'>#{tag}</span>
      </div>
      <Form {...form}>
        <form
          className='flex-1 flex flex-col justify-between'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='flex flex-col'>
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <CalendarPopover<ReservateFormType> field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='gameType'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='게임 종류 선택' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='competitive'>랭크</SelectItem>
                        <SelectItem value='unrated'>일반</SelectItem>
                        <SelectItem value='swift'>신속</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='duoStartPeriod'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex gap-2'>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className='flex gap-2'
                        >
                          <RadioGroupItem value='AM' id='start-am' />
                          <label htmlFor='start-am' className='text-xs px-1'>
                            AM
                          </label>
                          <RadioGroupItem value='PM' id='start-pm' />
                          <label htmlFor='start-pm' className='text-xs px-1'>
                            PM
                          </label>
                        </RadioGroup>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className='flex w-full gap-2'>
                <FormField
                  control={form.control}
                  name='duoStartHour'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='시작 시간 선택' />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(
                              (h) => (
                                <SelectItem key={h} value={h.toString()}>
                                  {h}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='duoPlayPeriod'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='플레이 시간 선택' />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 4 }, (_, i) => i + 1).map(
                              (h, j) => (
                                <SelectItem
                                  key={h}
                                  value={
                                    j === 3 ? 'fulltime' : (h * 2).toString()
                                  }
                                >
                                  {j === 3 ? '종일' : (h * 2).toString()}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>메세지 (선택)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='한 줄 메세지 (최대 40자)'
                      maxLength={40}
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' className='w-full'>
            {'신청하기'}
          </Button>
        </form>
      </Form>
    </>
  );
}

