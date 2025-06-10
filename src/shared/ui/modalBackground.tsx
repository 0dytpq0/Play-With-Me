'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// 하위 요소에 onClick 이벤트가 발생해도 모달이 닫히지 않도록 event.stopPropagation() 사용
export default function ModalBackground({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
    >
      {children}
    </div>
  );
}
