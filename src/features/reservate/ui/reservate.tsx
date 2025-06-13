import { BackButton } from '@/shared/ui/backButton';

export default function Reservate() {
  return (
    <div className='flex items-center justify-between mb-6'>
      <h2 className='text-xl font-bold'>듀오 신청</h2>
      <BackButton position='right' />
    </div>
  );
}
