import { useCallback } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

const ArrowButtons = ({
  maxIndex,
  current,
  handleCurrent,
}: {
  maxIndex: number;
  current: number;
  handleCurrent: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleCrystal = useCallback(
    (flag: boolean) => {
      if (flag) {
        handleCurrent((prev) => prev + 1);
      } else {
        handleCurrent((prev) => prev - 1);
      }
    },
    [handleCurrent]
  );

  return (
    <div className="flex w-full items-center justify-between">
      {current > 0 ? (
        <button onClick={() => handleCrystal(false)}>
          <ChevronLeft
            size={'3rem'}
            className="pointer-events-auto cursor-pointer hover:text-blue-500"
          />
        </button>
      ) : (
        <div />
      )}

      {current < maxIndex ? (
        <button onClick={() => handleCrystal(true)}>
          <ChevronRight
            size={'3rem'}
            className="pointer-events-auto cursor-pointer hover:text-blue-500"
          />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};

export default ArrowButtons;
