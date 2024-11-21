'use client';

import errorInterceptClient from './errorInterceptClient';

const clientComponentFetch = async (url: string, init?: RequestInit) => {
  const defaultInit: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  };

  const finalInit = init ? { ...defaultInit, ...init } : defaultInit;

  try {
    const res = await fetch(url, finalInit);
    await errorInterceptClient(res);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(String(error));
  }
};

export default clientComponentFetch;
