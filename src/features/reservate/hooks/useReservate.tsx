import { useMutation, useQuery } from '@tanstack/react-query';
import { createReservation } from '../api/createReservation';
import { ReservateFormType } from '../model/types';
import { getUserById } from '@/entities/user/api/getUserById';

export interface UseReservateProps {
  userId: string;
  mateId: string;
}
export function useReservate({ userId, mateId }: UseReservateProps) {
  const { data: mate } = useQuery({
    queryKey: ['mate', mateId],
    queryFn: () => getUserById({ userId: mateId! }),
    enabled: !!mateId,
  });

  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById({ userId }),
    enabled: !!userId,
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
      formData.append('sender_nickname', user?.game_nickname || '');
      formData.append('sender_tier', user?.tier || '');
      formData.append('sender_image', user?.profile_image || '');
      return createReservation(formData);
    },
  });

  return { mutate, mate, user, isPending };
}
