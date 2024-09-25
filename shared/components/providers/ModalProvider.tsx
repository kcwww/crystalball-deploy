'use client';

import { useEffect, useState } from 'react';
import IntroduceModal from '@/shared/components/modals/IntroduceModal';
import GuestModal from '@/shared/components/modals/GuestModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <IntroduceModal />
      <GuestModal />
    </>
  );
};

export default ModalProvider;
