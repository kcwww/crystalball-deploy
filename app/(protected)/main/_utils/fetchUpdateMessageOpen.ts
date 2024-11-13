'use client';

import { BACKEND_ROUTES } from '@/shared/constants/routes';
import clientComponentFetch from '@/shared/utils/fetch/clientComponentFetch';
import { transKoreaTime } from '@/shared/utils/time/transKoreaTime';

const fetchUpdateMessageOpen = async (messageId: string) => {
  const koreanTime = transKoreaTime();

  try {
    const response = await clientComponentFetch(BACKEND_ROUTES.MESSAGE, {
      method: 'PATCH',
      body: JSON.stringify({ messageId, date: koreanTime }),
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchUpdateMessageOpen;
