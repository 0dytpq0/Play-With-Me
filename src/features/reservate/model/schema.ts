import { z } from 'zod';
import { ReservateFormType } from './types';

export const reservateSchema = z.object({
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
}) satisfies z.ZodType<ReservateFormType>;
