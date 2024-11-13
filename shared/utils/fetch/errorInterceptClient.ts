import { signOut } from 'next-auth/react';

const errorInterceptClient = async (response: Response) => {
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error('Error 400: Bad Request');
      case 401:
        await signOut();
        throw new Error('Error 401: Unauthorized');
      case 403:
        throw new Error('Error 403: Forbidden');
      case 404:
        throw new Error('Error 404: Not Found');
      case 500:
        throw new Error('Error 500: Internal Server Error');
      default:
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  }
};

export default errorInterceptClient;
