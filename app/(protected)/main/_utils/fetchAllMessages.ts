import { BACKEND_ROUTES } from '@/shared/constants/routes';
import clientComponentFetch from '@/shared/utils/fetch/clientComponentFetch';

const fetchAllMessages = async (user_id: string) => {
  try {
    const response = await clientComponentFetch(BACKEND_ROUTES.ALL_MESSAGES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': user_id,
      },
    });
    if (!response.ok)
      throw new Error('Failed to fetch message' + response.error);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch message' + error);
  }
};

export default fetchAllMessages;
