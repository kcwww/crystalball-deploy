import { useCallback } from 'react';

import { ArrowLeft, ArrowRight } from 'lucide-react';

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
          <ArrowLeft
            size={'2rem'}
            className="pointer-events-auto cursor-pointer rounded-full bg-green-200 p-1 text-primary opacity-60 transition-all duration-300 hover:bg-green-300 hover:text-white"
          />
        </button>
      ) : (
        <div />
      )}

      {current < maxIndex ? (
        <button onClick={() => handleCrystal(true)}>
          <ArrowRight
            size={'2rem'}
            className="pointer-events-auto cursor-pointer rounded-full bg-green-200 p-1 text-primary opacity-60 transition-all duration-300 hover:bg-green-300 hover:text-white"
          />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};

export default ArrowButtons;
