import { getUser } from '@/entities/user/api/getUser';
import Chat from '@/features/chat/ui/chat';
import ModalBackground from '@/shared/ui/modalBackground';

interface Props {
  searchParams: Promise<{
    mate: string;
  }>;
}

export default async function ChatModal({ searchParams }: Props) {
  const { mate: mateId } = await searchParams;
  const user = await getUser();

  return (
    <ModalBackground>
      <Chat userId={user.id} mateId={mateId} />
    </ModalBackground>
  );
}
