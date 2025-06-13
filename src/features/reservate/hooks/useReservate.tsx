import { useMutation, useQuery } from '@tanstack/react-query';
import { createReservation } from '../api/createReservation';
import { ReservateFormType } from '../model/types';
import { getUserClient } from '@/entities/user/api/getUserClient';

export interface UseReservateProps {
  userId: string;
  mateId: string;
}
export function useReservate({ userId, mateId }: UseReservateProps) {
  const { data: mate } = useQuery({
    queryKey: ['mate', mateId],
    queryFn: () => getUserClient({ userId: mateId! }),
    enabled: !!mateId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ReservateFormType) => {
      const startHour =
        data.duoStartPeriod === 'AM'
          ? Number(data.duoStartHour)
          : Number(data.duoStartHour) + 12;
      const duration =
        data.duoPlayPeriod === 'fulltime' ? 24 : Number(data.duoPlayPeriod);

      const formData = new FormData();
      formData.append('sender_id', userId);
      formData.append('target_id', mateId);
      formData.append('date', data.date.toISOString().slice(0, 10));
      formData.append('start_hour', startHour.toString());
      formData.append('duration', duration.toString());
      formData.append('game_type', data.gameType);
      formData.append('message', data.message || '');
      formData.append('status', data.status);

      return createReservation(formData);
    },
  });

  return { mutate, mate, isPending };
}
