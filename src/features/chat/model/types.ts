import { User } from '@/entities/user/model/types';

export type SendChatParams = {
  roomId: string;
  senderId: string;
  content: string;
};

export type SendChatResponse = {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export interface ChatListItemType {
  id: number;
  room_id: string;
  sender: User;
  sender_id: string;
  content: string;
  created_at: string;
}
