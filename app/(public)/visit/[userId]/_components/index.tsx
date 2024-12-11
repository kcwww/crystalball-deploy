'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, Suspense } from 'react';

import { use3DModel } from '@/app/(public)/visit/[userId]/store/modelStore';
import Loading from '@/app/loading';

const Make = dynamic(
  () => import('@/app/(public)/visit/_components/_make/Make'),
  { ssr: false }
);

const VisitMake = ({
  userId,
  uuid,
  crystalId,
  index,
}: {
  userId: string;
  uuid: string;
  crystalId: string;
  index: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { resetModel } = use3DModel();

  useEffect(() => {
    setIsMounted(true);

    return () => {
      resetModel();
    };
  }, [resetModel]);

  if (!isMounted) return null;

  return (
    <Suspense fallback={Loading()}>
      <Make userId={userId} uuid={uuid} crystalId={crystalId} index={index} />
    </Suspense>
  );
};

export default VisitMake;
