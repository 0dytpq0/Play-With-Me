import { ComponentProps, PropsWithChildren } from 'react';
import { cn } from '../lib/utils';

type GlazeBoxProps = PropsWithChildren<ComponentProps<'div'>>;

export default function GlazeBox({
  children,
  className,
  ...props
}: GlazeBoxProps) {
  return (
    <div className={cn('glaze', className)} {...props}>
      {children}
    </div>
  );
}
