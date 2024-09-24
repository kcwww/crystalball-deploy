'use client';

import { Button } from '@/components/ui/button';
import useModal from '@/shared/hooks/useModal';

const IntroButtonSection = () => {
  const { onOpen } = useModal();

  return (
    <Button className="pointer-events-auto" onClick={() => onOpen('Intro')}>
      Get Started
    </Button>
  );
};

export default IntroButtonSection;
