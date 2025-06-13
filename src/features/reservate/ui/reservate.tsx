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
import { Calendar } from '@/shared/ui/calendar';
import { Button } from '@/shared/ui/button';
import { BackButton } from '@/shared/ui/backButton';
import CalendarPopover from '@/entities/auth/ui/CalendarPopover';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

/**
 * Zod schema for duo reservation form.
 */
const reservateSchema = z.object({
  date: z.date({ required_error: '날짜를 선택하세요.' }),
  gameType: z.enum(['competitive', 'unrated', 'swift'], {
    required_error: '게임 종류를 선택하세요.',
  }),
  duoStartHour: z.string().regex(/^(1[0-2]|[1-9])$/, '1~12시를 선택하세요.'),
  duoStartPeriod: z.enum(['AM', 'PM']),
  duoPlayPeriod: z.string(),
  message: z.string().max(50, '최대 50자까지 입력 가능합니다.').optional(),
});

type ReservateFormType = z.infer<typeof reservateSchema>;

export default function Reservate() {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<ReservateFormType>({
    resolver: zodResolver(reservateSchema),
    mode: 'onTouched',
    defaultValues: {
      date: undefined,
      gameType: undefined,
      duoStartHour: '',
      duoStartPeriod: 'AM',
      duoPlayPeriod: '',
      message: '',
    },
  });

  /**
   * 듀오 시간 선택 유효성 검사 (전/후 1시간 불가)
   */

  const onSubmit: SubmitHandler<ReservateFormType> = async (data) => {
    setSubmitting(true);
    // TODO: submit logic
    setSubmitting(false);
  };

  return (
    <>
      <h2 className='text-xl font-bold'>듀오 신청</h2>
      <BackButton position='right' />
      <h1>아이디</h1>
      <h1>랭크</h1>
      <Form {...form}>
        <form
          className='flex-1 flex flex-col justify-between'
          onSubmit={form.handleSubmit((data) => {
            const submitData = {
              ...data,
              duoStart: data.duoStartHour,
            };
            console.log('data', data);
            onSubmit(submitData as any);
          })}
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
                                    j === 3 ? 'fullTime' : (h * 2).toString()
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
                      placeholder='한 줄 메세지 (최대 50자)'
                      maxLength={50}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' className='w-full' disabled={submitting}>
            {submitting ? '신청 중...' : '신청하기'}
          </Button>
        </form>
      </Form>
    </>
  );
}

