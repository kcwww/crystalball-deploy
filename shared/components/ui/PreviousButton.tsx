'use client';

import { useEffect } from 'react';

import { CircleArrowLeft } from 'lucide-react';
import usePrev from '@/shared/hooks/usePrev';

const PreviousButton = () => {
  const { view, onOut } = usePrev();

  // 페이지 이동 시 이전 페이지 상태 초기화
  useEffect(() => {
    return () => {
      onOut();
    };
  }, [onOut]);

  if (!view) return null;

  return (
    <button
      onClick={() => {
        view && onOut();
      }}
      className="previous pointer-events-auto fixed flex h-12 w-12 items-center justify-center rounded-full bg-transparent p-2 text-gray-100 hover:bg-primary hover:text-yellow-400"
      style={{ zIndex: 1, top: '3rem', left: '3rem' }}
    >
      <CircleArrowLeft size={'2rem'} />
    </button>
  );
};

export default PreviousButton;
