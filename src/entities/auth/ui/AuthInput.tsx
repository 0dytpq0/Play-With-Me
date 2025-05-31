import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/Input';

interface AuthInputProps {
  form: any;
  name: string;
  placeholder: string;
  type?: string;
}

export function AuthInput({
  form,
  name,
  placeholder,
  type = 'text',
}: AuthInputProps) {
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
