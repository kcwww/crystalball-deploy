import { BACKEND_ROUTES } from '@/shared/constants/routes';
import clientComponentFetch from '@/shared/utils/fetch/clientComponentFetch';

const fetchMessages = async (crystal_id: string) => {
  try {
    const response = await clientComponentFetch(BACKEND_ROUTES.MESSAGES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Crystal-Id': crystal_id,
      },
    });
    if (!response.ok)
      throw new Error('Failed to fetch message' + response.error);

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch message' + error);
  }
};

export const fetchVisitMessages = async (crystal_id: string) => {
  try {
    const response = await clientComponentFetch(BACKEND_ROUTES.VISIT_MESSAGES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Crystal-Id': crystal_id,
      },
    });
    if (!response.ok)
      throw new Error('Failed to fetch message' + response.error);

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch message' + error);
  }
};

export default fetchMessages;
