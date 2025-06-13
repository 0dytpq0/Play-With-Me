import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  meModal: ReactNode;
  chatModal: ReactNode;
  reservateSlider: ReactNode;
} & PropsWithChildren;

export default function ProtectedLayout({
  children,
  meModal,
  chatModal,
  reservateSlider,
}: Props) {
  return (
    <div className='w-full h-dvh'>
      {children}
      {meModal}
      {chatModal}
      {reservateSlider}
    </div>
  );
}
