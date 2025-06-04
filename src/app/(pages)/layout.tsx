import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  modal: ReactNode;
} & PropsWithChildren;

export default function Layout({ children, modal }: Props) {
  return (
    <div className='w-full min-h-dvh min-w-[1280px] max-w-[1920px]'>
      {children}
      {modal}
    </div>
  );
}
