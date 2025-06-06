import { getUser } from '@/entities/user/api/getUser';
import { ProfileSection } from '@/widgets/profileSection/profileSection';

export default async function MeModal() {
  const user = await getUser();
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <ProfileSection user={user} />
    </div>
  );
}
