import { fetcher } from '@/shared/lib/utils';
import { ReservationResponse } from '../model/types';

export async function getReservations({ userId }: { userId: string }) {
  try {
    const res = await fetcher<ReservationResponse[]>(
      `/api/reservate?userId=${userId}`,
      {
        method: 'GET',
      }
    );

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : '예약 목록을 가져오는데 실패했습니다.'
    );
  }
}
