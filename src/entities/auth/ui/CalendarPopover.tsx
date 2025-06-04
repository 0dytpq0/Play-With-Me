import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { FormControl } from '@/shared/ui/form';
import { ControllerRenderProps } from 'react-hook-form';
import { SignUpFormType } from '../model/types';

export default function CalendarPopover({
  field,
}: {
  field: ControllerRenderProps<SignUpFormType, 'birthday'>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            type='button'
            variant='outline'
            className='w-full px-2 text-muted-foreground'
          >
            {field.value ? format(field.value, 'yyyy-MM-dd') : '생년월일 선택'}
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
  );
}
