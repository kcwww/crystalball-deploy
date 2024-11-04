'use client';

import { useState, useEffect, Suspense } from 'react';

import dynamic from 'next/dynamic';
import { use3DModel } from './store/modelStore';
const Make = dynamic(() => import('@/app/(protected)/make/_components/index'));

const MakePage = () => {
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
      <Make />
    </Suspense>
  );
};

export default MakePage;
