'use client';

import { useEffect, useState } from 'react';
import IntroduceModal from '@/shared/components/modals/IntroduceModal';

import MessageModal from '@/shared/components/modals/MessageModal';
import FormModal from '@/shared/components/modals/FormModal';
import MessageListModal from '@/shared/components/modals/MessageListModal';
import PrivateModal from '@/shared/components/modals/PrivateModal';
import MessageSubmitModal from '@/shared/components/modals/MessageSubmitModal';

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
      <MessageModal />
      <FormModal />
      <MessageListModal />
      <PrivateModal />
      <MessageSubmitModal />
    </>
  );
};

export default ModalProvider;
