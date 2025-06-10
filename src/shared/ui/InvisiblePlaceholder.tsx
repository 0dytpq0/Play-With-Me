import { JSX } from 'react';
import { cn } from '../lib/utils';

type InvisiblePlaceholderProps = {
  className?: string;
  message?: string;
  as?: keyof JSX.IntrinsicElements;
};

export function InvisiblePlaceholder({
  className,
  message,
  as = 'p',
}: InvisiblePlaceholderProps) {
  const Tag = as;
  console.log('message', message);
  return (
    <Tag className={cn(`${className ?? ''} ${message ? '' : 'invisible'}`)}>
      {message || 'invisible'}
    </Tag>
  );
}
