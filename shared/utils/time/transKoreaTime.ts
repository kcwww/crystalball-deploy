'use client';

export const transKoreaTime = () => {
  const currentDate = new Date();
  const koreanTime = new Date(currentDate.getTime() + 32400000).toISOString();
  const formattedDate =
    koreanTime.split('T')[0] +
    ' ' +
    koreanTime.split('T')[1].split('.')[0].slice(0, -3);
  return formattedDate;
};
