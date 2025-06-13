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
