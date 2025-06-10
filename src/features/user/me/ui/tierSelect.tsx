import { Controller, Control, FieldError } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { ErrorMessage } from '@/shared/ui/errorMessage';
import { cn } from '@/shared/lib/utils';
import { MeFormData } from '../model/type';

const TIER_OPTIONS = [
  { value: 'bronze', label: '브론즈' },
  { value: 'silver', label: '실버' },
  { value: 'gold', label: '골드' },
  { value: 'platinum', label: '플레티넘' },
  { value: 'diamond', label: '다이아몬드' },
  { value: 'ascendant', label: '초월자' },
  { value: 'immortal', label: '불멸' },
  { value: 'radiant', label: '레디언트' },
];

export type TierSelectProps = {
  control: Control<MeFormData>;
  name: 'tier';
  disabled?: boolean;
  error?: FieldError;
  placeholder?: string;
  className?: string;
};

/**
 * Controller 기반 TierSelect (react-hook-form 커스텀 컴포넌트 연동)
 */
export function TierSelect({
  control,
  name,
  disabled,
  error,
  placeholder = '티어 선택',
  className,
}: TierSelectProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            disabled={disabled}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger className='w-[180px] text-muted-foreground'>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{placeholder}</SelectLabel>
                {TIER_OPTIONS.map((tier) => (
                  <SelectItem key={tier.value} value={tier.value}>
                    {tier.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      <ErrorMessage
        message={error?.message || '티어를 선택해주세요.'}
        isError={!!error}
        className='mt-3 text-xs text-muted-foreground'
      />
    </div>
  );
}

