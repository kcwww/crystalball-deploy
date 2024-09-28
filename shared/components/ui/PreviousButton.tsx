'use client';

import { useEffect } from 'react';

import { CircleArrowLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import usePrev from '@/shared/hooks/usePrev';

const PreviousButton = () => {
  const { view, onOut } = usePrev();

  // 페이지 이동 시 이전 페이지 상태 초기화
  useEffect(() => {
    return () => {
      onOut();
    };
  }, []);

  if (!view) return null;

  return (
    <Button
      onClick={() => {
        view && onOut();
      }}
      className="pointer-events-auto fixed flex h-12 w-12 items-center justify-center rounded-full bg-transparent p-2"
      style={{ zIndex: 1, top: '2rem', left: '2rem' }}
    >
      <CircleArrowLeft className="previous" size={'1.5rem'} />
    </Button>
  );
};

export default PreviousButton;
