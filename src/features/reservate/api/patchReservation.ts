// 듀오 수락 또는 거절

import { fetcher } from '@/shared/lib/utils';

interface PatchReservationParams {
  id: string;
  status: string;
}

export const patchReservation = async ({
  id,
  status,
}: PatchReservationParams) => {
  const res = await fetcher(`/api/reservate/${id}`, {
    method: 'PATCH',
    body: { status },
  });

  return res;
};
