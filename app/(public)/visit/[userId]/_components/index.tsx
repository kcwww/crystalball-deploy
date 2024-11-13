'use client';

import mongoose from 'mongoose';

import dynamic from 'next/dynamic';
import { useState, useEffect, Suspense } from 'react';

import { use3DModel } from '@/app/(public)/visit/[userId]/store/modelStore';

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
  userId: string | mongoose.Schema.Types.ObjectId;
  uuid: string;
  crystalId: string | mongoose.Schema.Types.ObjectId;
  index: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { resetModel } = use3DModel();

  useEffect(() => {
    setIsMounted(true);

    return () => {
      resetModel();
    };
  }, []);

  if (!isMounted) return null;

  return (
    <Suspense fallback={null}>
      <Make userId={userId} uuid={uuid} crystalId={crystalId} index={index} />
    </Suspense>
  );
};

export default VisitMake;
