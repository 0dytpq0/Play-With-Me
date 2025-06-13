export type ReservateFormType = {
  date: Date;
  gameType: 'competitive' | 'unrated' | 'swift';
  duoStartHour: string;
  duoStartPeriod: 'AM' | 'PM';
  duoPlayPeriod: '2' | '4' | '6' | 'fulltime';
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
};
