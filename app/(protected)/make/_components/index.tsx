'use client';

import Loading from '@/app/loading';
import { UserType } from '@/shared/types/user';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const MainSection = dynamic(
  () => import('@/app/(protected)/make/_components/MakeSection')
);

const Make = ({ userData }: { userData: UserType }) => {
  return (
    <Suspense fallback={Loading()}>
      <MainSection userData={userData} />
    </Suspense>
  );
};

export default Make;
