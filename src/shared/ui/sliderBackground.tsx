'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function SliderBackground({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className='fixed inset-0 z-50 flex justify-end bg-black/30'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative h-full w-full max-w-md bg-background shadow-2xl p-4 flex flex-col gap-4'
      >
        {children}
      </div>
    </div>
  );
}
