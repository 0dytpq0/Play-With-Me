import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  meModal: ReactNode;
} & PropsWithChildren;

export default function ProtectedLayout({ children, meModal }: Props) {
  return (
    <div className='w-full h-dvh'>
      {children}
      {meModal}
    </div>
  );
}
