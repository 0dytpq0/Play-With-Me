import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReservations } from '@/features/reservate/api';
import { patchReservation } from '@/features/reservate/api/patchReservation';
import { ReservationResponse } from '@/features/reservate/model/types';
import ReservationListItem from './reservationListItem';
import { useMemo } from 'react';
import CustomModal from '@/shared/ui/customModal';

interface ReservationListProps {
  userId: string;
}

export function ReservationListModal({ userId }: ReservationListProps) {
  const queryClient = useQueryClient();
  const { data: reservations } = useQuery<ReservationResponse[]>({
    queryKey: ['reservations', userId],
    queryFn: () => getReservations({ userId }),
    enabled: !!userId,
  });
  const { mutate } = useMutation({
    mutationFn: patchReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations', userId] });
    },
  });

  const memoizedReservationList = useMemo(() => {
    return reservations?.map((reservation) => (
      <ReservationListItem
        key={reservation.id}
        item={reservation}
        onAccept={() => mutate({ id: reservation.id, status: 'accepted' })}
        onReject={() => mutate({ id: reservation.id, status: 'rejected' })}
      />
    ));
  }, [reservations]);

  return (
    <CustomModal title='듀오 신청 목록' triggerName='듀오 신청 목록'>
      {memoizedReservationList}
    </CustomModal>
  );
}
