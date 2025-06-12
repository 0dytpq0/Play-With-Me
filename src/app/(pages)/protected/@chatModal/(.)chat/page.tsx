import { getUser } from '@/entities/user/api/getUser';
import Chat from '@/features/chat/ui/chat';
import ModalBackground from '@/shared/ui/modalBackground';

interface Props {
  mate: string;
}

export default async function ChatModal({
  searchParams,
}: {
  searchParams: Props;
}) {
  const { mate: mateId } = searchParams;
  const user = await getUser();

  return (
    <ModalBackground>
      <Chat userId={user.id} mateId={mateId} />
    </ModalBackground>
  );
}
