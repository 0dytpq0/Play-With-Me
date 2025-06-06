'use client';

import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';
import { Cross2Icon } from '@radix-ui/react-icons';

export function BackButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.back();
      }}
      variant={'ghost'}
      size={'icon'}
      className='absolute top-2 left-2'
    >
      <Cross2Icon />
    </Button>
  );
}
