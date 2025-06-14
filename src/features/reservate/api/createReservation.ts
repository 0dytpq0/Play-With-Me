// src/features/reservate/api/createReservation.ts

import { fetcher } from '@/shared/lib/utils';

/**
 * 예약 생성 fetcher
 * @param formData
 */

export async function createReservation(formData: FormData) {
  const res = await fetcher('/api/reservate', {
    method: 'POST',
    body: formData,
  });

  return res;
}
