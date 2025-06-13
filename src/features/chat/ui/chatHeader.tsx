'use client';

import { genGradient } from '../lib/utils';
import { useMemo } from 'react';

interface ChatHeaderProps {
  gameNickname: string;
  mateId: string;
}

export default function ChatHeader({ gameNickname, mateId }: ChatHeaderProps) {
  const memoizedGradient = useMemo(() => genGradient(), [mateId]);
  const [nickname, tag] = gameNickname?.split('#') || [];

  return (
    <div className='flex gap-x-2 p-2 items-end'>
      <span
        className={`text-3xl font-bold bg-clip-text text-transparent ${memoizedGradient}`}
      >
        {nickname}
      </span>
      <span className='text-xl font-bold text-muted-foreground'>#{tag}</span>
    </div>
  );
}
