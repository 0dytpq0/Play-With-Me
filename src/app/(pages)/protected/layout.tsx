import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  meModal: ReactNode;
  chatModal: ReactNode;
} & PropsWithChildren;

export default function ProtectedLayout({
  children,
  meModal,
  chatModal,
}: Props) {
  return (
    <div className='w-full h-dvh'>
      {children}
      {meModal}
      {chatModal}
    </div>
  );
}
