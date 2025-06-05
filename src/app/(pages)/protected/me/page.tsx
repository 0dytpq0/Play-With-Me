import { getUser } from '@/entities/user/api/getUser';
import { ProfileSection } from '@/widgets/profileSection/profileSection';

export default async function MePage() {
  const user = await getUser();
  console.log(user.profile_image || '/Icon/avatar.png');
  return <ProfileSection user={user} />;
}
