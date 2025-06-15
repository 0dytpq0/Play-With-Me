import { FC, memo } from 'react';
import { SendChatResponse } from '../model/types';

interface ChatListItemProps {
  chat: SendChatResponse;
  userId: string;
}

const ChatingItem: FC<ChatListItemProps> = ({ chat, userId }) => (
  <div
    className={`flex ${chat.sender_id === userId ? 'justify-end' : 'justify-start'}`}
  >
    <div
      className={`px-4 py-2 rounded-2xl max-w-[60%] break-words text-sm '
        ${
          chat.sender_id === userId
            ? 'bg-purple-600 text-white rounded-br-none'
            : 'bg-slate-200 text-black rounded-bl-none'
        }`}
    >
      {chat.content}
    </div>
  </div>
);

export default memo(ChatingItem);
