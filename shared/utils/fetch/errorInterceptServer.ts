'use server';

import { redirect } from 'next/navigation';
import { BACKEND_ROUTES, ROUTES } from '@/shared/constants/routes';

const errorInterceptServer = async (response: Response) => {
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error('Error 400: Bad Request');
      case 401:
        await fetch(BACKEND_ROUTES.SIGNOUT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        redirect(ROUTES.LANDING);
        throw new Error('Error 401: Unauthorized');
      case 403:
        throw new Error('Error 403: Forbidden');
      case 404:
        redirect(ROUTES.ERROR);
        throw new Error('Error 404: Not Found');
      case 500:
        redirect(ROUTES.LANDING);
        throw new Error('Error 500: Internal Server Error');
      default:
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  }
};

export default errorInterceptServer;
