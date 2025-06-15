import Image from 'next/image';
import { ChatListItemType } from '../model/types';
import { memo } from 'react';
import Link from 'next/link';
import { DialogClose } from '@/shared/ui/dialog';

interface ChatListItemProps {
  chat: ChatListItemType;
}

export function ChatListItem({ chat }: ChatListItemProps) {
  return (
    <DialogClose asChild className='transition-all'>
      <Link
        href={`/protected/chat?mate=${chat.sender_id}&modal=me`}
        key={chat.id}
        className='flex items-center gap-4 bg-violet-800/50 rounded-xl p-4 shadow-lg border border-violet-500/30 hover:bg-violet-700/60 transition-colors cursor-pointer'
      >
        <div className='relative w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold'>
          <Image
            src={chat.sender.profile_image || '/Icon/avatar.png'}
            alt={chat.sender.nickname}
            fill
            className='object-cover rounded-full'
            sizes='48px'
          />
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center justify-between'>
            <span className='mb-1 font-semibold text-white'>
              {chat.sender.game_nickname}
            </span>
            <span className='text-xs text-violet-200 ml-2 shrink-0'>
              {new Date(chat.created_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div className='text-sm text-violet-100 truncate'>{chat.content}</div>
        </div>
      </Link>
    </DialogClose>
  );
}

export default memo(ChatListItem);
