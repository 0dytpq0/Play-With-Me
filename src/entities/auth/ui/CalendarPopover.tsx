import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { FormControl } from '@/shared/ui/form';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export default function CalendarPopover<T extends FieldValues>({
  field,
}: {
  field: ControllerRenderProps<T>;
}) {
  function isBeforeToday(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            type='button'
            variant='outline'
            className='w-full px-2 text-muted-foreground hover:scale-100'
          >
            {field.value
              ? format(field.value, 'yyyy-MM-dd')
              : field.name === 'birthday'
                ? '생년월일 선택'
                : '날짜 선택'}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) => {
            if (field.name === 'birthday') {
              return date > new Date() || date < new Date('1900-01-01');
            }
            return isBeforeToday(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
