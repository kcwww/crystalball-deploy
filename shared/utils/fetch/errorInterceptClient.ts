import { signOut } from 'next-auth/react';
import { ERROR_MESSAGES } from '@/shared/constants/enum';

const errorInterceptClient = async (response: Response) => {
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw ERROR_MESSAGES['400'];
      case 401:
        await signOut();
        throw ERROR_MESSAGES['401'];
      case 403:
        throw ERROR_MESSAGES['403'];
      case 404:
        throw ERROR_MESSAGES['404'];
      case 500:
        throw ERROR_MESSAGES['500'];
      default:
        throw `${response.status}: ${response.statusText}`;
    }
  }
};

export default errorInterceptClient;
