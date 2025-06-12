import Chat from '@/features/chat/ui/chat';
import ModalBackground from '@/shared/ui/modalBackground';

export default function ChatModal() {
  return (
    <ModalBackground>
      <Chat />
    </ModalBackground>
  );
}
