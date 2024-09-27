'use client';

import { useEffect, useState } from 'react';
import IntroduceModal from '@/shared/components/modals/IntroduceModal';
import GuestModal from '@/shared/components/modals/GuestModal';
import MessageModal from '@/shared/components/modals/MessageModal';

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
      <MessageModal />
    </>
  );
};

export default ModalProvider;
