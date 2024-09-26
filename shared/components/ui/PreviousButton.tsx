'use client';

import { CircleArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import usePrev from '@/shared/hooks/usePrev';

const PreviousButton = () => {
  const { view, onOut } = usePrev();

  if (!view) return null;

  return (
    <Button
      onClick={() => onOut()}
      className="pointer-events-auto fixed flex h-12 w-12 items-center justify-center rounded-full bg-transparent p-2"
      style={{ zIndex: 1, top: '2rem', left: '2rem' }}
    >
      <CircleArrowLeft className="previous" size={'1.5rem'} />
    </Button>
  );
};

export default PreviousButton;
