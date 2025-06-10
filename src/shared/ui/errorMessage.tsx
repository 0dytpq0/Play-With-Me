import { JSX } from 'react';
import { cn } from '../lib/utils';

type ErrorMessageProps = {
  className?: string;
  message?: string;
  isError?: boolean;
  as?: keyof JSX.IntrinsicElements;
};

export function ErrorMessage({
  className,
  message,
  isError,
  as = 'p',
}: ErrorMessageProps) {
  const Tag = as;
  return (
    <Tag className={cn(`${className ?? ''} ${isError && 'text-red-500'}`)}>
      {message}
    </Tag>
  );
}
