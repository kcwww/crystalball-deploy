import { ORIGIN } from '@/shared/constants/url';
import errorInterceptServer from './errorInterceptServer';

export const serverComponentFetchFromServer = async (
  url: string,
  init?: RequestInit
) => {
  const newUrl = `${ORIGIN}${url}`;
  return serverComponentFetch(newUrl, init);
};

export const serverComponentFetch = async (url: string, init?: RequestInit) => {
  const defaultInit: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const finalInit = init ? { ...defaultInit, ...init } : defaultInit;
  try {
    const res = await fetch(url, finalInit);
    await errorInterceptServer(res);

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Fetching Error: ' + error);
  }
};

export default serverComponentFetch;
