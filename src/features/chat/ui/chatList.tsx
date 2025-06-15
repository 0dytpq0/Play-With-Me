import Image from 'next/image';
import ChatListItem from './chatListItem';
import type { ChatListItemType } from '../model/types';

interface ChatListProps {
  chatList: ChatListItemType[];
}

export default function ChatList({ chatList }: ChatListProps) {
  return (
    <>{chatList?.map((chat) => <ChatListItem key={chat.id} chat={chat} />)}</>
  );
}

