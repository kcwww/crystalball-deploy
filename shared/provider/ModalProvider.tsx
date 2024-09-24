'use client';

import { useEffect, useState } from 'react';
import IntroduceModal from '@/shared/components/modals/IntroduceModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <IntroduceModal />;
};

export default ModalProvider;
