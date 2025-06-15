import ChatListItem from './chatListItem';
import type { ChatListItemType } from '../model/types';

interface ChatListProps {
  chatList: ChatListItemType[];
  mateId: string;
}

export default function ChatList({ chatList, mateId }: ChatListProps) {
  return (
    <>
      {chatList?.map((chat) => (
        <ChatListItem key={chat.id} chat={chat} mateId={mateId} />
      ))}
    </>
  );
}

