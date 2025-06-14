'use client';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { PropsWithChildren } from 'react';

interface CustomModalProps {
  title: string;
  triggerName: string;
}

export default function CustomModal({
  title,
  triggerName,
  children,
}: PropsWithChildren<CustomModalProps>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full bg-purple-600 hover:bg-purple-700'>
          {triggerName}
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-gradient-to-br from-violet-700/80 via-violet-900/80 to-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border-none p-8'>
        <DialogHeader>
          <DialogTitle className='text-2xl text-white mb-4'>
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-6 h-[60vh] max-h-[60vh] scrollbar pr-2 overflow-y-auto'>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
