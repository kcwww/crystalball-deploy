import { ChevronLeft, ChevronRight } from 'lucide-react';

const ArrowButtons = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <ChevronLeft
        size={'3rem'}
        className="pointer-events-auto cursor-pointer hover:text-blue-500"
      />
      <ChevronRight
        size={'3rem'}
        className="pointer-events-auto cursor-pointer hover:text-blue-500"
      />
    </div>
  );
};

export default ArrowButtons;
