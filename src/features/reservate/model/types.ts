export type ReservateFormType = {
  date: Date;
  gameType: 'competitive' | 'unrated' | 'swift';
  duoStartHour: string;
  duoStartPeriod: 'AM' | 'PM';
  duoPlayPeriod: '2' | '4' | '6' | 'fulltime';
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
};

export interface ReservationResponse {
  id: string;
  sender_id: string;
  target_id: string;
  sender_nickname: string;
  sender_tier: string;
  sender_image: string;
  date: string; // YYYY-MM-DD
  start_hour: number;
  duration: number;
  game_type: 'competitive' | 'unrated' | 'swift';
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string; // ISO string
}
