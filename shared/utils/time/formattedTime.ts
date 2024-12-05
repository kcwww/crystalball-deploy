'use client';

export const formattedTime = (time: string) => {
  const safariSafeDate = time
    .replace(/-/g, '/')
    .replace('T', ' ')
    .replace('Z', '');
  const date = new Date(safariSafeDate);

  if (isNaN(date.getTime())) {
    console.error('Invalid date:', time);
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}`;
};
