import { getUser } from '@/entities/user/api/getUser';
import { UserAvatar, UserCard } from '@/entities/user/ui';
import { BackButton } from '@/shared/ui/backButton';

export default async function MeModal() {
  const user = await getUser();
  console.log('인터셉트입니당');
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='relative bg-background rounded-xl shadow-2xl p-8 min-w-[340px]'>
        <BackButton />

        <UserCard user={user} />
      </div>
    </div>
  );
}
