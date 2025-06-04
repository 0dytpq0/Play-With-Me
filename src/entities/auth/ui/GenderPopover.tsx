import { GENDER_OPTIONS } from '@/entities/auth/model/schema';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Button } from '@/shared/ui/button';
import { PersonIcon } from '@radix-ui/react-icons';
import { FormControl } from '@/shared/ui/form';
import { ControllerRenderProps } from 'react-hook-form';
import { SignUpFormType } from '../model/types';

export default function GenderPopover({
  field,
}: {
  field: ControllerRenderProps<SignUpFormType, 'gender'>;
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
            {field.value
              ? GENDER_OPTIONS.find((option) => option.value === field.value)
                  ?.label
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
            <div key={option.value} className='flex items-center gap-1'>
              <RadioGroupItem
                value={option.value}
                id={`gender-${option.value}`}
              />
              <label htmlFor={`gender-${option.value}`} className='text-sm'>
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
}
