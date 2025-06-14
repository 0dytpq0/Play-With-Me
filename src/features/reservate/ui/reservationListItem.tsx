import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import { memo } from 'react';
import { genTierToKr } from '../lib/genTierToKr';

export type ListItemType = {
  id: string;
  sender_nickname: string;
  sender_tier: string;
  sender_image: string;
  date: string;
  start_hour: number;
  duration: number;
  message: string;
};

interface ReservationListItemProps {
  item: ListItemType;
  onAccept: () => void;
  onReject: () => void;
}

function ReservationListItem({
  item,
  onAccept,
  onReject,
}: ReservationListItemProps) {
  return (
    <div className='flex flex-col gap-3 bg-violet-800/50 rounded-xl p-5 shadow-lg border border-violet-500/30'>
      <div className='flex items-center gap-4'>
        <div className='relative w-12 h-12 rounded-full aspect-auto bg-gradient-to-br from-violet-400 to-violet-900 flex items-center justify-center text-white font-bold text-lg shadow-inner'>
          <Image
            src={item.sender_image || '/Icon/avatar.png'}
            alt='Sender Avatar'
            fill
            className='object-cover rounded-full'
          />
        </div>
        <div className='flex flex-col'>
          <span className='font-semibold text-lg text-white'>
            {item.sender_nickname}
          </span>
          <span className='font-medium text-center px-2 py-0.5 text-xs rounded bg-violet-600 text-white/90 shadow'>
            {genTierToKr(item.sender_tier)}
          </span>
        </div>
        <div className='flex flex-1 flex-col items-end gap-3 text-sm text-violet-100/90'>
          <span className='font-medium'>{item.date}</span>
          <span>
            {item.start_hour}시부터 {item.duration}시간
          </span>
        </div>
      </div>
      <div className='text-white/90 text-base bg-violet-900/30 rounded p-3'>
        {item.message}
      </div>
      <div className='flex gap-3 justify-end mt-2'>
        <Button
          onClick={onReject}
          variant='outline'
          className='border-red-500 text-red-500 hover:bg-red-500/20'
          size='sm'
        >
          거절
        </Button>
        <Button
          onClick={onAccept}
          className='bg-violet-600 hover:bg-violet-700 text-white'
          size='sm'
        >
          수락
        </Button>
      </div>
    </div>
  );
}

export default memo(ReservationListItem);
