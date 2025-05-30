'use client';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/Input';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';
import { CalendarIcon, PersonIcon } from '@radix-ui/react-icons';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { z } from 'zod';
import { format } from 'date-fns';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/shared/ui/form';

const GENDER_OPTIONS = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' },
] as const;

const signUpSchema = z
  .object({
    email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
    nickname: z
      .string()
      .min(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' }),
    password: z
      .string()
      .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }),
    confirmPassword: z.string(),
    valorantNickname: z
      .string()
      .optional()
      .refine((val) => !val || /^[^#]+#[^#]+$/.test(val), {
        message:
          '발로란트 닉네임은 "이름#태그" 형식이어야 합니다. 예: player#KR1',
      }),
    gender: z.enum(
      [...GENDER_OPTIONS.map((g) => g.value)] as [string, ...string[]],
      { required_error: '성별을 선택해주세요.' }
    ),
    birthday: z.date({ required_error: '생년월일을 선택해주세요.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type SignUpFormType = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      valorantNickname: '',
      gender: undefined,
      birthday: undefined,
    },
  });

  const onSubmit = (data: SignUpFormType): void => {
    // TODO: Replace with actual submission logic (API call, etc.)
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div className='w-full  max-w-[600px] bg-white shadow-lg rounded-lg p-6 mx-auto'>
      <h1 className='text-4xl font-bold text-center'>회원가입</h1>
      <Form {...form}>
        <form
          className='mt-6 flex flex-col gap-'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='이메일' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='nickname'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='닉네임' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='비밀번호' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='비밀번호 확인'
                    type='password'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='valorantNickname'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='발로란트 닉네임' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-4'>
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          className={
                            'w-full pl-3 text-left font-normal' +
                            (!field.value ? ' text-muted-foreground' : '')
                          }
                        >
                          {field.value
                            ? GENDER_OPTIONS.find(
                                (option) => option.value === field.value
                              )?.label
                            : '성별 선택'}
                          <PersonIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-4' align='start'>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className='flex gap-4'
                      >
                        {GENDER_OPTIONS.map((option) => (
                          <div
                            key={option.value}
                            className='flex items-center gap-1'
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={`gender-${option.value}`}
                            />
                            <label
                              htmlFor={`gender-${option.value}`}
                              className='text-sm'
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='birthday'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          className={
                            'w-full pl-3 text-left font-normal' +
                            (!field.value ? ' text-muted-foreground' : '')
                          }
                        >
                          {field.value
                            ? format(field.value, 'yyyy-MM-dd')
                            : '생년월일 선택'}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit'>회원가입</Button>
        </form>
      </Form>
    </div>
  );
}
