'use client';

import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cn } from '../lib/utils';

interface BackButtonProps {
  className?: string;
  position: 'right' | 'left';
}

export function BackButton({ className, position }: BackButtonProps) {
  const buttonPosition = position === 'right' ? 'right-2' : 'left-2';

  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.back();
      }}
      variant={'ghost'}
      size={'icon'}
      className={cn('absolute top-2', buttonPosition, className)}
    >
      <Cross2Icon />
    </Button>
  );
}
