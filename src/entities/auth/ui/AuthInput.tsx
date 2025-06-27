import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/Input';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface AuthInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder: string;
  type?: string;
}

export function AuthInput<T extends FieldValues>({
  form,
  name,
  placeholder,
  type = 'text',
}: AuthInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
